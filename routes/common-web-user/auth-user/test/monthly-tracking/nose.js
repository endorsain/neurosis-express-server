import { monthlyTrackingMondel } from "../../../../../mongo/index.js";
import { sendSuccessResponse } from "../../../../../utils/index.js";

// "user_data": {
//     "firebase_id": "VGuOgFguzkPUDSw1SUoaei9NTs12",
//     "username": "masda",
//     "user_id": "67fb44e249adfeb5e1ce6679",
//     "monthly_tracking": {
//         "id": "67fca96c6eb8267c491bb265",
//         "created_at": 1744611692501
//     }
// },
export const getMonthlyTracking = async (req, res, next) => {
  try {
    const { userData } = req.body;

    const result = await monthlyTrackingMondel.find({
      user_id: userData.user_id,
      _id: userData.monthly_tracking.id,
    });

    return sendSuccessResponse(res, {
      data: {
        user_data: userData,
        result: result,
        message: "salio bien!",
      },
    });
  } catch (error) {
    next(error);
  }
};

export const addActivity = async (req, res, next) => {
  try {
    const { userData, activity, dateNow } = req.body;

    console.log("activity: ", activity);
    console.log("dateNow: ", dateNow);

    //podria ser 'date'
    const currentDate = new Date(dateNow);
    const currentDay = currentDate.getDay();

    // const monthlyTrackingDoc = await monthlyTrackingMondel.findByIdAndUpdate({
    //   user_id: userData.user_id,
    //   _id: userData.monthly_tracking.id,
    // });

    const monthlyTracking = await monthlyTrackingMondel.findOne(
      {
        user_id: userData.user_id,
        _id: userData.monthly_tracking.id,
      },
      {
        days_tracking: { $slice: -1 },
      }
    );

    console.log("monthlyTracking", monthlyTracking);

    // console.log("monthlyTrakingDoc", monthlyTrackingDoc);

    return sendSuccessResponse(res, {
      data: {
        user_data: userData,
        message: "salio bien!",
      },
    });
  } catch (error) {
    next(error);
  }
};
