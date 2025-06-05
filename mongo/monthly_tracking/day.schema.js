import mongoose from "mongoose";

// const timeSchema = new mongoose.Schema(
//   {
//     start: {
//       type: Number,
//       required: true,
//     },
//     end: {
//       type: Number,
//       required: true,
//     },

//   },
//   { _id: false }
// );
const timeLapseSchema = new mongoose.Schema(
  {
    focus: {
      type: Boolean,
      required: true,
    },
    start_time: {
      type: Number,
      required: true,
    },
    end_time: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

// esquema de seguimiento de una actividad.
const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    time_lapse_tracking: [timeLapseSchema],
    start_time: {
      type: Number,
      required: true,
    },
    end_time: {
      type: Number,
      required: true,
    },
    total_time: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

export const daySchema = new mongoose.Schema(
  {
    day: {
      type: Number,
      required: true,
    },
    activities_tracking: [activitySchema],
    // Eliminar start_time y end_time, no tienen sentido
    // start_time: {
    //   type: Number,
    //   required: true,
    // },
    // end_time: {
    //   type: Number,
    //   required: true,
    // },
    // total_time representa el tiempo total de concentracion
    // que acumula todas las actividades.
    // Podria poner total_focus_time y total_break_time.
    // Se entiende que es el total de todas las actividades
    focus_time: {
      type: Number,
      required: true,
    },
    break_time: {
      type: Number,
      required: true,
    },
    total_time: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);
