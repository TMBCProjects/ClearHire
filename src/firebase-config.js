import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyDWFo7xm8ZXpXv26a6E6mhFbkZbuCsn88U",
  authDomain: "clearhire-d91d9.firebaseapp.com",
  projectId: "clearhire-d91d9",
  storageBucket: "clearhire-d91d9.appspot.com",
  messagingSenderId: "910930623340",
  appId: "1:910930623340:web:dafb7a0576afd676831149",
  measurementId: "G-SXTHF0BGQ6",
};

export const fire = initializeApp(firebaseConfig);
export const auth = getAuth(fire);
export const firestoreDB = getFirestore(fire);
export const storageRef = getStorage(fire);
// export const provider = new GoogleAuthProvider();
