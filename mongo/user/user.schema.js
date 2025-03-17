import mongoose from "mongoose";
import {
  // authSchema,
  // profileSchema,
  metaSchema,
  userDataSchema,
} from "./user.subschema.js";
// import { leisureSchema } from "./leisure.schema.js";
//import { progressDataSchema } from "./progress_data.schema.js";

const userSchema = new mongoose.Schema(
  {
    user_data: {
      type: userDataSchema,
      required: true,
    },
    // monthly_activity_tracking: {
    // TODO: Puede ser directamente una id de referencia del documento
    // },
    meta: {
      type: metaSchema,
      default: {},
    },
  },
  { timestamps: false }
);

//midd para actualizar meta.updatedAt al modificar el documento a nivel "raiz"
// userSchema.pre("save", function (next) {
//   this.meta.updated_at = new Date(); //actualiza la fecha en meta.updatedAt
//   next();
// });

// TODO: Para leisure
// userSchema.pre("save", function (next) {
//   const titles = this.leisure.list.map((v) => v.title);
//   const hasDuplicates = titles.length !== new Set(titles).size;

//   if (hasDuplicates) {
//     return next(new Error("The titles must be unique within 'leisure'."));
//   }

//   next();
// });

export const userModel = mongoose.model("User", userSchema, "users");
