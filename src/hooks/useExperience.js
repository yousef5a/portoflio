import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useRealtimeCollection } from "./useRealtimeCollection";
import toast from "react-hot-toast";

const EXPERIENCE_QUERY_KEY = ["experience"];

export function useExperience() {
  const handleSyncError = useCallback((error) => {
    console.error("Experience sync error:", error);
    toast.error("Failed to sync experience");
  }, []);
  const { data: experience = [], isLoading: loading } = useRealtimeCollection(
    "experience",
    EXPERIENCE_QUERY_KEY,
    null,
    handleSyncError
  );

  const { mutateAsync: addExperience } = useMutation({
    mutationFn: async (newExp) => {
      const { data, error } = await supabase.from("experience").insert(newExp).select().single();
      if (error) throw error;
      return data.id;
    },
    onSuccess: () => toast.success("Experience added successfully!"),
    onError: (error) => {
      console.error("Error adding experience:", error);
      toast.error("Failed to add experience.");
    }
  });

  const { mutateAsync: editExperience } = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const { error } = await supabase.from("experience").update(updatedData).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => toast.success("Experience updated successfully!"),
    onError: (error) => {
      console.error("Error editing experience:", error);
      toast.error("Failed to update experience.");
    }
  });

  const { mutateAsync: deleteExperience } = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("experience").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => toast.success("Experience deleted successfully!"),
    onError: (error) => {
      console.error("Error deleting experience:", error);
      toast.error("Failed to delete experience.");
    }
  });

  return { experience, addExperience, editExperience, deleteExperience, loading };
}
