import { useState, useEffect } from "react";

const STORAGE_KEY = "portfolioSettings";

const defaultSettings = {
  name: "Mohamed Esam",
  subtitle: "Data Analyst",
  description: "Passionate Data Analyst dedicated to turning complex data into clear insights that drive strategic decisions and business growth.",
  cvUrl: "/Mohamed-Esam-Khodary-CV.pdf", // default path in public folder
};

export function usePortfolioSettings() {
  const [settings, setSettings] = useState(defaultSettings);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSettings(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse portfolio settings from storage", e);
      }
    }
  }, []);

  // Persist changes
  const updateSettings = (updates) => {
    setSettings((prev) => {
      const newSettings = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
      return newSettings;
    });
  };

  return { settings, updateSettings };
}
