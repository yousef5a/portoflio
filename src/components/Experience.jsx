import { motion } from "framer-motion";
import { useExperience } from "../hooks/useExperience";
import Spinner from "./Spinner";

export default function Experience() {
  const { experience, loading } = useExperience();

  return (
    <section id="experience" className="py-24 border-b border-slate-200/50 dark:border-white/5 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-start text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Professional Experience</h2>
          <div className="w-12 h-1 bg-sky-500 rounded-full mt-3" />
          <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl text-sm md:text-base">
            Timeline of practical industry experience.
          </p>
        </div>

        {loading ? (
          <Spinner />
        ) : experience.length === 0 ? (
          <p className="text-slate-500 dark:text-slate-400 font-mono text-sm text-center">No experience entries found.</p>
        ) : (
          <div className="relative border-l-2 border-sky-500/20 dark:border-sky-500/30 ml-4 pl-8 space-y-12 py-2">
            {experience.map((item, idx) => (
              <motion.div
                key={item.id}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                {/* Timeline dot */}
                <span className="absolute -left-[41px] top-1.5 w-5 h-5 rounded-full bg-slate-900 dark:bg-white border-4 border-sky-500 shadow-glow" />
                
                <div className="p-6 sm:p-8 rounded-3xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-white/5 hover:border-sky-500/30 transition-all duration-300 shadow-sm hover:shadow-md">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                      {item.role} <span className="bg-sky-500/10 text-sky-500 px-2.5 py-1 rounded-lg text-xs font-semibold sm:inline ml-1 font-mono">@ {item.company}</span>
                    </h3>
                    <span className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 font-semibold">{item.duration}</span>
                  </div>
                  
                  <ul className="mt-5 space-y-3 text-slate-600 dark:text-slate-300 text-sm md:text-base">
                    {item.points && Array.isArray(item.points) ? item.points.map((point, index) => (
                      <li key={index} className="flex gap-2 items-start leading-relaxed">
                        <span className="text-sky-500 mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" />
                        <span>{point}</span>
                      </li>
                    )) : null}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
