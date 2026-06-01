import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [loadingText, setLoadingText] = useState("Initializing systems...");
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const texts = [
      "Connecting to data source...",
      "Executing SQL queries...",
      "Loading dashboards...",
      "Optimizing visualization matrices...",
      "Ready!"
    ];

    let textIdx = 0;
    const textInterval = setInterval(() => {
      if (textIdx < texts.length - 1) {
        textIdx++;
        setLoadingText(texts[textIdx]);
      }
    }, 400);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setVisible(false), 200);
          return 100;
        }
        return prev + 5;
      });
    }, 80);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-950 text-white font-mono"
        >
          <div className="w-80 px-4">
            <div className="flex justify-between items-center mb-2 text-xs text-sky-400">
              <span>MOHAMED_PORTFOLIO_V2</span>
              <span>{progress}%</span>
            </div>
            
            {/* Progress bar container */}
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700">
              <motion.div 
                className="h-full bg-gradient-to-r from-sky-500 to-indigo-500" 
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
              <span className="animate-pulse">{loadingText}</span>
              <span className="text-[9px] text-slate-500">COM-4</span>
            </div>
          </div>
          
          {/* Subtle background matrix layout */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden font-mono text-[10px] leading-3 flex flex-wrap gap-2 p-4">
            {Array.from({ length: 150 }).map((_, i) => (
              <span key={i}>
                {Math.random().toString(36).substring(2, 8).toUpperCase()}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
