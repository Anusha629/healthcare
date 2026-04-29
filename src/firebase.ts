import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const isDemoMode = Object.values(firebaseConfig).some(
  (value) => typeof value === "string" && value.startsWith("YOUR_"),
);

const demoUser = {
  uid: "demo-uid",
  email: "care.manager@example.com",
  displayName: "Care Manager",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export const loginWithEmail = async (email: string, password: string) => {
  if (isDemoMode) {
    if (email === demoUser.email && password === "password123") {
      localStorage.setItem("hc_demo_user", JSON.stringify(demoUser));
      return Promise.resolve({ user: demoUser } as unknown as { user: User });
    }
    return Promise.reject(new Error("Invalid demo credentials"));
  }
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async () => {
  if (isDemoMode) {
    localStorage.removeItem("hc_demo_user");
    return Promise.resolve();
  }
  return signOut(auth);
};

export const observeAuthState = (callback: (user: User | null) => void) => {
  if (isDemoMode) {
    const storedUser = localStorage.getItem("hc_demo_user");
    const user = storedUser ? (JSON.parse(storedUser) as User) : null;
    callback(user);
    return () => undefined;
  }
  return onAuthStateChanged(auth, callback);
};
