import { Router } from "express";
import { getAvailability } from "../controllers/availability.controller.js";
import { verifyJwt } from "../middlewares/auth.middlewares.js";

const router = Router();

router.use(verifyJwt);

router.route("/").get(getAvailability);

export default router;
