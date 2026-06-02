import { useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import { useRealtimeCollection } from "./useRealtimeCollection";
import toast from "react-hot-toast";

const PROJECTS_QUERY_KEY = ["projects"];
const sortProjects = (data) =>
  [...data].sort((a, b) => (a.title || "").localeCompare(b.title || ""));

// Field mapping: frontend names ↔ database names
const frontendToDb = (data) => ({
  ...data,
  description: data.desc,
  tech_stack: data.stack,
  github_url: data.github,
  live_url: data.link,
  cover_image: data.image,
  desc: undefined,
  stack: undefined,
  github: undefined,
  link: undefined,
  image: undefined,
});

const dbToFrontend = (data) => ({
  ...data,
  desc: data.description,
  stack: data.tech_stack,
  github: data.github_url,
  link: data.live_url,
  image: data.cover_image,
  description: undefined,
  tech_stack: undefined,
  github_url: undefined,
  live_url: undefined,
  cover_image: undefined,
});

export function useProjects() {
  const handleSyncError = useCallback((error) => {
    console.error("Projects sync error:", error);
    toast.error("Failed to sync projects");
  }, []);
  const { data: projectsRaw = [], isLoading: loading } = useRealtimeCollection(
    "projects",
    PROJECTS_QUERY_KEY,
    (data) => sortProjects(data.map(dbToFrontend)),
    handleSyncError,
  );

  const projects = projectsRaw;

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
