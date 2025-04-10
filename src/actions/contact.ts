"use server";

import connectDB from "@/lib/mongodb";
import { Contact } from "@/models/Contact";
import { sendEmailContactForm } from "@/lib/send-contact-form-email";

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

    console.log("Contact form sent successfully");
    return { success: true };
  } catch (error) {
    console.error("Error in contact form:", error);
    return { success: false, error: "Failed to send message" };
  }
};
