import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

import 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDqHc-Qs_1z7YNnEgMs0ooEokg_eCm5wP4",
  authDomain: "arcoiris-fab1d.firebaseapp.com",
  projectId: "arcoiris-fab1d",
  storageBucket: "arcoiris-fab1d.appspot.com",
  messagingSenderId: "803833114428",
  appId: "1:803833114428:web:5e2b87ece6d8080851b839"
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db, firebaseConfig }; // Agregar exportación de firebaseConfig