import { supabase } from "../lib/supabase";
import { useRealtimeDocument } from "./useRealtimeDocument";

const defaultSettings = {
  name: "Mohamed Esam",
  subtitle: "Data Analyst",
  description:
    "Passionate Data Analyst dedicated to turning complex data into clear insights that drive strategic decisions and business growth.",
  cvUrl: "/Mohamed-Esam-Khodary-CV.pdf",
  cvUpdatedAt: null,
};

// Field mapping: frontend names → database names
const frontendToDb = (data) => ({
  hero_title: data.name,
  hero_subtitle: data.subtitle,
  about_text: data.description,
  ...(data.cvUrl && { cv_url: data.cvUrl }),
  ...(data.cvUpdatedAt && { cv_updated_at: data.cvUpdatedAt }),
});

const dbToFrontend = (data) => ({
  name: data.hero_title,
  subtitle: data.hero_subtitle,
  description: data.about_text,
  ...(data.cv_url && { cvUrl: data.cv_url }),
  ...(data.cv_updated_at && { cvUpdatedAt: data.cv_updated_at }),
});

const SETTINGS_QUERY_KEY = ["settings", "portfolio"];
const mergeSettings = (data) => ({
  ...defaultSettings,
  ...(data ? dbToFrontend(data) : {}),
});
const handleSettingsError = (error) => {
  console.error("Error fetching settings:", error);
};

export function usePortfolioSettings() {
  const { data: settings = defaultSettings, isLoading: loading } =
    useRealtimeDocument(
      "settings",
      "portfolio",
      SETTINGS_QUERY_KEY,
      defaultSettings,
      mergeSettings,
      handleSettingsError,
    );

  const updateSettings = async (updates) => {
    try {
      const dbData = frontendToDb(updates);
      const { error } = await supabase
        .from("settings")
        .upsert({ id: "portfolio", ...dbData }, { onConflict: "id" });
      if (error) throw error;
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  return { settings, updateSettings, loading };
}
