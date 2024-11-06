// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAaCvLN4q14b8kzNEbUAfS-WwXZe0gWDr8",
  authDomain: "loop-36ffc.firebaseapp.com",
  projectId: "loop-36ffc",
  storageBucket: "loop-36ffc.firebasestorage.app",
  messagingSenderId: "82828594393",
  appId: "1:82828594393:web:6cbae861879a2bc1aa42c8",
  measurementId: "G-QYSS6WEDH7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
