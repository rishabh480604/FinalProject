// src/firebaseConfig.js
import firebase from 'firebase/app';
import {getAuth} from "firebase/auth"; // Import only the Firebase modules you need
import { initializeApp,getApps,getApp } from 'firebase/app';
// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCF243270LrA84cwp5I5bZ_q6hkizEUVEA",
  authDomain: "kpac-e44e1.firebaseapp.com",
  projectId: "kpac-e44e1",
  storageBucket: "kpac-e44e1.appspot.com",
  messagingSenderId: "835593304536",
  appId: "1:835593304536:web:bea9ef3cc7719ae4c89aad"
};


// Initialize Firebase if not already initialized
const app=getApps().length===0? initializeApp(firebaseConfig):getApp();
const auth=getAuth(app);
auth.useDeviceLanguage();
export{auth};