require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
    // Create mail transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    // Test email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'Test Email from SKANNJ Contact Form',
        html: `
            <h2>This is a test email</h2>
            <p>If you receive this email, your email configuration is working correctly!</p>
            <p><strong>Time sent:</strong> ${new Date().toLocaleString()}</p>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Test email sent successfully!');
        console.log('Message ID:', info.messageId);
    } catch (error) {
        console.error('❌ Error sending test email:', error);
    }
}

testEmail();
