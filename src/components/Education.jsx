import { motion } from "framer-motion";
import { useEducation } from "../hooks/useEducation";
import Spinner from "./Spinner";

export default function Education() {
  const { education, loading } = useEducation();

  return (
    <section id="education" className="py-24 border-b border-slate-200/50 dark:border-white/5 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-start text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Education</h2>
          <div className="w-12 h-1 bg-sky-500 rounded-full mt-3" />
          <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl text-sm md:text-base">
            Academic foundation supporting analytical work.
          </p>
        </div>

        {loading ? (
          <Spinner />
        ) : education.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400 font-mono text-sm text-center">No education entries found.</p>
        ) : (
          <div className="grid gap-6">
            {education.map((item, idx) => (
              <motion.div
                key={item.id}
                className="p-8 rounded-3xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-white/5 hover:border-sky-500/30 transition-all duration-300 shadow-sm hover:shadow-md max-w-3xl"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                    {item.school}
                  </h3>
                  <span className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 font-semibold">
                    Graduated: {item.year}
                  </span>
                </div>
                
                <p className="text-slate-600 dark:text-slate-300 mt-3 text-sm sm:text-base leading-relaxed">
                  {item.degree}
                </p>
                
                {item.tags && Array.isArray(item.tags) && item.tags.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {item.tags.map((tag, i) => (
                      <span key={i} className="text-[10px] uppercase font-mono px-2.5 py-1.5 rounded-lg bg-slate-200/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
