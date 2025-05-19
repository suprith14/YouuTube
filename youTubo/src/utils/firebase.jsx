// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8xxi4E341dOtrJd_YDxhst-4iUw5zTAA",
  authDomain: "youtubo-48bc2.firebaseapp.com",
  projectId: "youtubo-48bc2",
  storageBucket: "youtubo-48bc2.firebasestorage.app",
  messagingSenderId: "226606089116",
  appId: "1:226606089116:web:f797efc41fc774a4fdfe59",
  measurementId: "G-29QGHCD5YS",
  // databaseURL: "https://youtubo-48bc2-default-rtdb.asia-southeast1.firebasedatabase.app.firebaseio.com/",
  databaseURL: "https://youtubo-48bc2-default-rtdb.asia-southeast1.firebasedatabase.app"
  // databaseURL: "https://youtubo-48bc2-default-rtdb.firebaseio.com"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const database = getDatabase(app);