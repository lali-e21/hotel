import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class InvoiceService {
    static async generateInvoice(booking, payment) {
        return new Promise((resolve, reject) => {
            const doc = new PDFDocument({ margin: 50 });
            const filename = `invoice-${booking.bookingReference}.pdf`;
            const filePath = path.join(__dirname, `../uploads/${filename}`);
            const stream = fs.createWriteStream(filePath);

            doc.pipe(stream);

            // Header
            doc.fontSize(25).text('SUNRISE GRAND HOTEL', { align: 'center' });
            doc.fontSize(10).text('Addis Ababa, Ethiopia', { align: 'center' });
            doc.moveDown();

            doc.fontSize(20).text('INVOICE', { underline: true });
            doc.moveDown();

            // Booking Details
            doc.fontSize(12).text(`Invoice Number: ${payment.transactionId}`);
            doc.text(`Date: ${new Date().toLocaleDateString()}`);
            doc.text(`Booking Ref: ${booking.bookingReference}`);
            doc.moveDown();

            doc.text(`Customer: ${booking.user.name}`);
            doc.text(`Email: ${booking.user.email}`);
            doc.moveDown();

            // Table Header
            const tableTop = 250;
            doc.font('Helvetica-Bold');
            doc.text('Description', 50, tableTop);
            doc.text('Amount', 400, tableTop, { align: 'right' });
            doc.moveDown();
            doc.font('Helvetica');

            // Room details
            doc.text(`Room: ${booking.room.name}`, 50, tableTop + 20);
            doc.text(`${booking.totalPrice.toFixed(2)} ETB`, 400, tableTop + 20, { align: 'right' });

            // Total
            doc.moveDown();
            doc.fontSize(15).font('Helvetica-Bold').text(`Total Paid: ${payment.amount.toFixed(2)} ETB`, 400, doc.y + 20, { align: 'right' });

            // Footer
            doc.fontSize(10).font('Helvetica').text('Thank you for choosing Sunrise Grand Hotel!', 50, 700, { align: 'center' });

            doc.end();

            stream.on('finish', () => resolve(filePath));
            stream.on('error', (err) => reject(err));
        });
    }
}

export default InvoiceService;
