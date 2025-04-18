import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    firebase_id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
  },
  { _id: false }
);

const profileSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

export const userDataSchema = new mongoose.Schema(
  {
    firebase_auth: {
      type: authSchema,
      required: true,
    },
    profile: {
      type: profileSchema,
      required: true,
    },
  },
  { _id: false }
);

export const metaSchema = new mongoose.Schema(
  {
    last_login: {
      type: Number,
      default: null,
    },
    created_at: {
      type: Number,
      default: () => Date.now(),
    },
    updated_at: {
      type: Number,
      default: () => Date.now(),
    },
  },
  { _id: false }
);
