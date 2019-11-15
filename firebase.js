import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBtI8IoRYEdK2ghcO1s4mJ-t5NTsqr-DII",
  authDomain: "compressed-knowledge.firebaseapp.com",
  databaseURL: "https://compressed-knowledge.firebaseio.com",
  projectId: "compressed-knowledge",
  storageBucket: "compressed-knowledge.appspot.com",
  messagingSenderId: "778042246082",
  appId: "1:778042246082:web:e08957c46db93fc0f6cc5b",
  measurementId: "G-HTX081Y3L5"
};
// Initialize Firebase
export const fb = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore()
export const dbMenuAdd = db.collection('menuItems');
export const dbOrders = db.collection('orderItems');
// export const auth = firebase.auth();