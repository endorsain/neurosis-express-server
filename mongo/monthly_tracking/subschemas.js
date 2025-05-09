import mongoose from "mongoose";
import { metaSchema } from "../common/index.js";

const monthlyMetaSchema = new mongoose.Schema(
  {
    //algo
  },
  {
    _id: false,
  }
);

export const combinedMetaSchema = new mongoose.Schema(
  {
    ...metaSchema.obj,
    ...monthlyMetaSchema.obj,
  },
  {
    _id: false,
  }
);
