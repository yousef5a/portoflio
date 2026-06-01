import { useState, useEffect } from "react";

const initialSkills = [
  { id: "1", name: "Power BI", level: 90, category: "Visualization" },
  { id: "2", name: "Excel", level: 92, category: "Analysis" },
  { id: "3", name: "SQL", level: 88, category: "Database" },
  { id: "4", name: "Python (Pandas/Matplotlib)", level: 70, category: "Programming" },
  { id: "5", name: "Data Cleaning", level: 90, category: "Data Management" },
  { id: "6", name: "Statistics", level: 80, category: "Analysis" },
];

export function useSkills() {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("portfolio_skills");
    if (stored) {
      try {
        setSkills(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse stored skills", e);
        setSkills(initialSkills);
      }
    } else {
      setSkills(initialSkills);
      localStorage.setItem("portfolio_skills", JSON.stringify(initialSkills));
    }
  }, []);

  const addSkill = (newSkill) => {
    const updated = [
      ...skills,
      {
        id: Date.now().toString(),
        ...newSkill,
        level: Number(newSkill.level),
      },
    ];
    setSkills(updated);
    localStorage.setItem("portfolio_skills", JSON.stringify(updated));
  };

  const editSkill = (id, updatedSkill) => {
    const updated = skills.map((s) =>
      s.id === id ? { ...s, ...updatedSkill, level: Number(updatedSkill.level) } : s
    );
    setSkills(updated);
    localStorage.setItem("portfolio_skills", JSON.stringify(updated));
  };

  const deleteSkill = (id) => {
    const updated = skills.filter((s) => s.id !== id);
    setSkills(updated);
    localStorage.setItem("portfolio_skills", JSON.stringify(updated));
  };

  return { skills, addSkill, editSkill, deleteSkill };
}
