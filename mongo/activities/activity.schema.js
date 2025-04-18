import mongoose from "mongoose";
import { weeklySchema } from "./weekly.schema.js";
import { combinedMetaSchema } from "./subschema.js";
// import { metaSchema } from "../common/index.js";

const activitySchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    title: {
      type: String,
      required: true,
    },
    weekly_programming: {
      type: weeklySchema,
      required: false,
      default: {},
    },
    meta: {
      type: combinedMetaSchema,
      default: {},
    },
  },
  { timestamps: false }
);

activitySchema.index({ user_id: 1, title: 1 }, { unique: true });

activitySchema.pre("save", function (next) {
  this.meta.updated_at = new Date(); //actualiza la fecha en meta.updatedAt
  next();
});

export const activityModel = mongoose.model(
  "Activity",
  activitySchema,
  "activities"
);
