import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ========================================================================================
// SECURE CONFIGURATION INSTRUCTIONS
// ========================================================================================
// Your Firebase configuration is now loaded securely from environment variables.
// To make this work, you must:
//
// 1. Create a new file named `.env` in the root of your project directory.
// 2. Copy the contents of the `.env.example` file into your new `.env` file.
// 3. Replace the placeholder values in `.env` with your actual Firebase project
//    credentials.
//
// The `.gitignore` file is already configured to prevent your `.env` file
// (which contains your secrets) from ever being checked into version control.
// ========================================================================================
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// ========================================================================================
// CRITICAL ACTION REQUIRED: UPDATE FIRESTORE SECURITY RULES
// ========================================================================================
// If you haven't already, update your Firestore security rules to allow the app
// to count waitlist entries while keeping emails private.
//
// To fix this, go to your Firebase project's Firestore Database section, click on the
// "Rules" tab, and replace the existing rules with the following code:
//
// rules_version = '2';
// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /waitlist/{docId} {
//       // Allow anyone to submit their email to the waitlist.
//       allow create: if true;

//       // IMPORTANT: Deny reading, updating, or deleting individual emails.
//       // This protects your users' privacy.
//       allow read, update, delete: if false;
//     }

//     match /waitlist {
//       // IMPORTANT: Allow the app to get the total count of people on the waitlist.
//       // The 'list' permission is required for count queries to work, but this
//       // rule does not allow reading the actual email data.
//       allow list: if true;
//     }
//   }
// }
// ========================================================================================

export { db };
