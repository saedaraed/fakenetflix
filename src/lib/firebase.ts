// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/app';
import 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJA6FMhvaL_KMuob1icKQ4QeQBftbEE94",
  authDomain: "fakenetflix-44e5f.firebaseapp.com",
  projectId: "fakenetflix-44e5f",
  storageBucket: "fakenetflix-44e5f.firebasestorage.app",
  messagingSenderId: "969068912739",
  appId: "1:969068912739:web:fb25063ccd17076b915856",
  measurementId: "G-22Q0XN61QT"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);