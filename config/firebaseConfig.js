// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
i
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2dWW_LJmYnmoP1CmjjILjhYjE1wBc5MQ",
  authDomain: "loopdox.firebaseapp.com",
  projectId: "loopdox",
  storageBucket: "loopdox.firebasestorage.app",
  messagingSenderId: "924159345533",
  appId: "1:924159345533:web:ab31e0a6dfc2f4a373c214",
  measurementId: "G-TMP7073YEE"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
