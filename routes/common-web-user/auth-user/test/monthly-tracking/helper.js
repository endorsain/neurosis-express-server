import { monthlyTrackingMondel } from "../../../../../mongo/index.js";

export const getDay = async (userData, currentDay) => {
  //   const  = await monthlyTrackingMondel.findById({
  //     user_id: userData.user_id,
  //     _id: userData.monthly_tracking.id,
  //   });
  try {
    const day = await monthlyTrackingMondel.findOne(
      {
        user_id: userData.user_id,
        _id: userData.monthly_tracking.id,
        // TODO: buscar en el ultimo objecto del array
        "days_tracking.day": currentDay,
      },
      {
        "days_tracking.$": 1,
      }
    );
    return day;
  } catch (error) {}
};

export const totalMonthTimeMs(timestamp){
  
}

export const addUnknownActivity = () => {

}