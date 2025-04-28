// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuhWVPRFZTjeusq__hFDwkmwnllDNUEog",
  authDomain: "movie-booking-866a6.firebaseapp.com",
  databaseURL: "https://movie-booking-866a6-default-rtdb.firebaseio.com",
  projectId: "movie-booking-866a6",
  storageBucket: "movie-booking-866a6.firebasestorage.app",
  messagingSenderId: "282561028561",
  appId: "1:282561028561:web:cfa6860ecde7f9bff340f0",
  measurementId: "G-JX00W7FBD5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export auth
export const auth = getAuth(app);
