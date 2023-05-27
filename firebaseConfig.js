// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmkM06LCiUa5r7N6AqfXAXFPZzoESEATA",
  authDomain: "workers-community-cc5de.firebaseapp.com",
  databaseURL: "https://workers-community-cc5de-default-rtdb.firebaseio.com",
  projectId: "workers-community-cc5de",
  storageBucket: "workers-community-cc5de.appspot.com",
  messagingSenderId: "972049925821",
  appId: "1:972049925821:web:ca8ea065ee70dde55999d4",
  measurementId: "G-5TJGD3B4FP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
