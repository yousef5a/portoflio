import { useState, useEffect } from "react";
import { initialProjects } from "../data/initialProjects";

// Safely save to localStorage, showing a clear error if quota is exceeded
const safeSetProjects = (data) => {
  try {
    localStorage.setItem("portfolio_projects", JSON.stringify(data));
    return true;
  } catch (e) {
    if (e.name === "QuotaExceededError" || e.code === 22) {
      alert(
        "⚠️ Storage full!\n\n" +
        "Your browser's local storage is full. This usually happens when project images are too large.\n\n" +
        "Tips:\n" +
        "• Use smaller images (images are auto-compressed to 800px)\n" +
        "• Delete old projects you no longer need\n" +
        "• Clear browser cache and try again"
      );
    } else {
      console.error("Failed to save projects:", e);
    }
    return false;
  }
};


export function useProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("portfolio_projects");
    if (stored) {
      try {
        setProjects(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored projects", e);
        setProjects(initialProjects);
      }
    } else {
      setProjects(initialProjects);
      safeSetProjects(initialProjects);
    }
  }, []);

  const addProject = (newProject) => {
    const updated = [
      ...projects,
      {
        id: Date.now().toString(),
        ...newProject,
        screenshots: newProject.screenshots || [],
      },
    ];
    const saved = safeSetProjects(updated);
    if (saved) {
      setProjects(updated);
      return { success: true };
    }
    return { success: false, message: "فشل حفظ المشروع في ذاكرة التخزين المحلية." };
  };

  const deleteProject = (id) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    safeSetProjects(updated);
  };

  const editProject = (id, updatedData) => {
    const updated = projects.map((p) =>
      p.id === id ? { ...p, ...updatedData } : p
    );
    const saved = safeSetProjects(updated);
    if (saved) setProjects(updated);
  };

  return { projects, addProject, deleteProject, editProject };
}
