import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGqLxFQ6JmfTylwCSFU_-7oX9CjwxvxBI",
  authDomain: "gravatar-user-profiles.firebaseapp.com",
  projectId: "gravatar-user-profiles",
  storageBucket: "gravatar-user-profiles.firebasestorage.app",
  messagingSenderId: "244535976144",
  appId: "1:244535976144:web:4de1d8c8077cf89e00bed5"
};


const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { db };
