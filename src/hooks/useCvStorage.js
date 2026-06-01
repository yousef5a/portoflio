import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "../lib/firebase";

const CV_PATH = "cv/Mohamed_Esam_CV.pdf";

export async function saveCvToStorage(file) {
  try {
    const storageRef = ref(storage, CV_PATH);
    await uploadBytes(storageRef, file);
    return true;
  } catch (error) {
    console.error("Error uploading CV:", error);
    throw error;
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
    return true;
  } catch (error) {
    console.error("Error deleting CV:", error);
    throw error;
  }
}
