import mongoose from "mongoose";

const timeLapse = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: null,
    },
    total: {
      type: Number,
      default: null,
    },
  },
  { _id: false }
);

const meta = new mongoose.Schema(
  {
    manualAdjustment: {
      type: Boolean,
      default: false,
    },
    adjustmentAt: {
      type: Date,
      default: null,
    },
  },
  { _id: false }
);

export const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    time_lapses: {
      type: [timeLapse],
      default: [],
    },
    // meta: {
    //   type: meta,
    //   default: {},
    // },
  },
  { _id: false }
);
