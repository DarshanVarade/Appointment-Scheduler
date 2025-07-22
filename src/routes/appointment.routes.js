import { Router } from "express";
import {
  createAppointment,
  getAppointmentById,
  updateAppointment,
  rescheduleAppointment,
  cancelAppointment,
} from "../controllers/appointment.controller.js";
import { verifyJwt } from "../middlewares/auth.middlewares.js";

const router = Router();

router.use(verifyJwt);

router.route("/").post(createAppointment);
router.route("/:appointmentId").get(getAppointmentById).put(updateAppointment);
router.route("/:appointmentId/reschedule").patch(rescheduleAppointment);
router.route("/:appointmentId/cancel").patch(cancelAppointment);

export default router;
