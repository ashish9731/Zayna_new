import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// ------------------------------------------------------------------
// REAL WORLD CONFIGURATION
// ------------------------------------------------------------------
const firebaseConfig = {
  apiKey: "AIzaSyBPZRXGn7rSXKPth1W8J2KJUKZj9fgVp-c",
  authDomain: "zayna-5912a.firebaseapp.com",
  projectId: "zayna-5912a",
  storageBucket: "zayna-5912a.firebasestorage.app",
  messagingSenderId: "290479379887",
  appId: "1:290479379887:web:6f4287a60b326532854b5a",
  measurementId: "G-RBCLGYMPHX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Add scopes for Calendar and Contacts if needed
googleProvider.addScope('https://www.googleapis.com/auth/calendar.events.readonly');
googleProvider.addScope('profile');
googleProvider.addScope('email');

export { auth, googleProvider };