importScripts("https://www.gstatic.com/firebasejs/10.12.4/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.4/firebase-messaging-compat.js");
// import { getMessaging, getToken } from 'firebase/messaging';

firebase.initializeApp({
  apiKey: "AIzaSyCvK937_KFCrkiuQWVOXjGAX_YoIDHepGw",
  authDomain: "trazen-app.firebaseapp.com",
  projectId: "trazen-app",
  storageBucket: "trazen-app.firebasestorage.app",
  messagingSenderId: "91934197617",
  appId: "1:91934197617:web:5bad269edd9738252458d0",
  measurementId: "G-33X3R48S84",
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log("Background message received:", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
})