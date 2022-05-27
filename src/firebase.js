import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  setDoc,
  doc,
  query,
  where,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { FIREBASE_API_KEY, FIREBASE_APP_ID } from "./api";

const firebaseConfig = {
  //apiKey: import.meta.VITE_FIREBASE_KEY ---> NOT working!
  apiKey: FIREBASE_API_KEY,
  authDomain: "anny-kaktus.firebaseapp.com",
  projectId: "anny-kaktus",
  storageBucket: "anny-kaktus.appspot.com",
  messagingSenderId: "471743892676",
  appId: FIREBASE_APP_ID,
  //appId: import.meta.VITE_FIREBASE_APP_ID ---> NOT working!
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const productos = collection(db, "productos");
export const usuarios = collection(db, "usuarios");
export const carrito = collection(db, "carrito");
export const auth = getAuth();
export const storage = getStorage(app);

export async function saveDoc(collectionName, documentName, data) {
  await setDoc(doc(db, collectionName, documentName), data, { merge: true });
}

export const getCartContent = async () => {
  const userEmail = localStorage.getItem("userEmail");
  // const q = await carrito.where("email", "==", userEmail).get();
  const q = query(carrito, where("buyer", "==", userEmail));
  const cartContent = await getDocs(q);

  let flag = false;

  cartContent.forEach((doc) => {
    if (doc.data()) {
      flag = true;
    }
  });

  return flag;
};
