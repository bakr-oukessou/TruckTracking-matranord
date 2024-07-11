// firebaseConfig.ts
import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAb1AVKF8fwMR803wmRCfNjauSxVNpvZFw",
    authDomain: "trucktracking-fa6fc.firebaseapp.com",
    databaseURL: "https://trucktracking-fa6fc-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "trucktracking-fa6fc",
    storageBucket: "trucktracking-fa6fc.appspot.com",
    messagingSenderId: "769760275952",
    appId: "1:769760275952:web:be53c071caa4a778204135",
    measurementId: "G-GTVVK807BJ"
  };

// Initialize Firebase  
if (!firebase.getApps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
