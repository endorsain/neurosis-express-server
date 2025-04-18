import { sendSuccessResponse } from "../../../../../utils/index.js";
import { activityModel } from "../../../../../mongo/index.js";
import {
  getWeeklyProgrammingWihtContent,
  weeklyProgrammingOfActiveActivity,
} from "./nose.js";

// Se usa find(), pero se puede usar aggregate() o "paginacion"
// TODO: provar paginacion
export const getActivatedActivity = async (req, res, next) => {
  try {
    const { userData } = req.body;

    // Se puede especificar que se "trae" de cada documento(segundo argumento)
    const result = await activityModel.find(
      {
        user_id: userData.user_id,
        "meta.is_active": true,
      },
      {
        title: 1,
      }
    );

    return sendSuccessResponse(res, {
      data: {
        activities: result,
        message: "salio bien!",
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deletedActivity = async (req, res, next) => {
  try {
    const { userData, deletedActivity } = req.body;

    // Se puede por Id tambien findIdandDelete.
    const result = await activityModel.findOneAndDelete({
      user_id: userData.user_id,
      title: deletedActivity.title,
    });

    return sendSuccessResponse(res, {
      data: {
        activities: result,
        message: "salio bien!",
      },
    });
  } catch (error) {
    next(error);
  }
};

// Traer todas las "programaciones semanales" de las actividades activas
export const weeklyUserInfo = async (req, res, next) => {
  try {
    const { userData } = req.body;

    const weeklyProgramming = await weeklyProgrammingOfActiveActivity(
      userData.user_id
    );

    console.log(weeklyProgramming);

    const ahre = getWeeklyProgrammingWihtContent(weeklyProgramming);

    return sendSuccessResponse(res, {
      data: {
        weekly: ahre,
        message: "salio bien!",
      },
    });
  } catch (error) {
    next(error);
  }
};
