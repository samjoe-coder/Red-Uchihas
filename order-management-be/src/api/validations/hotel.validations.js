import Joi from 'joi';
import validations from '../../config/validation.js';

const { uuid, name, address, description, customeCareNumber } = validations;

const hotelValidation = Joi.object({
    name: name,
    address: address,
    description: description,
    customeCareNumber: customeCareNumber,
    ownerId: uuid
});

const validateHotel = (hotel) => {
    return hotelValidation.validate(hotel, { abortEarly: false });
}

const hotelUpdateValidation = Joi.object({
    id: uuid,
});

const validateHotelUpdate = (hotel) => {
    return hotelUpdateValidation.validate(hotel, { abortEarly: false });
}

export { validateHotel, validateHotelUpdate };