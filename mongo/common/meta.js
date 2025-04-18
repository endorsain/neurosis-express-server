import mongoose from "mongoose";

export const metaSchema = new mongoose.Schema(
  {
    created_at: {
      type: Number,
      default: () => Date.now(),
    },
    updated_at: {
      type: Number,
      default: () => Date.now(),
    },
  },
  { _id: false }
);
