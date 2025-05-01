// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBk1J9_2ee-z165skwIFlJM7YafhdzeZ-o",
  authDomain: "netflixgpt-3d867.firebaseapp.com",
  projectId: "netflixgpt-3d867",
  storageBucket: "netflixgpt-3d867.firebasestorage.app",
  messagingSenderId: "1045504051067",
  appId: "1:1045504051067:web:60cf624bbbe3b5beb49fde",
  measurementId: "G-MBDTW0DT57",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
