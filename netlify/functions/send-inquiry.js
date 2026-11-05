const nodemailer = require('nodemailer');

const jsonResponse = (statusCode, body) => ({
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
});

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return jsonResponse(405, { error: 'Method not allowed.' });
    }

    if (!event.body || event.body.length > 10000) {
        return jsonResponse(400, { error: 'Invalid inquiry.' });
    }

    let inquiry;
    try {
        inquiry = JSON.parse(event.body);
    } catch {
        return jsonResponse(400, { error: 'Invalid inquiry.' });
    }

    const name = typeof inquiry.name === 'string' ? inquiry.name.trim() : '';
    const email = typeof inquiry.email === 'string' ? inquiry.email.trim() : '';
    const message = typeof inquiry.message === 'string' ? inquiry.message.trim() : '';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (inquiry['bot-field']) {
        return jsonResponse(400, { error: 'Invalid inquiry.' });
    }

    if (!name || name.length > 120 || !emailPattern.test(email) || email.length > 254 || !message || message.length > 5000) {
        return jsonResponse(400, { error: 'Please provide a valid name, email, and message.' });
    }

    const sender = process.env.GMAIL_USER;
    const appPassword = process.env.GMAIL_APP_PASSWORD;
    const recipient = process.env.INQUIRY_TO;

    if (!sender || !appPassword || !recipient) {
        console.error('Contact form email is not configured. Set GMAIL_USER, GMAIL_APP_PASSWORD, and INQUIRY_TO.');
        return jsonResponse(500, { error: 'Email delivery is not configured yet.' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: sender, pass: appPassword }
    });

    try {
        await transporter.sendMail({
            from: sender,
            to: recipient,
            replyTo: email,
            subject: `Portfolio inquiry from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`
        });
    } catch (error) {
        console.error('Contact form email delivery failed.', error);
        return jsonResponse(502, { error: 'The email could not be sent. Please try again later.' });
    }

    return jsonResponse(200, { message: 'Inquiry sent.' });
};
