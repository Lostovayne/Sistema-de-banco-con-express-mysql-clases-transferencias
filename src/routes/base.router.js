import { Router } from "express";
import { baseRoute } from "../controllers/base.controller.js";

const router = Router();

router.get("/", baseRoute);

export default router;
