import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// copy your app config from the firebase
const firebaseConfig = {

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
