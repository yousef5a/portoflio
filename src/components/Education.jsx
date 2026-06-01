import { motion } from "framer-motion";

const education = {
  school: "Benha University",
  degree: "Bachelor's degree in Commerce (English Section - Accounting)",
  year: "2025",
};

export default function Education() {
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

        <motion.div
          className="p-8 rounded-3xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-white/5 hover:border-sky-500/30 transition-all duration-300 shadow-sm hover:shadow-md max-w-3xl"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white">
              {education.school}
            </h3>
            <span className="text-xs sm:text-sm font-mono text-slate-500 dark:text-slate-400 font-semibold">
              Graduated: {education.year}
            </span>
          </div>
          
          <p className="text-slate-600 dark:text-slate-300 mt-3 text-sm sm:text-base leading-relaxed">
            {education.degree}
          </p>
          
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="text-[10px] uppercase font-mono px-2.5 py-1.5 rounded-lg bg-slate-200/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold">
              English Section
            </span>
            <span className="text-[10px] uppercase font-mono px-2.5 py-1.5 rounded-lg bg-slate-200/60 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold">
              Specialized in Accounting
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
