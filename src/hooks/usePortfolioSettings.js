import { supabase } from "../lib/supabase";
import { useRealtimeDocument } from "./useRealtimeDocument";

const defaultSettings = {
  name: "Mohamed Esam",
  subtitle: "Data Analyst",
  description: "Passionate Data Analyst dedicated to turning complex data into clear insights that drive strategic decisions and business growth.",
  cvUrl: "/Mohamed-Esam-Khodary-CV.pdf",
  cvUpdatedAt: null,
};

const SETTINGS_QUERY_KEY = ["settings", "portfolio"];
const mergeSettings = (data) => ({ ...defaultSettings, ...data });
const handleSettingsError = (error) => {
  console.error("Error fetching settings:", error);
};

export function usePortfolioSettings() {
  const { data: settings = defaultSettings, isLoading: loading } = useRealtimeDocument(
    "settings",
    "portfolio",
    SETTINGS_QUERY_KEY,
    defaultSettings,
    mergeSettings,
    handleSettingsError
  );

  const updateSettings = async (updates) => {
    try {
      const { error } = await supabase.from("settings").update(updates).eq("id", "portfolio");
      if (error) throw error;
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  return { settings, updateSettings, loading };
}
