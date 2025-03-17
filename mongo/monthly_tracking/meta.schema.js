import mongoose from "mongoose";

export const metaSchema = new mongoose.Schema(
  {
    created_at: {
      type: Date,
      default: () => Date.now(),
    },
    updated_at: {
      type: Date,
      default: () => Date.now(),
    },
  },
  { _id: false }
);
