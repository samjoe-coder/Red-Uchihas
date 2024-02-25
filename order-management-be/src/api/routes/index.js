import { Router } from "express";
import userRoutes from "./user.routes.js";
import ownerRoutes from "./owner.routes.js";

const router = Router();
router.use('/user', userRoutes);
router.use('/owner', ownerRoutes);

export default router