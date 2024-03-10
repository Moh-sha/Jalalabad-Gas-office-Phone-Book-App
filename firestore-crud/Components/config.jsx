// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWb720u6XZSq_UE7syzd3zTBKDaLd31ws",
  authDomain: "phonebook-dffeb.firebaseapp.com",
  projectId: "phonebook-dffeb",
  storageBucket: "phonebook-dffeb.appspot.com",
  messagingSenderId: "387183701306",
  appId: "1:387183701306:web:d4696b4161bd0f33cdb403"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);