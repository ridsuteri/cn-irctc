// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBp2sTfh5A3BELLYsV8VQsLj3CWa3yQoH8",
  authDomain: "cn-irctc-9d30f.firebaseapp.com",
  projectId: "cn-irctc-9d30f",
  storageBucket: "cn-irctc-9d30f.firebasestorage.app",
  messagingSenderId: "555246537564",
  appId: "1:555246537564:web:552ecf359588e06bb8cf99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);
const auth = getAuth(app);

export {app, googleProvider, auth, db};