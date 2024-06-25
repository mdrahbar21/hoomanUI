import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} from "firebase-admin/firestore";

const serviceAccount = require("../../hooman-labs-production-1a943c82bc2f.json");

if (!global._firebaseClientInitialized) {
  initializeApp({
    credential: cert(serviceAccount),
  });
  global._firebaseClientInitialized = true;
}

const db = getFirestore();

export default db;
