import { signInWithPopup } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, provider, firestore } from "@/firebaseConfig";

// Función para autenticar usuario con Google
export const authenticateWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error autenticando usuario: ", error);
    throw error;
  }
};

// Función para verificar usuario en la colección usuariosAutorizados
export const verifyUserInCollection = async (user) => {
  try {
    const listaDoc = doc(firestore, "usuariosAutorizados", "lista");
    const listaSnap = await getDoc(listaDoc);

    if (listaSnap.exists()) {
      const listaData = listaSnap.data();
      if (Array.isArray(listaData.uid) && listaData.uid.includes(user.uid)) {
        console.log("Usuario autorizado: ", user.uid);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Error verificando usuario: ", error);
    return false;
  }
};