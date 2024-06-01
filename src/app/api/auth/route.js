import { getAuth } from "firebase-admin/auth";
import { initializeApp, cert } from "firebase-admin/app";
import serviceAccount from "../../../../../hooman-a960d-firebase-adminsdk-fqray-1b124e9e1f.json";

if (!getAuth().apps.length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

export default async function handler(req, res) {
  const { token } = req.body;

  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    const uid = decodedToken.uid;
    res.status(200).json({ uid });
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
}
