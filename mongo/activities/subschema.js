import mongoose from "mongoose";
import { metaSchema } from "../common/index.js";

const activityMetaSchema = mongoose.Schema(
  {
    is_active: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

export const combinedMetaSchema = mongoose.Schema(
  {
    ...metaSchema.obj,
    ...activityMetaSchema.obj,
  },
  { _id: false }
);
