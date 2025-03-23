import { Router } from "express";
import { signup, signin } from "./controller.js";

const userAccessRouter = Router();

userAccessRouter.post("/sign-up", signup);
userAccessRouter.post("/sign-in", signin);

export default userAccessRouter;
