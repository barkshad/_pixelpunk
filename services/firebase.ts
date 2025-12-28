import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyByh45OPUTcTpB3vB5jtzBGCZI5TJnPdns",
  authDomain: "pixelpunk-107b3.firebaseapp.com",
  projectId: "pixelpunk-107b3",
  storageBucket: "pixelpunk-107b3.firebasestorage.app",
  messagingSenderId: "597740040388",
  appId: "1:597740040388:web:8dd460be2ab15dd51f5991",
  measurementId: "G-74D7RW48LY"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Safe analytics initialization
export let analytics = null;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});
