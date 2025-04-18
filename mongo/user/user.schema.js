import mongoose from "mongoose";
import { metaSchema, userDataSchema } from "./subschema.js";

const userSchema = new mongoose.Schema(
  {
    user_data: {
      type: userDataSchema,
      required: true,
    },
    meta: {
      type: metaSchema,
      default: {},
    },
  },
  { timestamps: false }
);

// midd para actualizar meta.updatedAt al modificar el documento a nivel "raiz"
userSchema.pre("save", function (next) {
  this.meta.updated_at = new Date(); //actualiza la fecha en meta.updatedAt
  next();
});

export const userModel = mongoose.model("User", userSchema, "users");
