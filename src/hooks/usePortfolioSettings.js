import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useRealtimeDocument } from "./useRealtimeDocument";

const defaultSettings = {
  name: "Mohamed Esam",
  subtitle: "Data Analyst",
  description: "Passionate Data Analyst dedicated to turning complex data into clear insights that drive strategic decisions and business growth.",
  cvUrl: "/Mohamed-Esam-Khodary-CV.pdf", // default path in public folder
  cvUpdatedAt: null,
};

const SETTINGS_QUERY_KEY = ["settings", "portfolio"];
const SETTINGS_PATH = ["settings", "portfolio"];
const mergeSettings = (data) => ({ ...defaultSettings, ...data });
const handleSettingsError = (error) => {
  console.error("Error fetching settings:", error);
};

export function usePortfolioSettings() {
  const { data: settings = defaultSettings, isLoading: loading } = useRealtimeDocument(
    SETTINGS_PATH,
    SETTINGS_QUERY_KEY,
    defaultSettings,
    mergeSettings,
    handleSettingsError
  );

  const updateSettings = async (updates) => {
    try {
      const settingsRef = doc(db, "settings", "portfolio");
      await setDoc(settingsRef, updates, { merge: true });
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  return { settings, updateSettings, loading };
}
