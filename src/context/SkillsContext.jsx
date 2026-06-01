import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, addDoc, doc, deleteDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

const initialSkills = [
  { id: "1", name: "Power BI", level: 90, category: "Visualization" },
  { id: "2", name: "Excel", level: 92, category: "Analysis" },
  { id: "3", name: "SQL", level: 88, category: "Database" },
  { id: "4", name: "Python (Pandas/Matplotlib)", level: 70, category: "Programming" },
  { id: "5", name: "Data Cleaning", level: 90, category: "Data Management" },
  { id: "6", name: "Statistics", level: 80, category: "Analysis" },
];

const SkillsContext = createContext(null);

const safeSet = (data) => {
  try {
    localStorage.setItem("portfolio_skills", JSON.stringify(data));
    return true;
  } catch (e) {
    if (e.name === "QuotaExceededError") {
      alert("Storage full! Use smaller images.");
    }
    return false;
  }
};

export function SkillsProvider({ children }) {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "skills"), (snapshot) => {
      const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      setSkills(data);
      safeSet(data);
      setLoading(false);
    }, (error) => {
      console.error("Firestore skills error:", error);
      setLoading(false);
    });
    return () => unsub();
  }, []);


  const addSkill = async (newSkill) => {
    try {
      const docRef = await addDoc(collection(db, "skills"), {
        ...newSkill,
        level: Number(newSkill.level) || 0,
      });
      // onSnapshot will update state
      return { success: true, id: docRef.id };
    } catch (e) {
      console.error(e);
      return { success: false, message: e.message };
    }
  };

  const editSkill = async (id, updatedSkill) => {
    try {
      await updateDoc(doc(db, "skills", id), {
        ...updatedSkill,
        level: Number(updatedSkill.level) || 0,
      });
      // onSnapshot will sync
      return { success: true };
    } catch (e) {
      console.error(e);
      return { success: false, message: e.message };
    }
  };

  const deleteSkill = async (id) => {
    try {
      await deleteDoc(doc(db, "skills", id));
      // onSnapshot will update state
      return { success: true };
    } catch (e) {
      console.error(e);
      return { success: false, message: e.message };
    }
  };

  // loading state is managed by Firestore listener

  return (
    <SkillsContext.Provider value={{ skills, addSkill, editSkill, deleteSkill, loading }}>
      {children}
    </SkillsContext.Provider>
  );
}

export const useSkills = () => useContext(SkillsContext);
