import mongoose from "mongoose";

const timeRange = mongoose.Schema(
  {
    start_day: {
      type: Number,
      required: false,
    },
    start_time: {
      type: Number,
      required: false,
    },
    end_day: {
      type: Number,
      required: false,
    },
    end_time: {
      type: Number,
      required: false,
    },
  },
  { _id: false }
);

export const weeklySchema = mongoose.Schema(
  {
    deadline: {
      type: Number,
      required: false,
      default: null,
    },
    week: [timeRange],
  },
  { _id: false }
);
