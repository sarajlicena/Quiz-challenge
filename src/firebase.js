// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNDqb2JY2cfPbMPO3oE96sqVh7dnWII2A",
  authDomain: "zavrsni---kviz.firebaseapp.com",
  databaseURL: "https://zavrsni---kviz-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "zavrsni---kviz",
  storageBucket: "zavrsni---kviz.appspot.com",
  messagingSenderId: "358068575289",
  appId: "1:358068575289:web:5735c0ec5e79e0c023c1e8",
  measurementId: "G-XFXV5RSJHX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);