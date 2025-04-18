import { metaSchema } from "../common/index.js";
import mongoose from "mongoose";

const monthlyTrackingSchema = new mongoose.Schema(
  {
    // En un futuro en vez de 'userId' va a tener 'userInfo' con mas informacion.
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users", //referencia con la coleccion 'users'
    },
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
