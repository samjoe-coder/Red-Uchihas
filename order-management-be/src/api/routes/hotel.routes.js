import { Router } from "express";
import { createHotel, updateHotel } from "../controllers/hotel.controller.js";

const router = Router();

router.post('/create', createHotel);
router.post('/update', updateHotel);

export default router;