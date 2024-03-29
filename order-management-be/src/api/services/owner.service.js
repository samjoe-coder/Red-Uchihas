import { v4 as uuidv4 } from 'uuid';
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import ownerRepo from "../repositories/owner.repository.js";
import { status } from "../models/owner.model.js";
import { sendEmail } from "./email.service.js";
import env from '../../config/env.js';
import moment from 'moment';
import { EMAIL_ACTIONS, CustomError, STATUS_CODE } from '../utils/common.js';

const create = async ( payload ) => {
    try {
        // create payload of user data
        const owner = {
            id: uuidv4(),
            firstName: payload.firstName,
            lastName: payload.lastName,
            phoneNumber: payload.phoneNumber,
            email: payload.email,
            password: payload.password,
            addressLine1: payload.addressLine1,
            addressLine2: payload.addressLine2,
            city: payload.city,
            state: payload.state,
            zipCode: payload.zipCode,
            status: status[1]
        }
        // save the owner details to the database
        const data = await ownerRepo.save( owner );
        // send verification email to the owner
        const verifyOptions = {
            email: owner.email,
            name: `${owner.firstName} ${owner.lastName}`,
            expires: moment().add(1, 'hour').valueOf(),
        };

        const token = CryptoJS.AES.encrypt(JSON.stringify(verifyOptions), env.cryptoSecret).toString();
        await sendEmail(token, owner.email, EMAIL_ACTIONS.VERIFY_USER);
        return data;
    } catch (error) {
        throw CustomError(error.code, error.message);
    }
}

const login = async ( payload ) => {
    try {
        const { email, password } = payload;
        const owner = await ownerRepo.findOne({ email });
        if (!owner) {
            throw CustomError(STATUS_CODE.NOT_FOUND, 'Email not registered');
        }

        const pass = CryptoJS.AES.decrypt(owner.password, env.cryptoSecret).toString(CryptoJS.enc.Utf8);
        if( password !== pass ) {
            throw CustomError(STATUS_CODE.UNAUTHORIZED, 'Invalid password');
        }

        if ( owner.status === status[1] ) {
            throw CustomError(STATUS_CODE.FORBIDDEN, 'Email not verified');
        }

        const { id, firstName, lastName } = owner;
        const token = jwt.sign({ id, firstName, lastName, status: owner.status }, env.jwtSecret, { expiresIn: '12h' });
        return {
            token,
            data: owner
        };
    } catch (error) {
        throw CustomError(error.code, error.message);
    }
}

const verify = async ( payload ) => {   
    try {
        const { email, expires } = payload;
        const owner = await ownerRepo.findOne({ email });
        if (!owner) {
            throw CustomError(STATUS_CODE.NOT_FOUND, 'Invalid request');
        }

        if (owner.status === status[0]) {
            throw CustomError(STATUS_CODE.BAD_REQUEST, 'User already verified Please try login');
        }

        if (moment().valueOf() > expires) {
            const verifyOptions = {
                email: owner.email,
                name: `${owner.firstName} ${owner.lastName}`,
                expires: moment().add(1, 'hour').valueOf(),
            };
            const token = CryptoJS.AES.encrypt(JSON.stringify(verifyOptions), env.cryptoSecret).toString();
            await sendEmail(token, owner.email, EMAIL_ACTIONS.VERIFY_USER);
            throw CustomError(STATUS_CODE.GONE, `Sorry, the link has expired. We've sent a new one to your email. Please check and try again.`);
        }

        owner.status = status[0];
        await owner.save();

        const { id, firstName, lastName } = owner;
        const token = jwt.sign({ id, firstName, lastName, status: owner.status }, env.jwtSecret, { expiresIn: '12h' });
        return {
            token,
            data: owner
        };
    } catch (error) {
        throw CustomError(error.code, error.message);
    }
}

const forget = async ( payload ) => {
    try {
        const { email } = payload;
        
        const owner = await ownerRepo.findOne({ email });
        if( !owner ) {
            throw CustomError(STATUS_CODE.BAD_REQUEST, 'Invalid Email');
        }

        if (owner.status === status[1]) {
            throw CustomError(STATUS_CODE.FORBIDDEN, 'User has not verified email');
        }
        // send verification email to the owner
        const verifyOptions = {
            email: owner.email,
            expires: moment().add(1, 'hour').valueOf()
        };

        const token = CryptoJS.AES.encrypt(JSON.stringify(verifyOptions), env.cryptoSecret).toString();
        await sendEmail(token, owner.email, EMAIL_ACTIONS.FORGOT_PASSWORD);
        return { message: 'Recover password link sent. Please check your email.' }
    } catch (error) {
        throw CustomError(error.code, error.message);
    }
}

const reset = async ( payload ) => {
    try {
        const { email, newPassword, expires } = payload;
        const owner = await ownerRepo.findOne({ email });
        if (!owner) {
            throw CustomError(STATUS_CODE.BAD_REQUEST, 'Invalid request');
        }

        if (owner.status === status[1]) {
            throw CustomError(STATUS_CODE.FORBIDDEN, 'User has not verified email');
        }

        if (moment().valueOf() > expires) {
            const options = {
                email: owner.email,
                password: owner.password,
                expires: moment().add(1, 'hour').valueOf(),
            };
            const token = CryptoJS.AES.encrypt(JSON.stringify(options), env.cryptoSecret).toString();
            await sendEmail(token, owner.email, EMAIL_ACTIONS.FORGOT_PASSWORD);
            throw CustomError(STATUS_CODE.GONE, `Sorry, the link has expired. We've sent a new one to your email. Please check and try again.`);
        }

        owner.password = newPassword;
        await owner.save();
        return { message: 'Password reset successfully' };
    } catch (error) {
        throw CustomError(error.code, error.message);
    }
}

export default { create, login, verify, forget, reset };
