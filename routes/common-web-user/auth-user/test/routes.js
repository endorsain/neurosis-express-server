import { Router } from "express";
import {
  activatedActivity,
  addWeeklyProgramming,
  createdActivity,
  deactivatedActivity,
} from "./activities/setting.js";
import {
  getActivatedActivity,
  deletedActivity,
  weeklyUserInfo,
  allActivities,
} from "./activities/functions.js";
import monthlyTrackingRouter from "./monthly-tracking/routes.js";

const testRouter = Router();

// configuracion se actividades
testRouter.post("/create-activity", createdActivity);

testRouter.post("/add-weekly-programming", addWeeklyProgramming);

testRouter.patch("/activated-activity", activatedActivity);

testRouter.patch("/deactivated-activity", deactivatedActivity);

testRouter.delete("/deleted-activity", deletedActivity);
// funciones para actividades
//TODO: cambiar get-activated-activity -> activated-activities
testRouter.get("/get-activated-activity", getActivatedActivity);

testRouter.get("/all-activities", allActivities);

testRouter.get("/weekly-info", weeklyUserInfo);

// TODO: se puede cambiar nombre de coleccion a monthly tracking
testRouter.use("/monthly-tracking", monthlyTrackingRouter);

export default testRouter;
