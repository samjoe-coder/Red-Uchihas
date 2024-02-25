import ownerCreation from "../services/owner.service.js";
import { v4 as uuidv4 } from 'uuid';

const createOwner = async (req, res) => {
    try{
        const restaurantOwner = {
            id: uuidv4(),
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            address: req.body.address || null,
            role: req.body.role || 'owner'
        };

        if(!restaurantOwner.name || !restaurantOwner.email || !restaurantOwner.phone || !restaurantOwner.password){
            return res.status(400).json({message: 'Insufficient data'});
        }

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