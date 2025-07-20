import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  createUserWithEmailAndPassword
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA4s6Gsz_LcY3Ea81_rFJ_iNDIobyrFi00",
  authDomain: "clothing-4d98e.firebaseapp.com",
  projectId: "clothing-4d98e",
  storageBucket: "clothing-4d98e.firebasestorage.app",
  messagingSenderId: "798711717682",
  appId: "1:798711717682:web:5a317fe252c2e15104c12b"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch(error) {
      console.log("error creating user", error.message);
    }
  }
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (email && password) {
    return await createUserWithEmailAndPassword(auth, email, password);
  }
};
