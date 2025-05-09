import mongoose from "mongoose";
import { metaSchema } from "../common/index.js";

const activityMetaSchema = new mongoose.Schema(
  {
    is_active: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

export const combinedMetaSchema = new mongoose.Schema(
  {
    ...metaSchema.obj,
    ...activityMetaSchema.obj,
  },
  { _id: false }
);
