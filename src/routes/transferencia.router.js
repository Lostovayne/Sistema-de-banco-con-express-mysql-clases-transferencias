import { Router } from "express";
import {
    GetAllTransfer,
    CreateTransfer,
} from "../controllers/transferencia.controller.js";
const router = Router();

router.get("/", GetAllTransfer);
router.post("/", CreateTransfer);

export default router;
