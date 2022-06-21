import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_AUTH_USER,
    pass: process.env.MAILTRAP_AUTH_PASS,
  },
});

console.log();
// console.log(env("MAILTRAP_AUTH_USER"));

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <oi@joaopcmfricks.io>",
      to: "Joao P C M Fricks <jpfricks@gmail.com>",
      subject,
      html: body,
    });
  }
}
