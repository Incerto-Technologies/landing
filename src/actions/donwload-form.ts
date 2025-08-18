"use server";

import { sendMail } from "@/lib/mail";
import {
  sendEmailDownloadRequest,
  sendEmailWelcomeMail,
} from "@/lib/send-contact-form-email";
import { DownloadRequestModel } from "@/models/download-request";
import connectDB from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

    let session;
    try {
      session = await getServerSession(authOptions);
    } catch (sessionError) {
      console.error("Session error:", sessionError);
      // Continue without session if there's an error
      session = null;
    }

    // Validate input
    if (!email || !email.includes("@")) {
      return {
        success: false,
        message: "Please provide a valid email address",
      };
    }

    // Send email notification
    await sendEmailDownloadRequest({
      email,
      mobile,
    });

    const name = session?.user?.name || email;
    await sendEmailWelcomeMail(email, name);

    let downloadRequest = null;

    // Try to save to database, but don't fail if DB is unavailable
    try {
      await connectDB();
      const dbResult = await DownloadRequestModel.create({
        email,
        mobile,
      });
      console.log("Download request saved to database:", dbResult._id);

      // Convert MongoDB document to plain object for client
      downloadRequest = {
        id: dbResult._id.toString(),
        email: dbResult.email,
        mobile: dbResult.mobile,
        createdAt: dbResult.createdAt?.toISOString(),
      };
    } catch (dbError) {
      console.error("Database error (non-critical):", dbError);
      // Continue without database save - emails are more important
    }

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
