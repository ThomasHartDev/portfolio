import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  const requestId = crypto.randomUUID().slice(0, 8);

  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error(`[contact:${requestId}] RESEND_API_KEY not configured`);
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 },
      );
    }

    const body = await request.json();
    const { name, email, message } = body;

    console.log(`[contact:${requestId}] Incoming request`, {
      name,
      email,
      messageLength: message?.length ?? 0,
    });

    if (!name || !email || !message) {
      console.warn(`[contact:${requestId}] Validation failed — missing fields`, {
        hasName: !!name,
        hasEmail: !!email,
        hasMessage: !!message,
      });
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const resend = new Resend(apiKey);

    console.log(`[contact:${requestId}] Sending email via Resend...`);

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "thomashartdev@gmail.com",
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="color: #6366f1;">New Portfolio Contact</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: 1px solid #e5e5e5; margin: 16px 0;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    if (error) {
      console.error(`[contact:${requestId}] Resend API error`, {
        error: error.message,
        name: error.name,
      });
      return NextResponse.json(
        { error: `Email delivery failed: ${error.message}` },
        { status: 500 },
      );
    }

    console.log(`[contact:${requestId}] Email sent successfully`, {
      emailId: data?.id,
    });

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack : undefined;
    console.error(`[contact:${requestId}] Unhandled error`, {
      message,
      stack,
    });
    return NextResponse.json(
      { error: `Internal error: ${message}` },
      { status: 500 },
    );
  }
}
