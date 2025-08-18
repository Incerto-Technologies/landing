"use server";
import { ContactFormData } from "@/actions/contact";
import { sendMail } from "./mail";
import { DownloadRequest } from "@/actions/donwload-form";

export async function sendEmailContactForm(data: ContactFormData) {
  const { name, email, message, mobile } = data;

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
    <p><span class="info-label">Mobile:</span> ${mobile}</p>
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
}

export async function sendEmailDownloadRequest(data: DownloadRequest) {
  const { mobile, email } = data;
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>New Download Request</title>
  </head>
  <body>
      <h1>New Download Request</h1>
      <p>Email: ${email}</p>
      <p>Mobile: ${mobile}</p>
  </body>
  </html>
  `;

  await sendMail({
    to: process.env.SEND_MAIL_TO!.split(",") || "",
    subject: "Magic Pill - Download Request",
    html,
  });
}

export async function sendEmailWelcomeMail(email: string, name: string) {
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>Welcome to Incerto</title>
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #2563eb;">Welcome to Incerto!</h1>
          
          <p>Namaste ${name} Ji,</p>
          
          <p>Thanks for installing Incerto. Do email us if you face any problem at all. Docs are available at <a href="https://docs.incerto.in" style="color: #2563eb;">docs.incerto.in</a></p>
          
          <p><strong>Product doesn't send even a single byte of data back to us.</strong> Feel free to use staging or production databases too with Incerto.</p>
          
          <p>If you would like to join the community of Indian Dev/DBA's using Incerto let us know.</p>
          
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
          
          <p style="font-size: 14px; color: #6b7280;">
              Best regards,<br>
              The Incerto Team
          </p>
      </div>
  </body>
  </html>
  `;

  await sendMail({
    to: email,
    subject: "Welcome to Incerto - Your Installation Guide",
    html,
  });
}
