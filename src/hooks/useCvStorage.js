import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { storage, db } from "../lib/firebase";

const CV_PATH = "cv/Mohamed_Esam_CV.pdf";

function getStorageErrorMessage(error) {
  if (error?.code === "storage/unauthorized") {
    return "You do not have permission to upload this file. Confirm the signed-in user UID is in storage.rules.";
  }

  if (error?.code === "storage/bucket-not-found" || error?.code === "storage/unknown") {
    return "Firebase Storage is not configured for this project. Enable Storage in Firebase Console, then redeploy storage.rules.";
  }

  if (error?.code === "storage/canceled") {
    return "CV upload was canceled.";
  }

  return error?.message || "Unexpected Firebase Storage error.";
}

export async function saveCvToStorage(file) {
  try {
    if (!file) {
      throw new Error("No CV file selected.");
    }

    const storageRef = ref(storage, CV_PATH);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    
    // Save URL to Firestore
    const settingsRef = doc(db, "settings", "portfolio");
    await setDoc(
      settingsRef,
      {
        cvUrl: url,
        cvPath: CV_PATH,
        cvUpdatedAt: Date.now(),
      },
      { merge: true }
    );
    
    return true;
  } catch (error) {
    const message = getStorageErrorMessage(error);
    console.error("Error uploading CV:", error);
    throw new Error(message);
  }
}

export async function getCvFromStorage() {
  try {
    const storageRef = ref(storage, CV_PATH);
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    // Return null if not found
    return null;
  }
}

export async function clearCvFromStorage() {
  try {
    const storageRef = ref(storage, CV_PATH);
    await deleteObject(storageRef);
    const settingsRef = doc(db, "settings", "portfolio");
    await setDoc(
      settingsRef,
      {
        cvUrl: "/Mohamed-Esam-Khodary-CV.pdf",
        cvPath: null,
        cvUpdatedAt: Date.now(),
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    const message = getStorageErrorMessage(error);
    console.error("Error deleting CV:", error);
    throw new Error(message);
  }
}
