import { Router } from "express";
import webTokenValidationMiddleware from "../../middlewares/token-validation/webTokenValidtion-midd.js";
import userAccessRouter from "./user-access/routes.js";
import authUserRouter from "./auth-user/routes.js";

const commonWebUserRouter = Router();

commonWebUserRouter.use("/user-access", userAccessRouter);

commonWebUserRouter.use(webTokenValidationMiddleware);

commonWebUserRouter.use("/auth-user", authUserRouter);

export default commonWebUserRouter;
