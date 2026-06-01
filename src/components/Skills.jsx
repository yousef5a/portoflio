import { motion } from "framer-motion";
import { useState } from "react";
import { useSkills } from "../hooks/useSkills";

const categories = ["All", "Analysis", "Visualization", "Database", "Programming", "Data Management"];

export default function Skills() {
  const { skills } = useSkills();
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = activeCategory === "All"
    ? skills
    : skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 border-b border-slate-200/50 dark:border-white/5 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-start text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Skills & Tech Stack</h2>
          <div className="w-12 h-1 bg-sky-500 rounded-full mt-3" />
          <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl text-sm md:text-base">
            Technical and analytical capabilities from real project work and academic studies.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-sky-500 text-white shadow-glow"
                  : "bg-slate-200/60 dark:bg-slate-900/60 text-slate-600 dark:text-slate-400 hover:bg-slate-300/60 dark:hover:bg-slate-800/60 border border-slate-200 dark:border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        {filteredSkills.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.id || skill.name}
                className="p-6 rounded-3xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-white/5 hover:border-sky-500/30 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md"
                layout
              >
                <div className="flex justify-between items-center text-sm mb-3">
                  <span className="font-bold text-slate-800 dark:text-white">{skill.name}</span>
                  <span className="text-xs px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-500 font-semibold font-mono">
                    {skill.category}
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-sm font-bold font-mono text-slate-550 dark:text-slate-400">
                    {skill.level}%
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl">
            <span className="text-sm text-slate-400 font-mono">No skills found in this category.</span>
          </div>
        )}
      </div>
    </section>
  );
}
