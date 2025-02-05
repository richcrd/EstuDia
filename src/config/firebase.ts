import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4rpT4ODDkrHLoaBROGRZ5QkSC78qrUGM",
  authDomain: "estudia-961e1.firebaseapp.com",
  projectId: "estudia-961e1",
  storageBucket: "estudia-961e1.firebasestorage.app",
  messagingSenderId: "691793679922",
  appId: "1:691793679922:web:a175b8b9d08813397b8e2b",
  measurementId: "G-PTNC0XWN46"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);