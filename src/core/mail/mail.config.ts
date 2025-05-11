import { createTransport } from 'nodemailer';

export const emailConfig = {
  host: process.env.MAIL_SERVER_HOST,
  port: Number(process.env.MAIL_SERVER_PORT || 465),
  secure: true,
  auth: {
    user: process.env.MAIL_SERVER_USER,
    pass: process.env.MAIL_SERVER_PASSWORD,
  }
};

export const transporter = createTransport({
  ...emailConfig
});