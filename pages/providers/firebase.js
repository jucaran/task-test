import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCa1XBHyTBE3bonpdoWaj59qlrwOc9dVos",
  authDomain: "task-test-api.firebaseapp.com",
  projectId: "task-test-api",
  storageBucket: "task-test-api.appspot.com",
  messagingSenderId: "724153991861",
  appId: "1:724153991861:web:9a3c37806555b1e55eb4fc",
};

export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const auth = firebase.auth();
