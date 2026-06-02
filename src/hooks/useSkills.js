import { useCallback } from "react";
import { doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { useMutation } from "@tanstack/react-query";
import { db } from "../lib/firebase";
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
      const skillId = Date.now().toString();
      const skillRef = doc(db, "skills", skillId);
      await setDoc(skillRef, {
        ...newSkill,
        level: Number(newSkill.level) || 0
      });
      return skillId;
    },
    onSuccess: () => toast.success("Skill added successfully!"),
    onError: (error) => {
      console.error("Error adding skill:", error);
      toast.error("Failed to add skill.");
    }
  });

  const { mutateAsync: editSkillMutation } = useMutation({
    mutationFn: async ({ id, updatedSkill }) => {
      const skillRef = doc(db, "skills", id);
      await updateDoc(skillRef, {
        ...updatedSkill,
        level: Number(updatedSkill.level) || 0
      });
    },
    onSuccess: () => toast.success("Skill updated successfully!"),
    onError: (error) => {
      console.error("Error editing skill:", error);
      toast.error("Failed to update skill.");
    }
  });

  const { mutateAsync: deleteSkill } = useMutation({
    mutationFn: async (id) => {
      const skillRef = doc(db, "skills", id);
      await deleteDoc(skillRef);
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
