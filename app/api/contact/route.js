import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, email, topic, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const requiredEnv = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "CONTACT_TO"];
    const missing = requiredEnv.filter((key) => !process.env[key]);
    if (missing.length) {
      return NextResponse.json(
        { error: `Email not configured. Missing: ${missing.join(", ")}` },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send notification to portfolio owner
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `New message: ${topic || "General"}`,
      text: `From: ${name} <${email}>\nTopic: ${topic || "General"}\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    // Send auto-reply to the sender
    const autoReplyOptions = {
      from: `"Ayesh Madhuranga" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thank you for reaching out!",
      text: `Hi ${name},\n\nThank you for contacting me! I've received your message regarding "${topic || "General"}" and will get back to you as soon as possible.\n\nBest regards,\nAyesh Madhuranga\n\n---\nThis is an automated response. Please do not reply to this email.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #333; margin-bottom: 20px;">Thank you for reaching out!</h2>
          <p style="color: #555; line-height: 1.6;">Hi <strong>${name}</strong>,</p>
          <p style="color: #555; line-height: 1.6;">Thank you for contacting me! I've received your message regarding <strong>"${topic || "General"}"</strong> and will get back to you as soon as possible.</p>
          <p style="color: #555; line-height: 1.6; margin-top: 30px;">Best regards,<br><strong>Ayesh Madhuranga</strong></p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">This is an automated response. Please do not reply to this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(autoReplyOptions);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form send error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

