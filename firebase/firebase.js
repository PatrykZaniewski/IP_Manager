import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAbqLY9FUJKE3Louk0hhnFprH1aPj6v6xw",
  authDomain: "ipmanager-98657.firebaseapp.com",
  databaseURL: "https://ipmanager-98657.firebaseio.com",
  projectId: "ipmanager-98657",
  storageBucket: "ipmanager-98657.appspot.com",
  messagingSenderId: "538146732426",
  appId: "1:538146732426:web:8e4647b6d9f713e1ba3073",
  measurementId: "G-32YKW0S4QR"
};

export const myFirebase = firebase.initializeApp(config);
const baseDB = myFirebase.firestore();
export const db = baseDB;