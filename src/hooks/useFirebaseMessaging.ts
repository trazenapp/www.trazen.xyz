"use client";
import { useEffect } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { initMessaging } from "@/src/lib/firebase";
import { useAppDispatch } from "@/src/redux/store";
import { setFcmToken, addMessage } from "@/src/redux/slices/fcmNotificationSlice";

export const useFirebaseMessaging = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const requestFcmToken = async () => {
      try {
        const messaging = initMessaging();
        if (!messaging) return;

        // Register service worker explicitly
        const swReg = await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js"
        );

        // Wait until it's ready
        await navigator.serviceWorker.ready;

        // Ask for notification permission
        const permission = await Notification.requestPermission();
        if (permission !== "granted") {
          console.warn("Notification permission not granted");
          return;
        }

        // Get FCM token with the registered SW
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
          serviceWorkerRegistration: swReg, // ✅ fixes pushManager undefined
        });

        if (token) {
          dispatch(setFcmToken(token));
          if (typeof window !== "undefined") {
            localStorage.setItem("fcmToken", token);
          }
        } else {
          console.warn("No FCM token received");
        }

        // Foreground messages
        onMessage(messaging, (payload) => {
          console.log("Message received:", payload);
          dispatch(addMessage(payload));
        });
      } catch (error) {
        console.error("Error setting up FCM:", error);
      }
    };

    requestFcmToken();
  }, [dispatch]);
};
