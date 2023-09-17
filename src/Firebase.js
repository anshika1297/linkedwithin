// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCaNj7oDAl6lRgY64dGn8VkZUqcyvY8Rhc",
  authDomain: "linkwithin-c6e09.firebaseapp.com",
  projectId: "linkwithin-c6e09",
  storageBucket: "linkwithin-c6e09.appspot.com",
  messagingSenderId: "1036756134804",
  appId: "1:1036756134804:web:b08c0a430da6b16b3e7d81",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);

export { auth, provider, storage };
export default db;
