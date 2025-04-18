import { Router } from "express";
import { sendSuccessResponse } from "../../../utils/index.js";
import activitiesRouter from "./activities/routes.js";
import testRouter from "./test/routes.js";

const authUserRouter = Router();

authUserRouter.use("/activities", activitiesRouter);

authUserRouter.use("/test", testRouter);

authUserRouter.get("/get-all", async (req, res, next) => {
  try {
    const { userData } = req.body;
    console.log("llego");
    return await sendSuccessResponse(res, { data: userData });
  } catch (error) {
    next(error);
  }
});

authUserRouter.delete("/sign-out", async (req, res, next) => {
  try {
    res.clearCookie(process.env.KEY_REFRESHTOKEN, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.clearCookie(process.env.KEY_IDTOKEN, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    sendSuccessResponse(res, {});
  } catch (error) {
    console.error("Error in /sign-out.", error);
    next(error);
  }
});

// authUserRouter.post("/add-leisure", async (req, res) => {
//   try {
//     const { mongoData, title } = req.body;
//     const { userId } = mongoData;

//     // Con esta nueva version no se actualiza el valor dentro
//     // de 'updatedAt' en el indice del documento. Estoy
//     // planteando si es necesario que lo haga o que haya
//     // un 'updatedAt' en leisure.
//     const userLeisure = await userModel.findById(userId).select("leisure");

//     const isDuplicated = userLeisure.leisure.list.some(
//       (v) => v.title === title
//     );

//     if (isDuplicated) {
//       return sendResponse(res, {}, "/add-leisure/duplicate-title/", 400, false);
//     }

//     const newLeisure = await userModel.findByIdAndUpdate(
//       userId,
//       {
//         $push: {
//           "leisure.list": {
//             title,
//           },
//         },
//       },
//       { new: true } // devuelve el documento actualizado si es necesario.
//     );

//     console.log("Leisure: ", userLeisure);
//     console.log("NewLeisure: ", newLeisure);

//     sendResponse(
//       res,
//       { leisure: newLeisure },
//       "/add-leisure/success/",
//       200,
//       true
//     );
//   } catch (error) {
//     console.log("Error in /add-leisure. ", error);
//     sendResponse(res, addResWebMidd(res), "/add-leisure/error/", 500, false);
//   }
// });

// authUserRouter.get("/get-leisure", async (req, res) => {
//   try {
//     const { mongoData } = req.body;
//     //console.log(uid, mongoData);
//     const { userId } = mongoData;

//     const data = await userModel.findById(userId, { leisure: 1, _id: 0 });

//     console.log(data);
//     const leisure = data.leisure;
//     console.log(leisure);

//     sendResponse(
//       res,
//       //addResWebMidd(res, { leisure }),
//       { leisure },
//       "/get-leisure/success/",
//       200,
//       true
//     );
//   } catch (error) {
//     console.error("Error in /get-leisure.", error);
//     sendResponse(res, addResWebMidd(res), "/get-leisure/error/", 500, false);
//   }
// });

export default authUserRouter;
