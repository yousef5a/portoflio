import { motion } from "framer-motion";
import { useMemo } from "react";
import { FaDownload, FaLinkedin, FaGithub, FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { usePortfolioSettings } from "../hooks/usePortfolioSettings";

export default function Hero() {
  const { settings } = usePortfolioSettings();
  const cvDownloadUrl = useMemo(() => {
    if (!settings.cvUrl) return "#";
    if (!settings.cvUpdatedAt) return settings.cvUrl;
    const separator = settings.cvUrl.includes("?") ? "&" : "?";
    return `${settings.cvUrl}${separator}v=${settings.cvUpdatedAt}`;
  }, [settings.cvUpdatedAt, settings.cvUrl]);

  return (
    <section id="home" className="relative min-h-[calc(100vh-80px)] flex items-center py-20 overflow-hidden">
      {/* Background decoration elements */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-sky-500/10 dark:bg-sky-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] dark:[mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_60%,transparent_100%)]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Content */}
        <motion.div
          className="md:col-span-7 flex flex-col items-start text-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 font-mono text-xs font-semibold mb-6 border border-sky-500/20">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
            Available for Opportunities
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
            {settings.name}
            <span className="block mt-1 bg-gradient-to-r from-sky-500 via-sky-400 to-indigo-500 bg-clip-text text-transparent">
              {settings.subtitle}
            </span>
          </h1>

          <p className="mt-2 text-base text-slate-500 dark:text-slate-400 font-mono">
            // Bridging business and customer data insights.
          </p>

          <p className="mt-6 text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
            {settings.description}
          </p>

          {/* Social Links */}
          <div className="flex gap-4 mt-6">
            <a href="https://www.linkedin.com/in/mohamed-esam-khodary-84647a27b/" target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 hover:border-sky-500/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300" aria-label="LinkedIn">
              <FaLinkedin size={20} />
            </a>
            <a href="https://github.com/mohamedesam204" target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 hover:border-sky-500/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300" aria-label="GitHub">
              <FaGithub size={20} />
            </a>
            <a href="mailto:mohamedesamkhodary@gmail.com" className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 hover:border-sky-500/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300" aria-label="Email">
              <FaEnvelope size={20} />
            </a>
            <a href="https://wa.me/qr/PG6E6PHVJVNIN1" target="_blank" rel="noreferrer" className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 hover:border-sky-500/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300" aria-label="WhatsApp">
              <FaWhatsapp size={20} />
            </a>
          </div>

          <div className="mt-8 flex flex-wrap gap-4 w-full sm:w-auto">
            <a href="#projects" className="w-full sm:w-auto text-center px-8 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-semibold shadow-glow hover:shadow-sky-500/40 hover:-translate-y-0.5 transition-all duration-300">
              View Projects
            </a>
            <a href={cvDownloadUrl} download="Mohamed_Esam_CV.pdf" className="w-full sm:w-auto text-center px-8 py-3.5 rounded-xl bg-white dark:bg-slate-900 text-slate-800 dark:text-white font-semibold border border-slate-200 dark:border-white/10 hover:border-sky-500 dark:hover:border-sky-500 hover:text-sky-500 dark:hover:text-sky-400 inline-flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all duration-300">
              <FaDownload className="text-xs" />
              Download CV
            </a>
          </div>
        </motion.div>

        {/* Right Visual Image */}
        <motion.div
          className="md:col-span-5 flex justify-center relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-sky-500 to-indigo-500 rounded-[2.5rem] rotate-6 opacity-20 blur-xl scale-95" />
          <div className="relative group w-72 sm:w-80 md:w-full max-w-[360px] aspect-[1/1.3] bg-slate-200 dark:bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border border-slate-300/50 dark:border-white/10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-100/10 to-slate-950/20 dark:to-slate-950/60 z-10" />
            <img src="/profile.png" alt={settings.name} decoding="async" className="w-full h-full object-cover rounded-[2rem] relative z-0 transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute bottom-6 left-6 right-6 z-20 backdrop-blur-md bg-white/70 dark:bg-slate-950/70 border border-white/20 dark:border-white/5 p-4 rounded-2xl shadow-xl flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wider font-mono text-slate-500 dark:text-slate-400">Primary Domain</div>
                <div className="text-sm font-bold text-slate-800 dark:text-white">Business Intelligence</div>
              </div>
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
            </div>
            <div className="absolute top-6 right-6 z-20 backdrop-blur-md bg-sky-500/80 text-white px-3.5 py-1.5 rounded-full text-xs font-mono font-bold shadow-lg border border-sky-400/20">
              DAX &amp; SQL
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
