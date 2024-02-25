import ownerCreation from "../services/owner.service.js";
import { v4 as uuidv4 } from 'uuid';
import ownerValidation from "../services/joiValidation.js";

function validateRequestBody(reqBody) {
    return ownerValidation.validate(reqBody, { abortEarly: false });
}
const createOwner = async (req, res) => {
    try{

        const { error, value } = validateRequestBody(req.body);
        if (error) {
            return res.status(400).json({ message: 'Validation error', details: error.details });
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
            return res.status(201).json({message: 'Owner created successfully'});
        }
        else{
            return res.status(500).json({message: 'Error creating owner'});
        }
    }
    catch(error){
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

export default createOwner;