// const firebase = require('firebase');
const { initializeApp } = require("firebase/app");
const { getFirestore, collection } = require("firebase/firestore");

const firebaseConfig = {
    apiKey: "AIzaSyCaddvDPaUb_I5Pcs3c4Xo_7gYWK1fN4Xk",
    authDomain: "my-project-8492e.firebaseapp.com",
    projectId: "my-project-8492e",
    storageBucket: "my-project-8492e.appspot.com",
    messagingSenderId: "661307936648",
    appId: "1:661307936648:web:31d7befd6efa2e180f743d",
    measurementId: "G-Y3Y10DYMZD"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const User = collection(db, "Users");

module.exports = User;