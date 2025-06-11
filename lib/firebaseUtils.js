import { signInWithPopup, signInWithRedirect, getRedirectResult, setPersistence, inMemoryPersistence } from "firebase/auth";
import { doc, getDoc, collection, query, where, limit, getDocs } from "firebase/firestore";
import { auth, googleProvider, db } from "@/firebaseConfig";

export const authenticateWithGoogle = async () => {
  try {
    await setPersistence(auth, inMemoryPersistence);
    if (isMobileDevice()) {
      await signInWithRedirect(auth, googleProvider);
      const result = await getRedirectResult(auth);
      if (result) {
        localStorage.setItem("user", JSON.stringify(result.user));
        return result.user;
      }
      return null;
    } else {
      const result = await signInWithPopup(auth, googleProvider);
      localStorage.setItem("user", JSON.stringify(result.user));
      return result.user;
    }
  } catch (error) {
    console.error("Error autenticando usuario: ", error);
    throw error;
  }
};

// Función para detectar si el dispositivo es móvil
const isMobileDevice = () => {
  return typeof window !== "undefined" && /Mobi|Android/i.test(window.navigator.userAgent);
};

// export async function verifyUserInCollection(uid, collectionName) {
//   const userDocRef = doc(db, collectionName, uid);
//   const userDoc = await getDoc(userDocRef);
//   return userDoc.exists();
// }

/**
 * Verifica si un usuario es administrador buscando su UID en la colección 'usuarios'
 * y comprobando si su tipoUsuario es 'administrador'.
 * @param {string} uid El UID del usuario de Firebase Authentication.
 * @returns {Promise<object|null>} Los datos del usuario si es administrador, o null si no lo es o hay un error.
 */
export async function getUserDataIfAdmin(uid) {
  if (!uid) {
    console.log("getUserDataIfAdmin: UID no proporcionado.");
    return null;
  }
  try {
    const usuariosRef = collection(db, "usuarios");
    // Buscar documentos donde el campo 'uid' sea igual al UID proporcionado
    const q = query(usuariosRef, where("uid", "==", uid), limit(1));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      if (userData.tipoUsuario === "administrador") {
        console.log("Usuario verificado como administrador:", userData);
        return userData; // Devuelve todos los datos del usuario administrador
      }
      console.log("Usuario encontrado, pero no es administrador. Tipo:", userData.tipoUsuario);
      return null;
    }
    console.log("Usuario no encontrado en la colección 'usuarios' con el UID proporcionado.");
    return null;
  } catch (error) {
    console.error("Error al verificar el usuario como administrador:", error);
    return null;
  }
}

/**
 * Obtiene los datos de un usuario desde la colección 'usuarios' usando su CI como ID del documento.
 * @param {string} ci El CI del usuario.
 * @returns {Promise<object|null>} Los datos del usuario si existe, o null si no existe o hay un error.
 */
export async function getUserDataByCI(ci) {
  if (!ci) {
    console.log("getUserDataByCI: CI no proporcionado.");
    return null;
  }
  try {
    const userDocRef = doc(db, "usuarios", ci);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      console.log("Usuario encontrado:", userDocSnap.data());
      return userDocSnap.data();
    } else {
      console.log("No se encontró ningún usuario con el CI proporcionado:", ci);
      return null;
    }
  } catch (error) {
    console.error("Error al obtener los datos del usuario por CI:", error);
    return null;
  }
}