// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Importing missing firestore methods

// Your web app's Firebase configuration
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
export const db = getFirestore(app); // Getting the Firestore instance

// Exporting the firestore methods
export { collection, addDoc };
