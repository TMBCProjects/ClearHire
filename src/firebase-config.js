import * as firebase from "@firebase/app";
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

export const fire = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(fire);
export const firestoreDB = getFirestore(fire);
export const storageRef = getStorage(fire);
// gcloud storage buckets update gs://clearhire-d91d9.appspot.com --cors-file=D:\Projects\ClearHire-1\cors.json

// apiKey: "AIzaSyAgZcM2BiyWl2BWNyBJUYOSRlCDpfRz25g",
// authDomain: "clearhire-28c23.firebaseapp.com",
// projectId: "clearhire-28c23",
// storageBucket: "clearhire-28c23.appspot.com",
// messagingSenderId: "216245484813",
// appId: "1:216245484813:web:58640d1e1f08caa47d4444",
// measurementId: "G-V6HRL0Y7D7",
