import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { userEmail, name, message } = req.body;

  // Ensure environment variables are properly defined
  const smtpHost = process.env.SMTP_HOST || "smtp.zoho.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
  const smtpUser = process.env.SMTP_USER || "";
  const smtpPass = process.env.SMTP_PASS || "";
  const smtpFrom = process.env.SMTP_FROM || "";

  if (!smtpUser || !smtpPass || !smtpHost || !smtpPort || !smtpFrom) {
    return res.status(500).json({ error: "SMTP credentials are missing." });
  }

  // Create Transporter
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: true, // TLS
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  // Email Content
  const mailOptions = {
    from: smtpFrom,
    to: userEmail, // The recipient who filled out the form
    subject: "Your Detailed Analysis",
    text: `Hello ${name},\n\nHere is your requested analysis:\n${message}\n\nBest regards,\nWorksite X Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
