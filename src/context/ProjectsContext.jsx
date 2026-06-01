import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, addDoc, doc, deleteDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

const ProjectsContext = createContext(null);

const safeSet = (data) => {
  try {
    localStorage.setItem("portfolio_projects", JSON.stringify(data));
    return true;
  } catch (e) {
    if (e.name === "QuotaExceededError") {
      alert("Storage full! Use smaller images.");
    }
    return false;
  }
};

export function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    try {
      const stored = localStorage.getItem("portfolio_projects");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "projects"), (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setProjects(data);
      safeSet(data);
      setLoading(false);
    }, (error) => {
      console.error("Firestore projects error:", error);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const addProject = async (newProject) => {
    try {
      const docRef = await addDoc(collection(db, "projects"), {
        ...newProject,
        screenshots: newProject.screenshots || [],
      });
      // Firestore onSnapshot will update local state and storage.
      return { success: true, id: docRef.id };
    } catch (e) {
      console.error(e);
      return { success: false, message: e.message };
    }
  };

  const deleteProject = async (id) => {
    try {
      await deleteDoc(doc(db, "projects", id));
      // Snapshot will update state.
      return { success: true };
    } catch (e) {
      console.error(e);
      return { success: false, message: e.message };
    }
  };

  const editProject = async (id, updatedData) => {
    try {
      await updateDoc(doc(db, "projects", id), updatedData);
      // Snapshot will sync state.
      return { success: true };
    } catch (e) {
      console.error(e);
      return { success: false, message: e.message };
    }
  };

  return (
    <ProjectsContext.Provider value={{ projects, addProject, deleteProject, editProject, loading }}>
      {children}
    </ProjectsContext.Provider>
  );
}

export const useProjects = () => useContext(ProjectsContext);
