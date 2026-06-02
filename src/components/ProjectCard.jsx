import { motion } from "framer-motion";
import { memo, useMemo } from "react";
import { FaGithub, FaExternalLinkAlt, FaTrash, FaImages } from "react-icons/fa";

// Special SVG Previews simulating dashboard analytics for each project
const InstagramPreview = () => (
  <div className="w-full h-full bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 flex flex-col justify-between p-4 font-mono text-[10px] text-white">
    <div className="flex justify-between items-center border-b border-white/10 pb-2">
      <span className="font-bold text-pink-400">INSTAGRAM ANALYTICS</span>
      <span className="bg-pink-500/20 text-pink-400 px-1.5 py-0.5 rounded text-[8px]">LIVE POWER BI</span>
    </div>
    
    <div className="grid grid-cols-3 gap-2 my-2">
      <div className="bg-white/5 border border-white/10 rounded p-1.5 flex flex-col justify-center">
        <span className="text-[8px] text-slate-400">Reach</span>
        <span className="text-sm font-bold text-sky-400">+124.5%</span>
      </div>
      <div className="bg-white/5 border border-white/10 rounded p-1.5 flex flex-col justify-center">
        <span className="text-[8px] text-slate-400">Engagement</span>
        <span className="text-sm font-bold text-emerald-400">4.82%</span>
      </div>
      <div className="bg-white/5 border border-white/10 rounded p-1.5 flex flex-col justify-center">
        <span className="text-[8px] text-slate-400">Followers</span>
        <span className="text-sm font-bold text-purple-400">18.2K</span>
      </div>
    </div>

    {/* Sparkline chart SVG */}
    <div className="flex-1 min-h-[40px] relative mt-1 flex items-end">
      <svg className="w-full h-full" viewBox="0 0 100 35">
        <defs>
          <linearGradient id="instaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ec4899" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path
          d="M0,30 Q15,10 30,22 T60,5 T90,20 L100,12 L100,35 L0,35 Z"
          fill="url(#instaGrad)"
        />
        <path
          d="M0,30 Q15,10 30,22 T60,5 T90,20 L100,12"
          fill="none"
          stroke="#f472b6"
          strokeWidth="1.5"
        />
        <circle cx="60" cy="5" r="2" fill="#ffffff" />
        <circle cx="100" cy="12" r="2" fill="#ffffff" />
      </svg>
      <span className="absolute top-1 right-1 text-[7px] text-slate-400">Weekly Engagement Trend</span>
    </div>
  </div>
);

const HRPreview = () => (
  <div className="w-full h-full bg-slate-950 flex flex-col justify-between p-4 font-mono text-[10px] text-white">
    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
      <span className="font-bold text-indigo-400">HR PERFORMANCE MATRIX</span>
      <span className="bg-indigo-500/20 text-indigo-400 px-1.5 py-0.5 rounded text-[8px]">KPI MONITOR</span>
    </div>
    
    <div className="grid grid-cols-2 gap-2 my-2">
      <div className="bg-slate-900 border border-slate-800 rounded p-1.5">
        <span className="text-[8px] text-slate-500 block">TOTAL STAFF</span>
        <span className="text-xs font-bold">1,420 Employees</span>
      </div>
      <div className="bg-slate-900 border border-slate-800 rounded p-1.5">
        <span className="text-[8px] text-slate-500 block">ATTRITION RATE</span>
        <span className="text-xs font-bold text-rose-500">14.2%</span>
      </div>
    </div>

    {/* Horizontal Bar Chart */}
    <div className="space-y-1.5 flex-1 flex flex-col justify-center">
      <div className="flex items-center justify-between text-[7px]">
        <span>Sales & Marketing</span>
        <span className="font-bold">22% Attrition</span>
      </div>
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-rose-500 rounded-full w-[65%]" />
      </div>

      <div className="flex items-center justify-between text-[7px] mt-1">
        <span>R&D / Engineering</span>
        <span className="font-bold">8% Attrition</span>
      </div>
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-sky-500 rounded-full w-[25%]" />
      </div>
    </div>
  </div>
);

const PizzaPreview = () => (
  <div className="w-full h-full bg-slate-900 flex flex-col justify-between p-4 font-mono text-[10px] text-white">
    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
      <span className="font-bold text-amber-500">PIZZA SALES ANALYTICS</span>
      <span className="bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded text-[8px]">SQL + DAX</span>
    </div>
    
    <div className="flex gap-4 my-auto items-center">
      {/* Mini Pie Chart SVG */}
      <div className="w-16 h-16 flex-shrink-0 relative">
        <svg className="w-full h-full" viewBox="0 0 36 36">
          <path
            className="text-slate-800"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="text-amber-500"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeDasharray="60, 100"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
          />
          <path
            className="text-orange-500"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeDasharray="25, 100"
            strokeDashoffset="-60"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831"
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[7px] text-slate-300 font-bold">Sales</span>
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-1.5 text-[8px]">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span>Classic Pizzas (60%)</span>
        </div>
        <div className="flex items-center gap-1.5 text-[8px]">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
          <span>Supreme Pizzas (25%)</span>
        </div>
        <div className="flex items-center gap-1.5 text-[8px]">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-800" />
          <span>Others (15%)</span>
        </div>
      </div>
    </div>

    <div className="text-[7px] text-slate-500 text-right mt-1">Total revenue: $817.8K</div>
  </div>
);

