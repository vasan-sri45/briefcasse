import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // 1. Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT == 465, 
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Define the email options
  const mailOptions = {
    from: `Your App Name <${process.env.EMAIL_USER}>`, // Sender address
    to: options.email, // List of receivers
    subject: options.subject, // Subject line
    html: options.html, // HTML body
    text: options.text, // Plain text body
  };

  // 3. Send the email
  await transporter.sendMail(mailOptions);
};

export default sendEmail;