import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVSVUQoJkmzO0bGPhh9HmU3e8yeTQEJfo",
  authDomain: "bynry-internship-assignment.firebaseapp.com",
  projectId: "bynry-internship-assignment",
  storageBucket: "bynry-internship-assignment.firebasestorage.app",
  messagingSenderId: "620304633435",
  appId: "1:620304633435:web:013e9e43cc2f094a36b97e",
  measurementId: "G-YS9P92LHV0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const profileCollection = collection(db, "profiles");

// Export the Firestore db instance
export { db };

export const addProfile = async (profile) => {
  return await addDoc(profileCollection, profile);
};

export const getProfiles = async () => {
  const snapshot = await getDocs(profileCollection);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const updateProfile = async (id, profile) => {
  return await updateDoc(doc(db, "profiles", id), profile);
};

export const deleteProfile = async (id) => {
  return await deleteDoc(doc(db, "profiles", id));
};
