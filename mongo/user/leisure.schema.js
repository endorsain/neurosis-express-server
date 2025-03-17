import mongoose from "mongoose";

const item = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const meta = new mongoose.Schema(
  {
    total: {
      type: Number,
      default: 0,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

export const leisureSchema = new mongoose.Schema(
  {
    list: {
      type: [item],
      default: [],
    },
    meta: {
      type: meta,
      default: {},
    },
  },
  { _id: false }
);
