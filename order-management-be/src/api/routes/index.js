import { Router } from "express";
import ownerRoutes from "./owner.routes.js";
import hotelRoutes from "./hotel.routes.js";

const router = Router();
router.use('/owner', ownerRoutes);
router.use('/hotel', hotelRoutes);

export default router