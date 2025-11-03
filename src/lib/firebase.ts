import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported as analyticsSupported } from "firebase/analytics";
import { getMessaging, Messaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// ✅ only initialize analytics in the browser and if supported
let analytics: ReturnType<typeof getAnalytics> | null = null;

if (typeof window !== "undefined") {
  analyticsSupported().then((supported) => {
    if (supported) analytics = getAnalytics(app);
  });
}

// ✅ messaging only in the browser too
export const initMessaging = (): Messaging | null => {
  if (typeof window === "undefined") return null;
  try {
    return getMessaging(app);
  } catch (e: any) {
    console.log("Firebase Messaging Init Failed:", e);
    return null;
  }
};

export { app, analytics };
