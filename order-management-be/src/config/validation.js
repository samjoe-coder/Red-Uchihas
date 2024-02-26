import Joi from 'joi';

const validations = {
    uuid: Joi.string().uuid({ version: 'uuidv4' }).required(),
    name: Joi.string().required(),
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email address'
    }),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.pattern.base': 'Phone number must contain 10 digits'
    }),
    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/)
        .required()
        .messages({
            'string.pattern.base': 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special symbol.',
            'string.min': 'Password must be at least {#limit} characters long.'
        }),
    address: Joi.string().allow('').optional(),
    role: Joi.string().allow('').optional(),
    address: Joi.string().required(),
    description: Joi.string().optional(),
    customeCareNumber: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.pattern.base': 'Phone number must contain 10 digits'
    })
};

export default validations;