import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaChevronRight } from "react-icons/fa";

export default function About() {
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="about" className="py-24 border-b border-slate-200/50 dark:border-white/5 relative">
      <motion.div
        className="max-w-6xl mx-auto px-6"
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="flex flex-col items-start text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">About Me</h2>
          <div className="w-12 h-1 bg-sky-500 rounded-full mt-3" />
          <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl text-sm md:text-base">
            A quick overview of my background, focus, and core competencies.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <div className="md:col-span-2 p-8 rounded-3xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-white/5 flex flex-col justify-between hover:border-sky-500/30 transition-all duration-300 shadow-sm hover:shadow-md">
            <div>
              <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white flex items-center gap-2">
                Professional Journey
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                I am a Data Analyst focused on transforming data into clear,
                actionable insights. My work centers on SQL querying, dashboard
                creation in Power BI, and analysis in Excel to solve practical
                business problems. I value clarity, precision, and storytelling
                that helps teams act with confidence.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-4 text-sm sm:text-base">
                I graduated in 2025 with a Bachelor's degree in Commerce, specializing in Accounting. This commercial background gives me a unique advantage: I don't just write queries; I understand the financial and operational drivers of the numbers I analyze.
              </p>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                <FaChevronRight className="text-[10px] text-sky-500" /> Accounting Knowledge
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                <FaChevronRight className="text-[10px] text-sky-500" /> Analytical Thinking
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-200/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 text-xs font-semibold">
                <FaChevronRight className="text-[10px] text-sky-500" /> KPI Identification
              </span>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-white/5 space-y-6 hover:border-sky-500/30 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-2 text-slate-800 dark:text-white">
              Contact Card
            </h3>
            
            <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
              <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-500">
                <FaMapMarkerAlt size={18} />
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Location</div>
                <div className="text-sm font-semibold">Cairo, Egypt</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
              <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-500">
                <FaPhoneAlt size={18} />
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400">Phone</div>
                <div className="text-sm font-semibold">01016355269</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300 overflow-hidden">
              <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-500 flex-shrink-0">
                <FaEnvelope size={18} />
              </div>
              <div className="truncate">
                <div className="text-xs text-slate-500 dark:text-slate-400">Email</div>
                <a href="mailto:mohamedesamkhodary@gmail.com" className="text-sm font-semibold hover:text-sky-500 transition-colors block truncate">
                  mohamedesamkhodary@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
