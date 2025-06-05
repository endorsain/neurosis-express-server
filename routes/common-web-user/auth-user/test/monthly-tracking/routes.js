import { Router } from "express";
import { startActivity, getMonthlyTracking, createDay } from "./nose.js";

const monthlyTrackingRouter = Router();

// Traer documento actual dentro de monthyle-tracking
monthlyTrackingRouter.get("/get-monthly-tracking", getMonthlyTracking);
// Crear dia
monthlyTrackingRouter.post("/create-day", createDay);

monthlyTrackingRouter.post("/start-activity", startActivity);

export default monthlyTrackingRouter;
