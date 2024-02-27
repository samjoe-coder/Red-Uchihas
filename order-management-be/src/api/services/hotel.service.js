import { create, update } from "../repositories/hotel.repo.js";
import { sendHotelActivationEmail } from "../emails/hotelActivation.email.js"

const hotelCreation = async (hotel) => {

    const data = await create(hotel);
    
    if(data){
        try{

            await sendHotelActivationEmail(data);

        }
        catch(e){
            console.log(e);
        }
    }

    return data;

}

const hotelUpdate = async (hotel) => {
    hotel.active = true;
    return await update(hotel);
}

export { hotelCreation, hotelUpdate };