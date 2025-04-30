// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "news-763bc.firebaseapp.com",
  projectId: "news-763bc",
  storageBucket: "news-763bc.firebasestorage.app",
  messagingSenderId: "864494371011",
  appId: "1:864494371011:web:91c50c159f017b15386276"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);