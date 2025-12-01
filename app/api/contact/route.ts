import Contact from "@/lib/models/Contact";
import connectToDatabase from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";

// Rate limiting storage (in production, use Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // 5 requests per minute

// Check rate limit
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= MAX_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

// Get client IP
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0]?.trim() || realIP || "unknown";
}

// Honeypot field check - bots often fill hidden fields
interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  budget?: string;
  message: string;
  service?: string;
  source?: string;
  website?: string; // Honeypot field
}

export async function POST(request: NextRequest) {
  try {
    // Get client info for security
    const clientIP = getClientIP(request);
    const userAgent = request.headers.get("user-agent") || "";

    // Rate limiting check
    if (!checkRateLimit(clientIP)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    // Parse and validate content type
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 }
      );
    }

    const body: ContactFormData = await request.json();

    // Honeypot check - if website field is filled, it's likely a bot
    if (body.website) {
      console.log("Honeypot triggered from IP:", clientIP);
      // Silently accept but don't save (fool the bot)
      return NextResponse.json(
        { message: "Message received successfully!" },
        { status: 201 }
      );
    }

    // Connect to database
    await connectToDatabase();

    // Create contact with Mongoose validation
    const contact = new Contact({
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company,
      budget: body.budget,
      service: body.service,
      message: body.message,
      source: body.source || "website",
      ipAddress: clientIP,
      userAgent: userAgent.slice(0, 500),
    });

    // Mongoose validates on save
    await contact.save();

    return NextResponse.json(
      {
        message: "Thank you! We'll get back to you within 24 hours.",
        id: contact._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);

    // Handle Mongoose validation errors
    if (error instanceof Error && error.name === "ValidationError") {
      const validationError = error as {
        errors?: Record<string, { message: string }>;
      };
      const messages = Object.values(validationError.errors || {})
        .map((err) => err.message)
        .join(", ");
      return NextResponse.json({ error: messages }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Contact API is healthy", timestamp: new Date().toISOString() },
    { status: 200 }
  );
}
