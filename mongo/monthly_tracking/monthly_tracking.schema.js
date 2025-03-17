import { metaSchema } from "./meta.schema.js";
//import { activitySchema } from "./activity.schema.js";
import mongoose from "mongoose";

const monthlyTrackingSchema = new mongoose.Schema(
  {
    // En un futuro en vez de 'userId' va a tener 'userInfo' con mas informacion.
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users", //referencia con la coleccion 'users'
    },
    // progress_tracking: {
    //   type: [activitySchema],
    //   default: [],
    // },
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
