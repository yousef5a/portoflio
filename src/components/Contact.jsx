import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope, FaChevronRight } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { useRef, useState } from "react";

export default function Contact() {
  const formRef = useRef();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setSent(true);
      formRef.current.reset();
    } catch (err) {
      console.error(err);
      setError("حدث خطأ، حاول مرة أخرى لاحقاً.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-start text-left mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Get in Touch</h2>
          <div className="w-12 h-1 bg-sky-500 rounded-full mt-3" />
          <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl text-sm md:text-base">
            Open to data analyst opportunities, internships, and data-focused collaborations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="p-8 rounded-3xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-white/5 space-y-4 hover:border-sky-500/30 transition-all duration-300 shadow-sm hover:shadow-md"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">
                Your Name
              </label>
              <input
                type="text"
                required
                name="from_name"
                placeholder="Mohamed Ahmed"
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-sky-500 outline-none text-sm transition-colors text-slate-800 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">
                Your Email Address
              </label>
              <input
                type="email"
                required
                name="from_email"
                placeholder="name@company.com"
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-sky-500 outline-none text-sm transition-colors text-slate-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">
                Message Detail
              </label>
              <textarea
                rows="4"
                required
                name="message"
                placeholder="Tell me about your business challenge or opportunity..."
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-sky-500 outline-none text-sm transition-colors resize-none text-slate-800 dark:text-white"
              />
            </div>

            {error && (
              <p className="text-rose-500 text-xs text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={sending || sent}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold shadow-lg hover:shadow-sky-500/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 text-sm disabled:opacity-75"
            >
              {sending ? "جاري الإرسال..." : sent ? "✓ تم الإرسال بنجاح" : <>Send Message <FaChevronRight className="text-xs" /></>}
            </button>
          </motion.form>

          {/* Details */}
          <motion.div
            className="p-8 rounded-3xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-white/5 space-y-6 hover:border-sky-500/30 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between h-full min-h-[300px]"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
                Let's discuss raw data.
              </h3>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
                Feel free to reach out directly through the email, call me for quick questions, or check my analytics showcase on LinkedIn and GitHub. Let's build dashboards that make operational impacts.
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-white/5">
              <a
                href="https://www.linkedin.com/in/mohamed-esam-khodary-84647a27b/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
              >
                <FaLinkedin size={18} /> LinkedIn Profile
              </a>
              <a
                href="https://github.com/mohamedesam204"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
              >
                <FaGithub size={18} /> GitHub Repositories
              </a>
              <a
                href="mailto:mohamedesamkhodary@gmail.com"
                className="flex items-center gap-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors"
              >
                <FaEnvelope size={18} /> mohamedesamkhodary@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
