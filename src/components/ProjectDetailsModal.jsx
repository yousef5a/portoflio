import { useState } from "react";
import { FaTimes, FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ProjectDetailsModal({ isOpen, project, onClose }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!isOpen || !project) return null;

  // Gather images (cover image + optional screenshots)
  const images = [];
  if (project.image) {
    images.push(project.image);
  }
  if (project.screenshots && project.screenshots.length > 0) {
    images.push(...project.screenshots);
  }

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl bg-slate-900/60 hover:bg-slate-950 text-white hover:text-white transition-all z-50 shadow-md"
          aria-label="Close details"
        >
          <FaTimes size={16} />
        </button>

        {/* Dynamic Image Carousel Slider (if cover or screenshots are available) */}
        {images.length > 0 && (
          <div className="relative w-full aspect-[21/9] min-h-[220px] bg-slate-100 dark:bg-slate-950 flex items-center justify-center border-b border-slate-200 dark:border-white/5 group">
            <img
              src={images[currentSlide]}
              alt={`${project.title} - view ${currentSlide + 1}`}
              className="w-full h-full object-contain max-h-[40vh]"
            />
            <div className="absolute inset-0 bg-slate-950/20 pointer-events-none" />

            {/* Slider arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-4 p-2.5 rounded-full bg-slate-900/80 text-white hover:bg-sky-500 transition-colors shadow-md opacity-0 group-hover:opacity-100 duration-300"
                  aria-label="Previous Slide"
                >
                  <FaChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 p-2.5 rounded-full bg-slate-900/80 text-white hover:bg-sky-500 transition-colors shadow-md opacity-0 group-hover:opacity-100 duration-300"
                  aria-label="Next Slide"
                >
                  <FaChevronRight size={16} />
                </button>

                {/* Bullets */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        currentSlide === idx ? "bg-sky-500 w-4" : "bg-white/60 hover:bg-white"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Details Content (Scrollable) */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-sky-500 font-bold bg-sky-500/10 px-2.5 py-1 rounded-lg">
                Selected Work
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white mt-2">
                {project.title}
              </h2>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 hover:border-sky-500/50 hover:text-sky-500 text-xs font-bold inline-flex items-center gap-2 transition-all duration-300"
              >
                <FaGithub size={14} /> Repository
              </a>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-bold inline-flex items-center gap-2 shadow-glow hover:shadow-sky-500/20 transition-all duration-300"
              >
                Live Demo <FaExternalLinkAlt size={11} />
              </a>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-mono font-bold text-slate-500 dark:text-slate-400">
              Project Description
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {project.desc}
            </p>
          </div>

          {/* Stack Used Section */}
          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-white/5">
            <h4 className="text-xs uppercase font-mono font-bold text-slate-500 dark:text-slate-400">
              Technologies & Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="text-xs px-3 py-1.5 rounded-xl bg-slate-200/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 font-mono font-semibold"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
