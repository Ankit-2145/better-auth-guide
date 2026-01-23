import { sendEmail } from "./send-email";

interface WelcomeEmailParams {
  user: { email: string; name: string };
}

export async function sendWelcomeEmail({ user }: WelcomeEmailParams) {
  await sendEmail({
    email: user.email,
    subject: "Welcome to Our App!",
    html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">Welcome to Our App</h2>
        <p>Hello ${user.name},</p>
        <p>Thank you for signing up! We're excited to have you on board.</p>
        <p>If you didn't create an account, please ignore this email.</p>
        <p>If you didn't create an account, please ignore this email.</p>
        <p>This link will expire in 24 hours.</p>
        <p>Best regards,<br>Your App Team</p>
      </div>
    `,
  });
}
