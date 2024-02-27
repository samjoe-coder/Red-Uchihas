import Joi from 'joi';
import validations from '../../config/validation.js';

const { name, email, phone, password, address, role } = validations;

const ownerValidation = Joi.object({
    name: name,
    email: email,
    phone: phone,
    password: password,
    address: address,
    role: role
});


const validateOwner = (owner) => {
    return ownerValidation.validate(owner, { abortEarly: false });
}

export default validateOwner;