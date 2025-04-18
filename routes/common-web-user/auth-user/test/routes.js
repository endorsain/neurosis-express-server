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
} from "./activities/functions.js";

const testRouter = Router();

// settings
testRouter.post("/create-activity", createdActivity);

testRouter.post("/add-weekly-programming", addWeeklyProgramming);

testRouter.patch("/activated-activity", activatedActivity);

testRouter.patch("/deactivated-activity", deactivatedActivity);

// funciones
testRouter.get("/get-activated-activity", getActivatedActivity);

testRouter.delete("/deleted-activity", deletedActivity);

testRouter.get("/weekly-info", weeklyUserInfo);

export default testRouter;
