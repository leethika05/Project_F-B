import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";  // ✅ Import Firestore

const firebaseConfig = {
  apiKey: "AIzaSyCCTB0muXBFQqZwCLI0oEgOdvEekPQZKdA",
  authDomain: "cycle-booking-3d7f6.firebaseapp.com",
  projectId: "cycle-booking-3d7f6",
  storageBucket: "cycle-booking-3d7f6.appspot.com",
  messagingSenderId: "470600512653",
  appId: "1:470600512653:web:07679d44b5247b97b41ec4",
  measurementId: "G-H89QQHTEWL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);  // ✅ Initialize Firestore

export { auth, db };  // ✅ Export Firestore
