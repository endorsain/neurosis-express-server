import { activityModel } from "../../../../../mongo/index.js";

export const weeklyProgrammingOfActiveActivity = (userId) => {
  const result = activityModel.find(
    {
      user_id: userId,
      "meta.is_active": true,
    },
    {
      title: 1,
      weekly_programming: 1,
    }
  );

  return result;
};

export const getWeeklyProgrammingWihtContent = (weekly) => {
  const filipinas = weekly.filter((obj) => {
    return (
      Array.isArray(obj.weekly_programming.week) &&
      obj.weekly_programming.week.length > 0
    );
  });
  return filipinas;
};
