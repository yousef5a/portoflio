import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useRealtimeCollection } from "./useRealtimeCollection";
import toast from "react-hot-toast";

const EDUCATION_QUERY_KEY = ["education"];

export function useEducation() {
  const handleSyncError = useCallback((error) => {
    console.error("Education sync error:", error);
    toast.error("Failed to sync education");
  }, []);
  const { data: education = [], isLoading: loading } = useRealtimeCollection(
    "education",
    EDUCATION_QUERY_KEY,
    null,
    handleSyncError
  );

  const { mutateAsync: addEducation } = useMutation({
    mutationFn: async (newEdu) => {
      const { data, error } = await supabase.from("education").insert(newEdu).select().single();
      if (error) throw error;
      return data.id;
    },
    onSuccess: () => toast.success("Education added successfully!"),
    onError: (error) => {
      console.error("Error adding education:", error);
      toast.error("Failed to add education.");
    }
  });

  const { mutateAsync: editEducation } = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const { error } = await supabase.from("education").update(updatedData).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => toast.success("Education updated successfully!"),
    onError: (error) => {
      console.error("Error editing education:", error);
      toast.error("Failed to update education.");
    }
  });

  const { mutateAsync: deleteEducation } = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("education").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => toast.success("Education deleted successfully!"),
    onError: (error) => {
      console.error("Error deleting education:", error);
      toast.error("Failed to delete education.");
    }
  });

  return { education, addEducation, editEducation, deleteEducation, loading };
}
