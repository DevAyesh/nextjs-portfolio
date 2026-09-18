import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// In-memory rate limiting store (max 5 requests per 10 minutes per IP)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  entry.count += 1;
  return false;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request) {
  try {
    // 1. IP Rate Limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";

    if (ip !== "unknown" && isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, email, topic, message, company } = body;

    // 2. Honeypot check: If hidden field 'company' is filled, silently ignore bot
    if (company) {
      return NextResponse.json({ ok: true });
    }

    // 3. Validation & Length Sanity Checks
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const trimmedName = String(name).trim();
    const trimmedEmail = String(email).trim().toLowerCase();
    const trimmedTopic = String(topic || "General").trim();
    const trimmedMessage = String(message).trim();

    if (trimmedName.length < 2 || trimmedName.length > 100) {
      return NextResponse.json({ error: "Name must be between 2 and 100 characters." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail) || trimmedEmail.length > 254) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    if (trimmedMessage.length < 5 || trimmedMessage.length > 3000) {
      return NextResponse.json({ error: "Message must be between 5 and 3000 characters." }, { status: 400 });
    }

    // Sanitize topic to prevent CRLF injection in email subjects
    const safeTopic = trimmedTopic.replace(/[\r\n]/g, "").slice(0, 100) || "General";

    // 4. Server Configuration Check (safe client error message)
    const requiredEnv = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "CONTACT_TO"];
    const missing = requiredEnv.filter((key) => !process.env[key]);
    if (missing.length) {
      console.error(`Contact form error: missing environment variables: ${missing.join(", ")}`);
      return NextResponse.json(
        { error: "Contact service is temporarily unavailable. Please try again later." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send notification to portfolio owner
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: trimmedEmail,
      subject: `New message: ${safeTopic}`,
      text: `From: ${trimmedName} <${trimmedEmail}>\nTopic: ${safeTopic}\n\n${trimmedMessage}`,
    };

    await transporter.sendMail(mailOptions);

    // Send auto-reply to the sender with HTML-escaped content (non-blocking)
    try {
      const safeNameHtml = escapeHtml(trimmedName);
      const safeTopicHtml = escapeHtml(safeTopic);

      const autoReplyOptions = {
        from: `"Ayesh Madhuranga" <${process.env.SMTP_USER}>`,
        to: trimmedEmail,
        subject: "Thank you for reaching out!",
        text: `Hi ${trimmedName},\n\nThank you for contacting me! I've received your message regarding "${safeTopic}" and will get back to you as soon as possible.\n\nBest regards,\nAyesh Madhuranga\n\n---\nThis is an automated response. Please do not reply to this email.`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
            <h2 style="color: #333; margin-bottom: 20px;">Thank you for reaching out!</h2>
            <p style="color: #555; line-height: 1.6;">Hi <strong>${safeNameHtml}</strong>,</p>
            <p style="color: #555; line-height: 1.6;">Thank you for contacting me! I've received your message regarding <strong>"${safeTopicHtml}"</strong> and will get back to you as soon as possible.</p>
            <p style="color: #555; line-height: 1.6; margin-top: 30px;">Best regards,<br><strong>Ayesh Madhuranga</strong></p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">This is an automated response. Please do not reply to this email.</p>
          </div>
        `,
      };

      await transporter.sendMail(autoReplyOptions);
    } catch (autoReplyErr) {
      console.warn("Auto-reply failed to send (non-critical):", autoReplyErr?.message || autoReplyErr);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form send error:", error);
    return NextResponse.json({ error: "Failed to send message. Please try again later." }, { status: 500 });
  }
}

