import nodeMailer from 'nodemailer';
import env from "./vars.js";

async function sendEmail(to, subject, html) {
    const transporter = nodeMailer.createTransport({
        host: env.email.host,
        port: env.email.port,
        secure: true,
        service: 'Outlook365',
        auth: {
            user: env.email.user,
            pass: env.email.pass
        }
    });

    const info = await transporter.sendMail({
        from: env.email.from,
        to: to,
        subject: subject,
        html: html
    });

}

export { sendEmail };