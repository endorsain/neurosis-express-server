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
  // .lean();
  // '.lean()' obtiene un objeto javascript plano sin todos los metadatos.
  // Lo mismo pasa '.toObject()' Pero esto se aplica en 'filterByCurrentDay' en weekly
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

export const filterByCurrentDay = (weekly, dateNow) => {
  const caca = weekly
    .map((obj) => {
      const filter = obj.weekly_programming.week.filter((obj1) => {
        return obj1.start_day === dateNow.getDay();
      });
      if (filter.length > 0) {
        return {
          ...obj,
          weekly_programming: {
            ...obj.weekly_programming,
            week: filter,
          },
        };
      }
      return null;
    })
    .filter(Boolean);
  return caca;
};
