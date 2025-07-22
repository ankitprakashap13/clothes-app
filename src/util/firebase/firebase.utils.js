import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithRedirect
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

initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      const data = {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      }
      await setDoc(userDocRef, data);
    } catch(error) {
      console.log("error creating user", error.message);
    }
  }

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUser = async (email, password) => {
  if(!email || !password) return;
  const authUser = await signInWithEmailAndPassword(auth, email, password);
  return authUser;
}

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
