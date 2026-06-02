import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useRealtimeCollection } from "./useRealtimeCollection";
import toast from "react-hot-toast";

const PROJECTS_QUERY_KEY = ["projects"];
const sortProjects = (data) =>
  [...data].sort((a, b) => (a.title || "").localeCompare(b.title || ""));

// Field mapping: frontend names ↔ database names
const frontendToDb = (data) => {
  const { desc, stack, github, link, image, ...rest } = data;
  return {
    ...rest,
    description: desc,
    tech_stack: stack,
    github_url: github,
    live_url: link,
    cover_image: image,
  };
};

const dbToFrontend = (data) => {
  const {
    description,
    tech_stack,
    github_url,
    live_url,
    cover_image,
    ...rest
  } = data;
  return {
    ...rest,
    desc: description,
    stack: tech_stack,
    github: github_url,
    link: live_url,
    image: cover_image,
  };
};

export function useProjects() {
  const handleSyncError = useCallback((error) => {
    console.error("Projects sync error:", error);
    toast.error("Failed to sync projects");
  }, []);
  const { data: projects = [], isLoading: loading } = useRealtimeCollection(
    "projects",
    PROJECTS_QUERY_KEY,
    (data) => sortProjects(data.map(dbToFrontend)),
    handleSyncError,
  );

  // Mutations
  const { mutateAsync: addProject } = useMutation({
    mutationFn: async (newProject) => {
      const dbProject = frontendToDb({
        ...newProject,
        screenshots: newProject.screenshots || [],
      });
      const { data, error } = await supabase
        .from("projects")
        .insert(dbProject)
        .select()
        .single();
      if (error) throw error;
      return data.id;
    },
    onSuccess: () => toast.success("Project added successfully!"),
    onError: (error) => {
      console.error("Error adding project:", error);
      toast.error("Failed to add project.");
    },
  });

  const { mutateAsync: editProjectMutation } = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const dbData = frontendToDb(updatedData);
      const { error } = await supabase
        .from("projects")
        .update(dbData)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => toast.success("Project updated successfully!"),
    onError: (error) => {
      console.error("Error editing project:", error);
      toast.error("Failed to update project.");
    },
  });

  const { mutateAsync: deleteProject } = useMutation({
    mutationFn: async (id) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => toast.success("Project deleted successfully!"),
    onError: (error) => {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project.");
    },
  });

  const editProject = async (id, updatedData) => {
    return editProjectMutation({ id, updatedData });
  };

  return {
    projects,
    addProject,
    deleteProject,
    editProject,
    loading,
  };
}
