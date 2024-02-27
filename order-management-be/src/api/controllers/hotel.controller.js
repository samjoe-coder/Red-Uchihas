import { v4 as uuidv4 } from 'uuid';
import { hotelCreation, hotelUpdate } from "../services/hotel.service.js";
import { validateHotel, validateHotelUpdate } from "../validations/hotel.validations.js";
import { httpCodes } from "../utils/common.js";

const createHotel = async (req, res) => {
    try{
        
        const { error, value } = validateHotel(req.body);
        if (error) {
            let statusCode = 400;
            return res.status(statusCode).json({ message: httpCodes[statusCode], details: error.details });
        }

        const hotel = {
            id: uuidv4(),
            name: value.name,
            address: value.address,
            description: value.description,
            customeCareNumber: value.customeCareNumber,
            ownerId: value.ownerId
        };

        const newHotel = await hotelCreation(hotel);

        if(newHotel){
            let statusCode = 201;
            return res.status(statusCode).json(
                {message: httpCodes[statusCode],
                hotel: newHotel});
        }
        else{
            let statusCode = 500;
            return res.status(statusCode).json({message: httpCodes[statusCode]});
        }
    }
    catch(error){
        let statusCode = 500;
        return res.status(statusCode).json({ message: httpCodes[statusCode], error: error.message });
    }
}

const updateHotel = async (req, res) => {
    try{
        const id = req.query.id;
        const { error, value } = validateHotelUpdate({id});
        if (error) {
            let statusCode = 400;
            return res.status(statusCode).json({ message: httpCodes[statusCode], details: error.details });
        }

        const hotel = {
            id: value.id,
        };

        const updatedHotel = await hotelUpdate(hotel);

        if(updatedHotel){
            let statusCode = 200;
            return res.status(statusCode).json(
                {message: httpCodes[statusCode],
                hotel: updatedHotel});
        }
        else{
            let statusCode = 500;
            return res.status(statusCode).json({message: httpCodes[statusCode]});
        }
    }
    catch(error){
        let statusCode = 500;
        return res.status(statusCode).json({ message: httpCodes[statusCode], error: error.message });
    }
}

export { createHotel, updateHotel };