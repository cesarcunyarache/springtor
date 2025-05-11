"use server";

import { transporter } from "./mail.config";

export async function sendMail({
  email,
  sendTo,
  subject,
  text,
  html,
}: {
  email: string | undefined;
  sendTo?: string;
  subject: string;
  text: string;
  html?: string;
}) {
  try {
    await transporter.verify();

    const info = await transporter.sendMail({
      from: email,
      to: sendTo || process.env.SITE_MAIL_RECIEVER,
      subject,
      text,
      html: html || "",
    });


    return { success: true, messageId: info.messageId };
  } catch (error) {
    return { success: false, error };
  }
}
