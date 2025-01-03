import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Configuración de Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Exporta los servicios de Firebase que vas a usar
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const provider = googleProvider;
export { app }; // Exporta la instancia de la app para usarla en otros archivos
