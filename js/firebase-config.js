// ============================================
// FIREBASE CONFIG - Replace with YOUR project
// ============================================
// 1. Go to https://console.firebase.google.com
// 2. Create a project (or use existing)
// 3. Add a Web App
// 4. Copy the config object below
// 5. Enable Authentication → Sign-in method → Email/Password + Google

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Admin emails (who can access dashboard)
const ADMIN_EMAILS = [
  "admin@uniqueman.com",
  // Add your own email here after creating account
];

// Check if config is filled
window.FIREBASE_CONFIGURED = !firebaseConfig.apiKey.includes("YOUR_");
window.firebaseConfig = firebaseConfig;
window.ADMIN_EMAILS = ADMIN_EMAILS;
