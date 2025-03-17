import dotenv from "dotenv";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import admin from "firebase-admin";

dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
/* const serviceAccount = require('../permissions.json') */

initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = getFirestore();
const auth = getAuth();

export { db, auth };
