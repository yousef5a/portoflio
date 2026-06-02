import { supabase } from "../lib/supabase";

const CV_PATH = "cv/Mohamed_Esam_CV.pdf";

export async function saveCvToStorage(file) {
  try {
    if (!file) {
      throw new Error("No CV file selected.");
    }

    const { error: uploadError } = await supabase.storage
      .from("portfolio")
      .upload(CV_PATH, file, { upsert: true });

    if (uploadError) throw uploadError;

    const { data: publicUrlData } = supabase.storage
      .from("portfolio")
      .getPublicUrl(CV_PATH);

    const url = publicUrlData.publicUrl;

    // Save URL to Supabase DB settings
    const { error: dbError } = await supabase
      .from("settings")
      .update({
        cv_url: url,
        cv_path: CV_PATH,
        cv_updated_at: new Date().toISOString(),
      })
      .eq("id", "portfolio");

    if (dbError) throw dbError;

    invalidateCvCache();
    return true;
  } catch (error) {
    console.error("Error uploading CV:", error);
    throw new Error(error.message || "Failed to upload CV");
  }
}

let cachedCvUrl = null;

export async function getCvFromStorage() {
  try {
    if (cachedCvUrl) return cachedCvUrl;
    const { data } = supabase.storage.from("portfolio").getPublicUrl(CV_PATH);
    cachedCvUrl = data.publicUrl;
    return cachedCvUrl;
  } catch (error) {
    return null;
  }
}

export function invalidateCvCache() {
  cachedCvUrl = null;
}

export async function clearCvFromStorage() {
  try {
    const { error: deleteError } = await supabase.storage
      .from("portfolio")
      .remove([CV_PATH]);

    if (deleteError) throw deleteError;

    const { error: dbError } = await supabase
      .from("settings")
      .update({
        cv_url: "/Mohamed-Esam-Khodary-CV.pdf",
        cv_path: null,
        cv_updated_at: new Date().toISOString(),
      })
      .eq("id", "portfolio");

    if (dbError) throw dbError;

    invalidateCvCache();
    return true;
  } catch (error) {
    console.error("Error deleting CV:", error);
    throw new Error(error.message || "Failed to delete CV");
  }
}
