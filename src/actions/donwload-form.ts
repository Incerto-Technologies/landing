"use server";

import { sendMail } from "@/lib/mail";
import { sendEmailDownloadRequest } from "@/lib/send-contact-form-email";
import { DownloadRequestModel } from "@/models/download-request";
import connectDB from "@/lib/mongodb";

export type DownloadRequest = {
  email: string;
  mobile?: string;
};

export type DownloadResponse = {
  success: boolean;
  message: string;
  data?: any;
};

export const createDownloadRequest = async (
  data: DownloadRequest
): Promise<DownloadResponse> => {
  try {
    const { email, mobile } = data;

    // Validate input
    if (!email || !email.includes("@")) {
      return {
        success: false,
        message: "Please provide a valid email address",
      };
    }

    // Connect to database
    await connectDB();

    // Send email notification
    await sendEmailDownloadRequest({
      email,
      mobile,
    });

    // Save to database
    const downloadRequest = await DownloadRequestModel.create({
      email,
      mobile,
    });

    return {
      success: true,
      message: "You can download the app from the link below.",
      data: downloadRequest,
    };
  } catch (error) {
    console.error("Error creating download request:", error);
    return {
      success: false,
      message: "Failed to submit download request. Please try again.",
    };
  }
};
