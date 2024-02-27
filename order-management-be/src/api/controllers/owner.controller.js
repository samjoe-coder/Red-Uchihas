import { v4 as uuidv4 } from 'uuid';
import ownerCreation from "../services/owner.service.js";
import validateOwner from "../validations/owner.validations.js";
import { httpCodes } from "../utils/common.js";

const createOwner = async (req, res) => {
    try{

        const { error, value } = validateOwner(req.body);
        if (error) {
            let statusCode = 400;
            return res.status(statusCode).json({ message: httpCodes[statusCode], details: error.details });
        }

        const restaurantOwner = {
            id: uuidv4(),
            name: value.name,
            email: value.email,
            phone: value.phone,
            password: value.password,
            address: value.address || null,
            role: value.role || 'owner'
        };

        const newOwner = await ownerCreation(restaurantOwner);

        if(newOwner){
            let statusCode = 201;
            return res.status(statusCode).json(
                {message: httpCodes[statusCode],
                owner: newOwner});
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

export default createOwner;