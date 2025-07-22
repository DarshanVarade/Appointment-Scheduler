import { Router } from "express";
import {
  createService,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/service.controller.js";
import { verifyJwt } from "../middlewares/auth.middlewares.js";

const router = Router();

router.use(verifyJwt);

router.route("/").post(createService);
router
  .route("/:serviceId")
  .get(getServiceById)
  .put(updateService)
  .delete(deleteService);

export default router;
