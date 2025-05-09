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
