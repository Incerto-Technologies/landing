"use server";

import connectDB from "@/lib/mongodb";
import { Contact } from "@/models/Contact";
import { sendEmailContactForm } from "@/lib/mail";

export type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export const sendContactForm = async (data: ContactFormData) => {
  try {
    const { name, email, message } = data;

    // Connect to MongoDB
    await connectDB();

    // Save to database
    const contact = await Contact.create({
      name,
      email,
      message,
    });

    // Send email notification
    await sendEmailContactForm({
      name,
      email,
      message,
    });

    return { success: true, data: contact };
  } catch (error) {
    console.error("Error in contact form:", error);
    return { success: false, error: "Failed to send message" };
  }
};