const ChocolatePreview = () => (
  <div className="w-full h-full bg-stone-950 flex flex-col justify-between p-4 font-mono text-[10px] text-white">
    <div className="flex justify-between items-center border-b border-stone-850 pb-2">
      <span className="font-bold text-yellow-600">CHOCOLATE SALES REPORT</span>
      <span className="bg-yellow-600/20 text-yellow-600 px-1.5 py-0.5 rounded text-[8px]">EXCEL PIVOT</span>
    </div>

    <div className="my-2 space-y-2">
      <div className="bg-stone-900 border border-stone-800 rounded p-1.5 flex justify-between items-center">
        <span>Reporting Efficiency</span>
        <span className="font-bold text-emerald-400">+30% Speed</span>
      </div>

      <div className="border border-stone-800 rounded overflow-hidden">
        <table className="w-full text-left text-[7px]">
          <thead>
            <tr className="bg-stone-900 border-b border-stone-800 text-stone-400">
              <th className="p-1">Product</th>
              <th className="p-1">Target</th>
              <th className="p-1">Actual</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-stone-900">
              <td className="p-1">Dark Choc</td>
              <td className="p-1">$120K</td>
              <td className="p-1 text-emerald-400">$135K</td>
            </tr>
            <tr>
              <td className="p-1">Milk Choc</td>
              <td className="p-1">$150K</td>
              <td className="p-1 text-rose-500">$138K</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const GenericPreview = ({ title }) => (
  <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 flex flex-col justify-center items-center p-6 text-center">
    <div className="p-3 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 mb-2">
      <FaExternalLinkAlt size={24} className="animate-pulse" />
    </div>
    <span className="font-mono text-xs font-bold text-sky-400 uppercase tracking-widest">
      Data Project
    </span>
    <span className="text-sm font-semibold text-white mt-1 max-w-[200px] truncate">
      {title}
    </span>
  </div>
);

function ProjectCard({ project, onDelete, onImageClick, onCardClick }) {
  // Render suitable preview card
  const preview = useMemo(() => {
    if (project.image) {
      return (
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      );
    }
    
    switch (project.type) {
      case "instagram":
        return <InstagramPreview />;
      case "hr":
        return <HRPreview />;
      case "pizza":
        return <PizzaPreview />;
      case "chocolate":
        return <ChocolatePreview />;
      default:
        return <GenericPreview title={project.title} />;
    }
  }, [project.image, project.title, project.type]);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
      onClick={() => onCardClick && onCardClick(project)}
      className="group relative rounded-3xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-white/5 hover:border-sky-500/30 transition-all duration-300 hover:-translate-y-2 flex flex-col overflow-hidden shadow-sm hover:shadow-xl cursor-pointer"
    >
      {/* Delete button (only if not an initial project to avoid breaking original data) */}
      {onDelete && project.type === undefined && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(project.id);
          }}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-slate-900/80 hover:bg-rose-600 text-white transition-all shadow-md"
          aria-label="Delete project"
        >
          <FaTrash size={12} />
        </button>
      )}

      {/* Project Visual Area */}
      <div className="relative aspect-video w-full overflow-hidden border-b border-slate-200 dark:border-white/5">
        {preview}
        <div className="absolute inset-0 bg-slate-950/20 dark:bg-slate-950/45 group-hover:bg-slate-950/10 transition-colors duration-300 z-10" />
      </div>

      {/* Project Info */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white group-hover:text-sky-500 transition-colors duration-300">
            {project.title}
          </h3>
          
          <p className="text-slate-600 dark:text-slate-300 mt-3 leading-relaxed text-sm">
            {project.desc}
          </p>

          {/* Tech Stack tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {(project.stack || []).map((item) => (
              <span
                key={item}
                className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-slate-200/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 font-semibold"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Gallery Thumbnails (if screenshots exist) */}
        {project.screenshots && project.screenshots.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-white/5">
            <span className="text-[10px] uppercase font-mono text-slate-400 flex items-center gap-1 mb-2 font-bold">
              <FaImages /> Screenshots Gallery ({project.screenshots.length})
            </span>
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {project.screenshots.map((screen, idx) => (
                <button
                  key={idx}
                  onClick={(e) => {
                    e.stopPropagation();
                    onImageClick && onImageClick(project.screenshots, idx);
                  }}
                  className="w-12 h-10 rounded-lg overflow-hidden border border-slate-300 dark:border-white/10 flex-shrink-0 hover:border-sky-500 transition-colors"
                >
                  <img src={screen} alt={`Screenshot ${idx + 1}`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Actions Links */}
        <div className="mt-6 flex items-center justify-between gap-4 pt-4 border-t border-slate-200/50 dark:border-white/5">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
          >
            <FaGithub size={14} /> Github Repo
          </a>
          
          <a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 text-xs font-bold text-sky-500 hover:text-sky-400 transition-colors"
          >
            View Demo <FaExternalLinkAlt size={11} />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export default memo(ProjectCard);
