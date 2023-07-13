import { Router } from "express";
import {
    CreateUser,
    DeleteUser,
    GetAllUsers,
    UpdateUser,
} from "../controllers/usuarios.controller.js";
const router = Router();

router.get("/", GetAllUsers);
router.post("/", CreateUser);
router.put("/:id", UpdateUser);
router.delete("/:id", DeleteUser);

export default router;
