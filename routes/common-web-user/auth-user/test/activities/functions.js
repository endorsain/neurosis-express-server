import { sendSuccessResponse } from "../../../../../utils/index.js";
import { activityModel } from "../../../../../mongo/index.js";
import {
  filterByCurrentDay,
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

export const allActivities = async (req, res, next) => {
  try {
    const { userData } = req.body;

    const result = await activityModel.find(
      { user_id: userData.user_id },
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
// TODO: Usar '.toObject()'
export const weeklyUserInfo = async (req, res, next) => {
  try {
    console.log("----weeklyUserInfo----");
    const { userData } = req.body;
    const dateNow = new Date(Date.now());

    //weeklyProgrammingDoc podria ser
    const weeklyProgramming = await weeklyProgrammingOfActiveActivity(
      userData.user_id
    );

    const plainWeeklyProgramming = weeklyProgramming.map((doc) =>
      doc.toObject()
    );

    console.log(weeklyProgramming);

    const weeklyContent = getWeeklyProgrammingWihtContent(
      plainWeeklyProgramming
    );

    console.log(weeklyContent);

    const weeklyCurrentDays = filterByCurrentDay(weeklyContent, dateNow);

    console.log("xdddd", weeklyCurrentDays);

    return sendSuccessResponse(res, {
      data: {
        weekly: weeklyCurrentDays,
        message: "salio bien!",
      },
    });
  } catch (error) {
    next(error);
  }
};
