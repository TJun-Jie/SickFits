import { createTransport, getTestMessageUrl } from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeEmail(text: string): string {
  return `
        <div style="
            border: 1px solid black;
            padding: 20px;
            font-family: sans-serif;
            line-height: 2;
            font-size: 20px;
        ">
            <h2>Hello there </h2>
            <p>${text} </p>
            <p>JJ</p>
        </div>
    `;
}

export interface Envelope {
  from: string;
  to: string[];
}

export interface MailResponse {
  accepted: string[];
  rejected: any[];
  envelopeTime: number;
  messageTime: number;
  messageSize: number;
  response: string;
  envelope: Envelope;
  messageId: string;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  // email user a token
  const info = (await transport.sendMail({
    to,
    from: 'text@example.com',
    subject: 'Your password reset token!',
    html: makeEmail(
      `Your password reset token is here! <a href = "${process.env.FRONTEND_URL}/reset?token=${resetToken}"> Click Here to reset </a>`
    ),
  })) as MailResponse;
  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`💌 Message Sent!  Preview it at ${getTestMessageUrl(info)}`);
  }
}
