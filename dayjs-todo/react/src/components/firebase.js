// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfz9slnVw31fVhAYQugMYWXSvru3CmdA8",
  authDomain: "react-diary-f935f.firebaseapp.com",
  projectId: "react-diary-f935f",
  storageBucket: "react-diary-f935f.appspot.com",
  messagingSenderId: "395834954942",
  appId: "1:395834954942:web:d30eb1de1fe35b36337aef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export default app;