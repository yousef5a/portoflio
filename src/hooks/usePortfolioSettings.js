import { useState } from "react";

const defaultSettings = {
  name: "Mohamed Esam",
  subtitle: "Data Analyst",
  description: "Passionate Data Analyst dedicated to turning complex data into clear insights that drive strategic decisions and business growth.",
  cvUrl: "/Mohamed-Esam-Khodary-CV.pdf", // default path in public folder
};

export function usePortfolioSettings() {
  const [settings, setSettings] = useState(defaultSettings);

  const updateSettings = (updates) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  return { settings, updateSettings };
}
