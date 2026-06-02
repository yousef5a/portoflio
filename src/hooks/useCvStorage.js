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
    const { error: dbError } = await supabase.from("settings").update({
      cvUrl: url,
      cvPath: CV_PATH,
      cvUpdatedAt: new Date().toISOString(),
    }).eq("id", "portfolio");

    if (dbError) throw dbError;
    
    return true;
  } catch (error) {
    console.error("Error uploading CV:", error);
    throw new Error(error.message || "Failed to upload CV");
  }
}

export async function getCvFromStorage() {
  try {
    const { data } = supabase.storage.from("portfolio").getPublicUrl(CV_PATH);
    return data.publicUrl;
  } catch (error) {
    return null;
  }
}

export async function clearCvFromStorage() {
  try {
    const { error: deleteError } = await supabase.storage
      .from("portfolio")
      .remove([CV_PATH]);
    
    if (deleteError) throw deleteError;

    const { error: dbError } = await supabase.from("settings").update({
      cvUrl: "/Mohamed-Esam-Khodary-CV.pdf",
      cvPath: null,
      cvUpdatedAt: new Date().toISOString(),
    }).eq("id", "portfolio");

    if (dbError) throw dbError;

    return true;
  } catch (error) {
    console.error("Error deleting CV:", error);
    throw new Error(error.message || "Failed to delete CV");
  }
}
