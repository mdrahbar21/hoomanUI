// import { initializeApp } from "firebase/app";
// import {
//   getAuth,
//   GoogleAuthProvider,
//   signInWithPopup,
//   signOut,
// } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { useRouter } from "next/router";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: "G-VWGJ9QD4XN",
// };

// // Ensure that Firebase client isn't initialized multiple times
// if (!global._firebaseClientInitialized) {
//   initializeApp(firebaseConfig);
//   global._firebaseClientInitialized = true;
// }

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);

// const provider = new GoogleAuthProvider();

// const signInWithGoogle = async () => {
//   try {
//     const result = await signInWithPopup(auth, provider);
//     console.log("User signed in:", result.user);
//     // Additional user sign-in handling logic here
//   } catch (error) {
//     console.error("Error signing in with Google: ", error);
//   }
// };

// const logout = async () => {
//   const router = useRouter();
//   try {
//     await signOut(auth);
//     console.log("User signed out successfully");
//     router.push("/login");
//   } catch (error) {
//     console.error("Error signing out: ", error);
//   }
// };

// export { auth, db, storage, signInWithGoogle, logout };
