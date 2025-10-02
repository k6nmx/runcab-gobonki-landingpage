import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";

let transporter: Transporter | null = null;

export function getTransporter() {
  if (!transporter) {
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      throw new Error('[email] Missing required SMTP environment variables');
    }

    console.log('[email] Creating transporter with config:', {
      host: smtpHost,
      port: smtpPort,
      user: smtpUser,
      hasPassword: !!smtpPass,
    });

    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort) || 587,
      secure: Number(smtpPort) === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });
  }
  
  return transporter;
}