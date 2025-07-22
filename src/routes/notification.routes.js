import { Router } from "express";
import { sendNotification } from "../controllers/notification.controller.js";
import { verifyJwt } from "../middlewares/auth.middlewares.js";

const router = Router();

router.use(verifyJwt);

router.route("/").post(sendNotification);

export default router;
