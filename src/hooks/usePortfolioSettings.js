import { supabase } from "../lib/supabase";
import { useRealtimeDocument } from "./useRealtimeDocument";

// Hardcoded settings - not from DB
const staticSettings = {
  name: "Mohamed Esam",
  subtitle: "Data Analyst",
  description:
    "Passionate Data Analyst dedicated to turning complex data into clear insights that drive strategic decisions and business growth.",
};

const defaultCvSettings = {
  cvUrl: "/Mohamed-Esam-Khodary-CV.pdf",
  cvUpdatedAt: null,
};

const SETTINGS_QUERY_KEY = ["settings", "portfolio"];

// Map DB columns to frontend field names
const dbToFrontend = (data) => ({
  cvUrl: data?.cv_url || defaultCvSettings.cvUrl,
  cvUpdatedAt: data?.cv_updated_at || null,
});

const mergeSettings = (data) => {
  if (!data) {
    return { ...staticSettings, ...defaultCvSettings };
  }
  return { ...staticSettings, ...defaultCvSettings, ...dbToFrontend(data) };
};

const handleSettingsError = (error) => {
  console.error("Error fetching settings:", error);
};

export function usePortfolioSettings() {
  const defaultMergedSettings = mergeSettings(null);
  const { data: settings = defaultMergedSettings, isLoading: loading } =
    useRealtimeDocument(
      "settings",
      "portfolio",
      SETTINGS_QUERY_KEY,
      defaultMergedSettings,
      mergeSettings,
      handleSettingsError,
    );

  const updateCvSettings = async (cvUrl, cvUpdatedAt) => {
    try {
      const { error } = await supabase.from("settings").upsert(
        {
          id: "portfolio",
          cv_url: cvUrl,
          cv_updated_at: cvUpdatedAt,
        },
        { onConflict: "id" },
      );
      if (error) throw error;
    } catch (error) {
      console.error("Error updating CV settings:", error);
    }
  };

  return { settings, updateCvSettings, loading };
}
