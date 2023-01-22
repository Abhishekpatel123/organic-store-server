import * as nodemailer from "nodemailer";
import config from "../config";

interface SendMailInterFace {
  to: string;
  subject: string;
  text?: string;
  html: string;
}

const sendMail = ({ to, subject, text, html }: SendMailInterFace) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: config.nodemailerConfig.EMAIL,
      pass: config.nodemailerConfig.PASSWORD,
    },
  });

  return new Promise<any>((resolve, reject) => {
    transport.sendMail(
      {
        from: config.nodemailerConfig.EMAIL,
        to,
        text,
        html,
        subject,
      },
      (err, info) => {
        if (err) return reject({ message: "Email not send", err });
        return resolve(info);
      }
    );
  });
};

export default sendMail;
