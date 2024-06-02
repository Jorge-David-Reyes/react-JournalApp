// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzxeO2QY6VpO6Wpsx0_5OPB_sjy1tyxug",
  authDomain: "react-cursos-885ed.firebaseapp.com",
  projectId: "react-cursos-885ed",
  storageBucket: "react-cursos-885ed.appspot.com",
  messagingSenderId: "842475003473",
  appId: "1:842475003473:web:5fc635ad269b4d92b42270"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );