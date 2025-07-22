import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//import routers
import healthcheckRouter from "./routes/healthcheck.routes.js";
import userRouter from "./routes/user.routes.js";
import businessRouter from "./routes/business.routes.js";
import serviceRouter from "./routes/service.routes.js";
import appointmentRouter from "./routes/appointment.routes.js";
import availabilityRouter from "./routes/availability.routes.js";
import notificationRouter from "./routes/notification.routes.js";
import { errorHandler } from "./middlewares/error.middlewares.js";

//routers
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/businesses", businessRouter);
app.use("/api/v1/services", serviceRouter);
app.use("/api/v1/appointments", appointmentRouter);
app.use("/api/v1/availability", availabilityRouter);
app.use("/api/v1/notifications", notificationRouter);

app.use(errorHandler);
export { app };
