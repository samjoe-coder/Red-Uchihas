import { create } from "../repositories/hotel.repo.js";
import { sendHotelActivationEmail } from "../emails/hotelActivation.email.js"

const hotelCreation = async (hotel) => {

    const data = await create(hotel);
    console.log(data);

    if(data){
        // send a email to the onwer
        try{
            await sendHotelActivationEmail(hotel);
        }
        catch(e){
            console.log(e);
        }
    }

    return data;

}

export { hotelCreation };