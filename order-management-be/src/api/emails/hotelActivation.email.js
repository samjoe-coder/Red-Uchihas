import { sendEmail } from "../../config/email.js";

const sendHotelActivationEmail = async (hotel) => {
    const subject = "Hotel Activation";
    const html = `<p>Your hotel ${hotel.name} has been activated</p>`;
    await sendEmail("sam.cse.006@gmail.com", subject, html);
}

export { sendHotelActivationEmail };