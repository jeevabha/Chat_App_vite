// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyC4nQSsOEdNgBlituqCgST5DlL6lz2LHJw",
  authDomain: "chat-app-2b6d0.firebaseapp.com",
  projectId: "chat-app-2b6d0",
  storageBucket: "chat-app-2b6d0.appspot.com",
  messagingSenderId: "385335877508",
  appId: "1:385335877508:web:de4f3a797a65aefc3407d1",
  measurementId: "G-DM6Z0F6KKN"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)