import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const requiredConfigKeys = ['apiKey', 'authDomain', 'projectId', 'appId'];
export const isFirebaseConfigured = requiredConfigKeys.every((key) => Boolean(firebaseConfig[key]));

let app = null;
let auth = null;

if (isFirebaseConfigured) {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} else {
  console.warn('Firebase is not configured. Auth, Firestore sync, and Analytics are disabled.');
}

export async function trackEvent(name, params = {}) {
  if (!app || !firebaseConfig.measurementId) return;

  const { getAnalytics, isSupported, logEvent } = await import('firebase/analytics');
  const supported = await isSupported().catch(() => false);
  if (!supported) return;

  logEvent(getAnalytics(app), name, params);
}

export { app, auth };
