import mongoose, { Document, Model, Schema } from "mongoose";

// Interface for Contact document
export interface IContact extends Document {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  budget?: string;
  service?: string;
  message: string;
  source: string;
  ipAddress?: string;
  userAgent?: string;
  status: "new" | "contacted" | "converted" | "spam";
  createdAt: Date;
  updatedAt: Date;
}

// Sanitization helper - removes potentially harmful characters
const sanitizeString = (value: string): string => {
  if (!value) return value;
  // Remove HTML tags, script tags, and potentially harmful characters
  return value
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/[<>'"`;(){}[\]]/g, "") // Remove special chars
    .trim()
    .slice(0, 5000); // Limit length
};

// Phone validation regex (Indian phone numbers)
const phoneRegex = /^(\+91)?[6-9]\d{9}$/;

// Email validation regex (strict)
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Contact Schema with comprehensive validation
const ContactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
      set: sanitizeString,
      validate: {
        validator: (v: string) => /^[a-zA-Z\s.'-]+$/.test(v),
        message: "Name can only contain letters, spaces, and basic punctuation",
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      maxlength: [254, "Email cannot exceed 254 characters"],
      validate: {
        validator: (v: string) => emailRegex.test(v),
        message: "Please provide a valid email address",
      },
    },
    phone: {
      type: String,
      trim: true,
      validate: {
        validator: function (v: string) {
          if (!v) return true; // Optional field
          const cleanPhone = v.replace(/[\s-]/g, "");
          return phoneRegex.test(cleanPhone);
        },
        message: "Please provide a valid Indian phone number",
      },
    },
    company: {
      type: String,
      trim: true,
      maxlength: [200, "Company name cannot exceed 200 characters"],
      set: sanitizeString,
    },
    budget: {
      type: String,
      trim: true,
      enum: {
        values: [
          "",
          "Under ₹25K",
          "₹25K - ₹50K",
          "₹50K - ₹1L",
          "₹1L - ₹5L",
          "₹5L+",
          "Not Sure",
        ],
        message: "Invalid budget range selected",
      },
    },
    service: {
      type: String,
      trim: true,
      maxlength: [200, "Service cannot exceed 200 characters"],
      set: sanitizeString,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [10, "Message must be at least 10 characters"],
      maxlength: [5000, "Message cannot exceed 5000 characters"],
      set: sanitizeString,
    },
    source: {
      type: String,
      default: "website",
      enum: ["website", "homepage", "service-page", "referral", "other"],
    },
    ipAddress: {
      type: String,
      select: false, // Don't return in queries by default
    },
    userAgent: {
      type: String,
      select: false,
      maxlength: 500,
    },
    status: {
      type: String,
      default: "new",
      enum: ["new", "contacted", "converted", "spam"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
ContactSchema.index({ email: 1 });
ContactSchema.index({ createdAt: -1 });
ContactSchema.index({ status: 1 });

// Prevent model recompilation in development
const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);

export default Contact;
