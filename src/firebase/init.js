import firebase from "firebase";
import firestore from "firebase/firestore";

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCHMkGJKaYDyN8Qkb088BjNzodQrevkJq4",
  authDomain: "geo-book.firebaseapp.com",
  databaseURL: "https://geo-book.firebaseio.com",
  projectId: "geo-book",
  storageBucket: "",
  messagingSenderId: "516498476870"
};

const firebaseApp = firebase.initializeApp(config);

export default firebaseApp.firestore();
