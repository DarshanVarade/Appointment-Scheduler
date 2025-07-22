import { Router } from "express";
import {
  createBusiness,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
} from "../controllers/business.controller.js";
import { verifyJwt } from "../middlewares/auth.middlewares.js";

const router = Router();

router.use(verifyJwt);

router.route("/").post(createBusiness);
router
  .route("/:businessId")
  .get(getBusinessById)
  .put(updateBusiness)
  .delete(deleteBusiness);

export default router;
