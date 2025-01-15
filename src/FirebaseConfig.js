import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCb8cazagtFJeTeZHji6ofnBynCPj-OY84",
  authDomain: "andinstagramvideos.firebaseapp.com",
  projectId: "andinstagramvideos",
  storageBucket: "andinstagramvideos.firebasestorage.app",
  messagingSenderId: "983569613180",
  appId: "1:983569613180:web:696b4b677cda06787d24f9",
  measurementId: "G-1BZR64P4XG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== "undefined") {
  // Check if analytics is supported in this environment
  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, analytics };