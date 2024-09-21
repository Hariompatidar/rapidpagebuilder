const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Page Published</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 5px; overflow: hidden;">
        <tr>
          <td style="padding: 20px;">
            <h1 style="color: #0066cc; margin-bottom: 20px;">Your Page Has Been Published!</h1>
            <p style="margin-bottom: 15px;">Dear ${options.userName},</p>
            <p style="margin-bottom: 15px;">We're excited to inform you that your page has been successfully published. Here are the details:</p>
            <table width="100%" cellpadding="10" cellspacing="0" style="background-color: #ffffff; border-radius: 5px; margin-bottom: 20px;">
              <tr>
                <td style="border-bottom: 1px solid #eee;"><strong>Page Title:</strong></td>
                <td style="border-bottom: 1px solid #eee;">${options.pageTitle}</td>
              </tr>
              <tr>
                <td style="border-bottom: 1px solid #eee;"><strong>Published Date:</strong></td>
                <td style="border-bottom: 1px solid #eee;">${options.publishDate}</td>
              </tr>
              <tr>
                <td><strong>Published Time:</strong></td>
                <td>${options.publishTime}</td>
              </tr>
            </table>
            <p style="margin-bottom: 15px;">You can view your published page by clicking the button below:</p>
            <a href="${options.pageUrl}" style="display: inline-block; background-color: #0066cc; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; margin-bottom: 20px;">View Your Page</a>
            <p style="margin-bottom: 15px;">Thank you for using our platform. If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
            <p style="margin-bottom: 0;">Best regards,<br>The Rapid Page Builder Team</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
  console.log("Mail sent to: " + options.email, options.subject);
};

module.exports = sendEmail;