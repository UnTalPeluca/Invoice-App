import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC88IvoTT38c-m_nKYmNtisW4aSTsjr_CI",
  authDomain: "invoice-app-869d4.firebaseapp.com",
  projectId: "invoice-app-869d4",
  storageBucket: "invoice-app-869d4.appspot.com",
  messagingSenderId: "967906228733",
  appId: "1:967906228733:web:f253921059c4464939c194",
  measurementId: "G-4PFBKXYY8K"
};

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp);

export default {
  firebaseApp, db
}
