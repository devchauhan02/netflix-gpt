// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCF8YDykH3gznLSzEOo4B5MpOIvu3NOtI8",
  authDomain: "netflixgpt-1638e.firebaseapp.com",
  projectId: "netflixgpt-1638e",
  storageBucket: "netflixgpt-1638e.firebasestorage.app",
  messagingSenderId: "303087394382",
  appId: "1:303087394382:web:c37da1a3b14ca5542eed1f",
  measurementId: "G-Z0964YX4KD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();