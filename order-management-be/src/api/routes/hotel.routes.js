import { Router } from "express";
import createHotel from "../controllers/hotel.controller.js";

const router = Router();

router.post('/create', createHotel);

export default router;