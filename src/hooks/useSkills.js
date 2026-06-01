import { useState, useEffect } from "react";
import { collection, query, orderBy, limit, startAfter, getDocs, doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export function useSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchSkills = async (initial = true) => {
    try {
      const baseQuery = query(
        collection(db, "skills"),
        orderBy("name"),
        limit(10)
      );
      const q = initial ? baseQuery : query(
        collection(db, "skills"),
        orderBy("name"),
        startAfter(lastVisible),
        limit(10)
      );
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        setHasMore(false);
        setLoading(false);
        return;
      }
      const fetched = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setSkills(prev => (initial ? fetched : [...prev, ...fetched]));
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
      setHasMore(snapshot.docs.length === 10);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching skills:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addSkill = async (newSkill) => {
    try {
      const skillId = Date.now().toString();
      const skillRef = doc(db, "skills", skillId);
      await setDoc(skillRef, {
        ...newSkill,
        level: Number(newSkill.level)
      });
      // Optimistic UI
      setSkills(prev => [{ id: skillId, ...newSkill, level: Number(newSkill.level) }, ...prev]);
      return { success: true };
    } catch (error) {
      console.error("Error adding skill:", error);
      return { success: false, message: error.message };
    }
  };

  const editSkill = async (id, updatedSkill) => {
    try {
      const skillRef = doc(db, "skills", id);
      await updateDoc(skillRef, {
        ...updatedSkill,
        level: Number(updatedSkill.level)
      });
      // Optimistic UI
      setSkills(prev => prev.map(s => (s.id === id ? { ...s, ...updatedSkill, level: Number(updatedSkill.level) } : s)));
      return { success: true };
    } catch (error) {
      console.error("Error editing skill:", error);
      return { success: false, message: error.message };
    }
  };

  const deleteSkill = async (id) => {
    try {
      const skillRef = doc(db, "skills", id);
      await deleteDoc(skillRef);
      // Optimistic UI
      setSkills(prev => prev.filter(s => s.id !== id));
      return { success: true };
    } catch (error) {
      console.error("Error deleting skill:", error);
      return { success: false, message: error.message };
    }
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      fetchSkills(false);
    }
  };

  return { skills, addSkill, editSkill, deleteSkill, loading, loadMore, hasMore };
}
