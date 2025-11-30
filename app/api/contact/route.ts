import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  budget?: string;
  message: string;
  service?: string;
  source?: string;
  createdAt?: Date;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Connect to database
    const { db } = await connectToDatabase();

    // Add timestamp
    const contactData: ContactFormData = {
      ...body,
      createdAt: new Date(),
    };

    // Insert into contacts collection
    const result = await db.collection("contacts").insertOne(contactData);

    if (result.acknowledged) {
      return NextResponse.json(
        { message: "Contact form submitted successfully", id: result.insertedId },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to save contact form" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "Contact API is working" },
    { status: 200 }
  );
}

