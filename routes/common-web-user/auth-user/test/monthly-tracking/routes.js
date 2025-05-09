import { Router } from "express";
import { addActivity, getMonthlyTracking } from "./nose.js";

const monthlyTrackingRouter = Router();

monthlyTrackingRouter.get("/get-monthly-tracking", getMonthlyTracking);

monthlyTrackingRouter.post("/add-activity", addActivity);

export default monthlyTrackingRouter;
