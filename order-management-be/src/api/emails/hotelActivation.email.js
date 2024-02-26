import fs from "fs/promises";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { sendEmail } from "../../config/email.js";

const sendHotelActivationEmail = async (hotel) => {
    
    try {
        const owner = await hotel.getOwner();
        const hotelName = hotel.name;
        const ownerName = owner.name;
        const email = owner.email;
        const subject = "Hotel Activation - Project Red Uchihas";
        
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const emailBody = path.resolve(__dirname, '../emailBody/newHotelActEmail.html');
        let html = await fs.readFile(emailBody, { encoding: 'utf-8' });
        html = html.replace('{{hotelName}}', hotelName);
        html = html.replace('{{ownerName}}', ownerName);
        html = html.replace('{{activationLink}}', `http://localhost:8080/api/hotel/update/?id=${hotel.id}`);

        await sendEmail(email, subject, html);
    } catch (err) {
        console.error('Error:', err);
    }
}

export { sendHotelActivationEmail };