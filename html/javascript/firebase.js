// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbpPuvyJOB0-mkiea_VHg1Sj389jf7KtU",
  authDomain: "gcloud-vm-project.firebaseapp.com",
  projectId: "gcloud-vm-project",
  storageBucket: "gcloud-vm-project.appspot.com",
  messagingSenderId: "195848646059",
  appId: "1:195848646059:web:14b7c0d48db9b19015b6ee",
  measurementId: "G-PWMLFLH7YP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
