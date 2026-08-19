# Firebase Auth Setup (Uniqueman)

Follow these steps to enable **real Google Sign-In** and secure email/password.

## 1. Create Firebase project

1. Open https://console.firebase.google.com
2. Click **Add project** → name it e.g. `uniqueman-store`
3. Disable Google Analytics if you want (optional)
4. Create project

## 2. Register a Web App

1. On Project Overview → click the **Web** icon (`</>`)
2. App nickname: `Uniqueman Website`
3. Copy the `firebaseConfig` object that appears

## 3. Enable Sign-in methods

1. Left menu → **Build** → **Authentication**
2. Click **Get started**
3. Enable:
   - **Email/Password** → Enable → Save
   - **Google** → Enable → set support email → Save

## 4. Add authorized domain (for Netlify)

1. Authentication → **Settings** → **Authorized domains**
2. Add your Netlify domain, e.g. `ar.netlify.app`
3. Also add `localhost` if testing locally

## 5. Paste config into the website

Open file: `js/firebase-config.js`

Replace the placeholder with your real config:

```js
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "uniqueman-store.firebaseapp.com",
  projectId: "uniqueman-store",
  storageBucket: "uniqueman-store.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc..."
};
```

Also add your personal email to `ADMIN_EMAILS` so you get admin access:

```js
const ADMIN_EMAILS = [
  "admin@uniqueman.com",
  "your-gmail@gmail.com"
];
```

## 6. Deploy

Push to GitHub → Netlify will redeploy automatically.

After that, "Continue with Google" will open the real Google popup.

## Admin access

Anyone whose email is listed in `ADMIN_EMAILS` can open the Admin dashboard after login.
