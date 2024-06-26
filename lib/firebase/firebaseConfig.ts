import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// copy your app config from the firebase
const firebaseConfig = {
  apiKey: "AIzaSyBvLhqGITh9x6Ex0xSoILSR23WB46BrsvM",
  authDomain: "temp-f2858.firebaseapp.com",
  projectId: "temp-f2858",
  storageBucket: "temp-f2858.appspot.com",
  messagingSenderId: "480587411387",
  appId: "1:480587411387:web:719e55532d59fa9dc29e9e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
