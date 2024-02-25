import { Router } from "express";
import createOwner from "../controllers/owner.controller.js";

const router = Router();
router.get('/', (req, res) => { res.send({ message: "Hello World" }) });

router.post('/create', createOwner);

export default router;