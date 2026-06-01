import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, startAfter, getDocs, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { initialProjects } from "../data/initialProjects";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchProjects = async (initial = true) => {
    try {
      const baseQuery = query(
        collection(db, "projects"),
        orderBy("title"),
        limit(10)
      );
      const q = initial ? baseQuery : query(
        collection(db, "projects"),
        orderBy("title"),
        startAfter(lastVisible),
        limit(10)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        if (initial) {
          setProjects(initialProjects);
        }
        setHasMore(false);
        setLoading(false);
        return;
      }
      const fetched = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(prev => (initial ? fetched : [...prev, ...fetched]));
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === 10);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects from Firestore:", error);
      setProjects(initialProjects);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addProject = async (newProject) => {
    try {
      const projectId = Date.now().toString(); // Or let Firestore generate it with addDoc
      const projectRef = doc(db, "projects", projectId);
      await setDoc(projectRef, {
        ...newProject,
        screenshots: newProject.screenshots || [],
      });
      // Optimistic UI: prepend the new project locally
      setProjects(prev => [{ id: projectId, ...newProject, screenshots: newProject.screenshots || [] }, ...prev]);
      return { success: true };
    } catch (error) {
      console.error("Error adding project:", error);
      return { success: false, message: "فشل حفظ المشروع في قاعدة البيانات." };
    }
  };

  const deleteProject = async (id) => {
    try {
      const projectRef = doc(db, "projects", id);
      await deleteDoc(projectRef);
      // Optimistic UI: remove locally
      setProjects(prev => prev.filter(p => p.id !== id));
      return { success: true };
    } catch (error) {
      console.error("Error deleting project:", error);
      return { success: false, message: error.message };
    }
  };

  const editProject = async (id, updatedData) => {
    try {
      const projectRef = doc(db, "projects", id);
      await updateDoc(projectRef, updatedData);
      // Optimistic UI: update locally
      setProjects(prev => prev.map(p => (p.id === id ? { ...p, ...updatedData } : p)));
      return { success: true };
    } catch (error) {
      console.error("Error editing project:", error);
      return { success: false, message: error.message };
    }
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      fetchProjects(false);
    }
  };

  return { projects, addProject, deleteProject, editProject, loading, loadMore, hasMore };
}
