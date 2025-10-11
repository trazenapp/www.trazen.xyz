// firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getMessaging, Messaging } from "firebase/messaging";

// --- Firebase Config ---
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// --- Initialize Firebase App ---
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// --- Initialize Analytics (only on client + supported envs) ---
let analytics: ReturnType<typeof getAnalytics> | null = null;

if (typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
        console.log("✅ Firebase Analytics initialized");
      } else {
        console.log("⚠️ Analytics not supported in this environment");
      }
    })
    .catch((err) => {
      console.warn("⚠️ Analytics initialization skipped:", err);
    });
}

// --- Messaging ---
export const initMessaging = (): Messaging | null => {
  if (typeof window === "undefined") return null;
  try {
    return getMessaging(app);
  } catch (e: any) {
    console.log("⚠️ Firebase Messaging Init Failed:", e);
    return null;
  }
};

export { app, analytics };
