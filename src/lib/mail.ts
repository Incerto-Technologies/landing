"use server";
import { ContactFormData } from "@/actions/contact";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const mailOptions = {
  from: process.env.EMAIL,
};

export async function sendMail({
  to,
  subject,
  html,
}: {
  to: string[] | string;
  subject: string;
  html: string;
}) {
  try {
    await transporter.sendMail({
      ...mailOptions,
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error };
  }
}

export const sendEmailContactForm = async (data: ContactFormData) => {
  const { name, email, message } = data;

  const html = `
  <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Contact Form Submission</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            color: #2c3e50;
            border-bottom: 2px solid #eee;
            padding-bottom: 10px;
        }
        .info-label {
            font-weight: bold;
            color: #2c3e50;
        }
        .message-content {
            background-color: #f9f9f9;
            padding: 15px;
            border-left: 3px solid #3498db;
            margin-top: 5px;
        }
    </style>
</head>
<body>
    <h1>New Contact Form Submission</h1>
    
    <p><span class="info-label">Name:</span> ${name}</p>
    <p><span class="info-label">Email:</span> <a href="mailto:${email}">${email}</a></p>
    
    <p><span class="info-label">Message:</span></p>
    <div class="message-content">
        ${message}
    </div>
    
    <p style="margin-top: 30px; font-size: 0.9em; color: #7f8c8d;">
        This message was sent from the contact form on 
        <a href="https://magicpill.incerto.in">magicpill.incerto.in</a>
    </p>
</body>
</html>
  `;

  await sendMail({
    to: process.env.SEND_MAIL_TO!.split(",") || "",
    subject: "Magic Pill - Contact Form",
    html,
  });
};
