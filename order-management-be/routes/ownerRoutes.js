import ownerController from '../controllers/ownerController.js';

//import express .Router()
import express from 'express';
const router = express.Router();

router.post('/create', ownerController.createOwner);

router.get('/getAll', ownerController.findAllOwners);

router.get('/getById/:id', ownerController.findOwnerById);

router.get('/getByEmail', ownerController.findOwnerByEmail);

router.put('/update/:id', ownerController.updateOwner);

router.put('/delete/:id', ownerController.deleteOwner);

export default router;