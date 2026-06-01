import { useState } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ImageGalleryModal({ isOpen, images, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);

  if (!isOpen || !images || images.length === 0) return null;

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center p-4 bg-slate-950/95 backdrop-blur-md"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-all z-[130]"
        aria-label="Close Lightbox"
      >
        <FaTimes size={18} />
      </button>

      {/* Main Image Slider Frame */}
      <div className="relative w-full max-w-4xl aspect-[16/10] max-h-[80vh] flex items-center justify-center select-none" onClick={(e) => e.stopPropagation()}>
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-4 p-3 rounded-full bg-slate-900/80 text-white hover:bg-sky-500 transition-colors z-[130] shadow-md border border-white/5"
            aria-label="Previous image"
          >
            <FaChevronLeft size={20} />
          </button>
        )}

        <img
          src={images[currentIndex]}
          alt={`Screenshot preview ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl border border-white/5"
        />

        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-4 p-3 rounded-full bg-slate-900/80 text-white hover:bg-sky-500 transition-colors z-[130] shadow-md border border-white/5"
            aria-label="Next image"
          >
            <FaChevronRight size={20} />
          </button>
        )}
      </div>

      {/* Indicators */}
      {images.length > 1 && (
        <div className="mt-4 flex gap-2 justify-center z-[130]">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === idx ? "bg-sky-500 w-6" : "bg-slate-600"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
