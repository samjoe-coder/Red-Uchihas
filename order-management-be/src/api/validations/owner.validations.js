import Joi from 'joi';

const emailValidation = Joi.string().email().required().messages({
'string.email': 'Email must be a valid email address'});

const passwordValidation = Joi.string()
.min(8)
.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
.required()
.messages({
    'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special symbol.',
    'string.min': 'Password must be at least {#limit} characters long.'});

const phoneValidation = Joi.string().pattern(/^[0-9]{10}$/).required().messages({
'string.pattern.base': 'Phone number must contain 10 digits'});    

const ownerValidation = Joi.object({
    name: Joi.string().required(),
    email: emailValidation,
    phone: phoneValidation,
    password: passwordValidation,
    address: Joi.string().allow('').optional(),
    role: Joi.string().allow('').optional()
});
                            
export default ownerValidation;                          