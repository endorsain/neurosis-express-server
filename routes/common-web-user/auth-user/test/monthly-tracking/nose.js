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

export const createDay = async (req, res, next) => {
  try {
    const { userData, dateNow } = req.body;

    const currentDate = new Date(dateNow);
    const currentDay = currentDate.getDate();

    const monthlyTrackingDoc = await monthlyTrackingMondel.findOne(
      {
        user_id: userData.user_id,
        _id: userData.monthly_tracking.id,
      },
      {
        days_tracking: { $slice: -1 },
      }
    );

    console.log("monthlyTrackingDoc: ", monthlyTrackingDoc);
    let updatedDoc;

    const lastDay = monthlyTrackingDoc?.days_tracking?.[0];
    const isDayCreated = lastDay?.day === currentDay;

    if (!isDayCreated) {
      // Se crea un nuevo dia.
      // 1) Revisa la actividad del ultima dia.
      // a) Si no termino la actividad, entonces se termina esa actividad al final de ese dia
      // y sigue esa misma actividad al siguiente dia.
      // b) Si cambio de mes, se revisa el ultimo dia del mes anterior y hace lo mismo.
      // Para esto tal vez es necesario tener un campo que determine el mes del año.
      // mes-año Ejemplo => date: 05-2025
      // c) Si no se detectan actividades entonces se completa con "activad desconocida".

      const newDay = {
        day: currentDay,
        // start_time y end_time del dia determinan cuando empieza una actividad y cuando termina la ultima actividad.
      };

      console.log("El dia no fue creado");
      // como el dia no fue creado se establece el tiempo de "Actividad desconocida"
      updatedDoc = await monthlyTrackingMondel.findOneAndUpdate(
        {
          user_id: userData.user_id,
          _id: userData.monthly_tracking.id,
        },
        {
          $push: { days_tracking: newDay },
        },
        {
          new: true,
          projection: { days_tracking: { $slice: -1 } },
        }
      );

      console.log("El dia fue creado.");
    } else {
      console.log("El dia ya esta creado.");
    }

    return sendSuccessResponse(res, {
      data: {
        monthlyTrackingDoc,
        updatedDoc,
      },
      message: "jeje se cumplio!",
    });
  } catch (error) {
    next(error);
  }
};

export const startActivity = async (req, res, next) => {
  try {
    const { userData, activity, dateNow } = req.body;

    const monthlyTrackingDoc = await monthlyTrackingMondel.findOne(
      {
        user_id: userData.user_id,
        _id: userData.monthly_tracking.id,
      },
      {
        days_tracking: { $slice: -1 },
      }
    );

    console.log("monthlyTrackingDoc", monthlyTrackingDoc);

    const dayTracking = monthlyTrackingDoc.days_tracking[0];

    consolog.log("dayTracking: ", dayTracking);

    return sendSuccessResponse(res, {
      data: {
        xd: "nose",
      },
      message: "jeje salio bien!",
    });
  } catch (error) {
    next(error);
  }
};
