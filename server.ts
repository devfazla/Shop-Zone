import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Name, email, and message are required." });
      }

      // Check if SMTP environment variables are present
      if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.error("Missing SMTP configuration in environment variables.");
        return res.status(500).json({ error: "SMTP mail server configuration is missing in the environment." });
      }

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_PORT === "464" || process.env.SMTP_PORT === "465",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      // Construct a beautiful HTML body
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>New Inquiry Submission</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              background-color: #f8fafc;
              color: #334155;
              margin: 0;
              padding: 40px 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background: #ffffff;
              border-radius: 16px;
              border: 1px solid #e2e8f0;
              overflow: hidden;
              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
            }
            .header {
              background-color: #7c3aed;
              padding: 32px 24px;
              text-align: center;
              color: #ffffff;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 800;
              letter-spacing: -0.025em;
            }
            .header p {
              margin: 8px 0 0 0;
              font-size: 14px;
              opacity: 0.9;
              font-weight: 500;
            }
            .content {
              padding: 32px 24px;
            }
            .field-group {
              margin-bottom: 24px;
              border-bottom: 1px solid #f1f5f9;
              padding-bottom: 16px;
            }
            .field-group:last-child {
              margin-bottom: 0;
              border-bottom: none;
              padding-bottom: 0;
            }
            .label {
              font-size: 11px;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 0.05em;
              color: #94a3b8;
              margin-bottom: 6px;
            }
            .value {
              font-size: 15px;
              font-weight: 600;
              color: #0f172a;
              line-height: 1.5;
            }
            .message-box {
              background-color: #f8fafc;
              border: 1px solid #e2e8f0;
              border-radius: 12px;
              padding: 16px;
              font-size: 14px;
              color: #334155;
              line-height: 1.6;
              white-space: pre-wrap;
              font-weight: 500;
            }
            .footer {
              background-color: #f8fafc;
              padding: 20px 24px;
              border-top: 1px solid #e2e8f0;
              text-align: center;
              font-size: 12px;
              color: #64748b;
              font-weight: 500;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Inquiry Received</h1>
              <p>Submitted via Contact Form</p>
            </div>
            <div class="content">
              <div class="field-group">
                <div class="label">Sender Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field-group">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${email}" style="color: #7c3aed; text-decoration: none;">${email}</a></div>
              </div>
              <div class="field-group">
                <div class="label">Subject</div>
                <div class="value">${subject || "No Subject"}</div>
              </div>
              <div class="field-group">
                <div class="label">Message Content</div>
                <div class="message-box">${message}</div>
              </div>
            </div>
            <div class="footer">
              This is an automated notification from your website contact system.
            </div>
          </div>
        </body>
        </html>
      `;

      const mailOptions = {
        from: process.env.SMTP_FROM || `"Website Contact Form" <${process.env.SMTP_USER}>`,
        to: process.env.SMTP_TO || process.env.SMTP_USER,
        replyTo: email,
        subject: subject ? `Contact Form: ${subject}` : `New Contact Form Submission from ${name}`,
        text: `New Contact Form Submission:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || "N/A"}\nMessage: ${message}`,
        html: htmlContent,
      };

      await transporter.sendMail(mailOptions);
      return res.status(200).json({ success: true, message: "Email sent successfully." });
    } catch (err: any) {
      console.error("Error sending email through nodemailer:", err);
      return res.status(500).json({ error: "Failed to send email. " + err.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
