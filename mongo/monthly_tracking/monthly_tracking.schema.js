import { metaSchema } from "../common/index.js";
import mongoose from "mongoose";
import { daySchema } from "./day.schema.js";

const monthlyTrackingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users", //referencia con la coleccion 'users'
    },
    days_tracking: [daySchema],
    meta: { type: metaSchema, default: {} },
  },
  { timestamps: false }
);

// progressSchema.index({ userId: 1, year: 1, month: 1 }, { unique: true });

export const monthlyTrackingMondel = mongoose.model(
  "MonthlyTracking",
  monthlyTrackingSchema,
  "monthly_activity_tracking"
);
