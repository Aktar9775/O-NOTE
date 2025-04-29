import { auth, googleProvider } from './firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "firebase/auth";

export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const register = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const googleSignIn = () =>
  signInWithPopup(auth, googleProvider);

export const logout = () => signOut(auth);
