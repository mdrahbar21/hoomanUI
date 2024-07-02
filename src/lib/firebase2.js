import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore, Timestamp, FieldValue } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const serviceAccount = require("../../hooman-a960d-firebase-adminsdk-fqray-a20bbf6370.json");

if (!global._firebaseClientInitialized) {
  initializeApp({
    credential: cert(serviceAccount),
    storageBucket: "hooman-a960d.appspot.com", // Replace with your Firebase project ID
  });
  global._firebaseClientInitialized = true;
}

const db = getFirestore();
const bucket = getStorage().bucket();

export { db, bucket };
