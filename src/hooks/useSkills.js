import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useRealtimeCollection } from "./useRealtimeCollection";
import toast from "react-hot-toast";

const SKILLS_QUERY_KEY = ["skills"];
const sortSkills = (data) => [...data].sort((a, b) => (b.level || 0) - (a.level || 0));

export function useSkills() {
  const handleSyncError = useCallback((error) => {
    console.error("Skills sync error:", error);
    toast.error("Failed to sync skills");
  }, []);
  const { data: skills = [], isLoading: loading } = useRealtimeCollection(
    "skills",
    SKILLS_QUERY_KEY,
    sortSkills,
    handleSyncError
  );

  // Mutations
  const { mutateAsync: addSkill } = useMutation({
    mutationFn: async (newSkill) => {
      const { data, error } = await supabase.from("skills").insert({
        ...newSkill,
        level: Number(newSkill.level) || 0
      }).select().single();
      if (error) throw error;
      return data.id;
    },
    onSuccess: () => toast.success("Skill added successfully!"),
    onError: (error) => {
      console.error("Error adding skill:", error);
      toast.error("Failed to add skill.");
    }
  });

  const { mutateAsync: editSkillMutation } = useMutation({
    mutationFn: async ({ id, updatedSkill }) => {
      const { error } = await supabase.from("skills").update({
        ...updatedSkill,
        level: Number(updatedSkill.level) || 0
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => toast.success("Skill updated successfully!"),
    onError: (error) => {
      console.error("Error editing skill:", error);
      toast.error("Failed to update skill.");
    }
  });

  const { mutateAsync: deleteSkill } = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("skills").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => toast.success("Skill deleted successfully!"),
    onError: (error) => {
      console.error("Error deleting skill:", error);
      toast.error("Failed to delete skill.");
    }
  });

  const editSkill = async (id, updatedSkill) => {
    return editSkillMutation({ id, updatedSkill });
  };

  return { 
    skills, 
    addSkill, 
    editSkill, 
    deleteSkill, 
    loading 
  };
}
