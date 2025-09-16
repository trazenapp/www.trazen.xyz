import { getMessaging, getToken } from 'firebase/messaging';

const messaging = getMessaging();
getToken(messaging, {vapidKey: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_VAPID_KEY})
  .then((currentToken) => {
    if(currentToken) {

    } else {

    }
  }).catch((error) => {
    console.log("Error getting token:", error);
  })