import { sendSuccessResponse } from "../../../../../utils/index.js";
import { activityModel } from "../../../../../mongo/index.js";

export const createdActivity = async (req, res, next) => {
  try {
    const { userData, activity } = req.body;
    console.log("activity: ", activity);

    const newActivity = new activityModel({
      user_id: userData.user_id,
      title: activity.title,
    });

    const savedActivity = await newActivity.save();

    console.log("savedActivity: ", savedActivity);

    return sendSuccessResponse(res, {
      data: {
        activity: savedActivity,
        message: "hola",
      },
    });
  } catch (error) {
    next(error);
  }
};

export const addWeeklyProgramming = async (req, res, next) => {
  try {
    const { userData, weeklyProgramming } = req.body;
    console.log(weeklyProgramming);

    const result = await activityModel.findOneAndUpdate(
      {
        user_id: userData.user_id,
        title: weeklyProgramming.activity.title,
      },
      {
        $push: {
          "weekly_programming.week": {
            $each: weeklyProgramming.week,
          },
        },
      },
      {
        new: true,
        upsert: false,
      }
    );

    return sendSuccessResponse(res, {
      data: {
        activity: result,
        message: "salio bien!",
      },
    });
  } catch (error) {
    next(error);
  }
};

export const activatedActivity = async (req, res, next) => {
  try {
    const { userData, activatedActivity } = req.body;

    console.log(activatedActivity);

    const result = await activityModel.findOneAndUpdate(
      {
        user_id: userData.user_id,
        title: activatedActivity.title,
      },
      {
        $set: {
          "meta.is_active": true,
        },
      },
      {
        new: true,
        upsert: false,
      }
    );

    return await sendSuccessResponse(res, {
      data: {
        activity: result,
        message: "salio bien!",
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deactivatedActivity = async (req, res, next) => {
  try {
    const { userData, deactivatedActivity } = req.body;

    console.log(deactivatedActivity);

    const result = await activityModel.findOneAndUpdate(
      {
        user_id: userData.user_id,
        title: deactivatedActivity.title,
      },
      {
        $set: {
          "meta.is_active": false,
        },
      },
      {
        new: true,
        upsert: false,
      }
    );

    return sendSuccessResponse(res, {
      data: {
        activity: result,
        message: "salio bien!",
      },
    });
  } catch (error) {
    next(error);
  }
};
