import nodemailer from "nodemailer";
import { env } from "../config/env.ts";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // e.g., Gmail SMTP
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});
export async function sendMail(to: string, subject: string, html: string) {

  // Send mail
  const info = await transporter.sendMail({
    from: env.EMAIL_FROM,
    to,
    subject,
    html,
  });

  console.log("Message sent: %s", info.messageId);
}
