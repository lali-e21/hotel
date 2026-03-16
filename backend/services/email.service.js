import nodemailer from 'nodemailer';

class EmailService {
    static async sendConfirmation(user, booking) {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: `"Sunrise Grand Hotel" <${process.env.EMAIL_USER}>`,
            to: user.email,
            subject: 'Booking Confirmation - Sunrise Grand Hotel',
            text: `Dear ${user.name}, your booking ${booking.bookingReference} is confirmed!`,
            html: `<h1>Booking Confirmed</h1><p>Dear ${user.name}, your booking for ${booking.room.name} from ${booking.checkIn.toLocaleDateString()} to ${booking.checkOut.toLocaleDateString()} is confirmed.</p>`,
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Email sending failed:', error);
        }
    }
}

export default EmailService;
