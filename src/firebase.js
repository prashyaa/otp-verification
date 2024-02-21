import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD0fv2TowuETirBTxiFWBvsmyq-ExKY7c8",
  authDomain: "otpgeneration-dea78.firebaseapp.com",
  projectId: "otpgeneration-dea78",
  storageBucket: "otpgeneration-dea78.appspot.com",
  messagingSenderId: "438079247519",
  appId: "1:438079247519:web:2fa2a198bd3ec6f80b7eaa",
  measurementId: "G-ZDRLZ6SB4D"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);