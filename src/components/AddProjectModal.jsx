import { useState, useEffect } from "react";
import { FaTimes, FaPlus, FaSpinner, FaCloudUploadAlt, FaSave } from "react-icons/fa";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../lib/firebase";

// Compress image to max 800x600 JPEG at 70% quality to save localStorage space
const compressImage = (file) =>
  new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const MAX_W = 800;
      const MAX_H = 600;
      let { width, height } = img;
      if (width > MAX_W) { height = Math.round((height * MAX_W) / width); width = MAX_W; }
      if (height > MAX_H) { width = Math.round((width * MAX_H) / height); height = MAX_H; }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.7));
    };
    img.onerror = () => { URL.revokeObjectURL(url); resolve(""); };
    img.src = url;
  });

const getUploadErrorMessage = (error) => {
  if (error?.code === "storage/unauthorized") {
    return "You do not have permission to upload project images. Confirm your admin UID is allowed in storage.rules.";
  }

  if (error?.code === "storage/bucket-not-found" || error?.code === "storage/unknown") {
    return "Firebase Storage is not configured. Enable Storage in Firebase Console, then deploy storage.rules.";
  }

  return error?.message || "Failed to upload images or save project.";
};

export default function AddProjectModal({ isOpen, onClose, onAdd, onEdit, projectToEdit }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [stackInput, setStackInput] = useState("");
  const [github, setGithub] = useState("");
  const [link, setLink] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(false);

  const isEditMode = !!projectToEdit;

  useEffect(() => {
    if (projectToEdit) {
      setTitle(projectToEdit.title || "");
      setDesc(projectToEdit.desc || "");
      setStackInput(projectToEdit.stack ? projectToEdit.stack.join(", ") : "");
      setGithub(projectToEdit.github || "");
      setLink(projectToEdit.link || "");
      setCategory(projectToEdit.category || "");
      setImage(projectToEdit.image || "");
      setScreenshots(projectToEdit.screenshots || []);
    } else {
      setTitle("");
      setDesc("");
      setStackInput("");
      setGithub("");
      setLink("");
      setCategory("");
      setImage("");
      setScreenshots([]);
    }
  }, [projectToEdit, isOpen]);

  if (!isOpen) return null;

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const compressed = await compressImage(file);
      setImage(compressed);
    }
  };

  const handleScreenshotsUpload = async (e) => {
    const files = Array.from(e.target.files);
    const results = await Promise.all(files.map(compressImage));
    setScreenshots((prev) => [...prev, ...results.filter(Boolean)]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !desc || !github || !link) {
      alert("Please fill in all required fields!");
      return;
    }

    setLoading(true);

    try {
      let finalImage = image;
      if (image && image.startsWith("data:image")) {
        const imageRef = ref(storage, `projects/${Date.now()}_cover.jpg`);
        await uploadString(imageRef, image, 'data_url');
        finalImage = await getDownloadURL(imageRef);
      }

      const finalScreenshots = await Promise.all(screenshots.map(async (s, index) => {
        if (s && s.startsWith("data:image")) {
          const sRef = ref(storage, `projects/${Date.now()}_screenshot_${index}.jpg`);
          await uploadString(sRef, s, 'data_url');
          return await getDownloadURL(sRef);
        }
        return s;
      }));

      const projectData = {
        title,
        desc,
        stack: stackInput.split(",").map((s) => s.trim()).filter((s) => s !== ""),
        github,
        link,
        category,
        image: finalImage,
        screenshots: finalScreenshots,
      };

      if (isEditMode) {
        await onEdit(projectToEdit.id, projectData);
      } else {
        await onAdd(projectData);
      }
      onClose();
    } catch (err) {
      console.error("Upload error:", err);
      alert(getUploadErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          aria-label="Close modal"
        >
          <FaTimes size={18} />
        </button>

        <h3 className="text-2xl font-black text-slate-800 dark:text-white mb-6">
          {isEditMode ? "Edit Project Details" : "Add New Project"}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Images Upload */}
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Cover image */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">
                Project Cover Image
              </label>
              <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-4 hover:border-sky-500 transition-colors bg-slate-50 dark:bg-slate-950">
                {image ? (
                  <div className="w-full aspect-video rounded-xl overflow-hidden relative">
                    <img src={image} alt="Cover preview" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setImage("")}
                      className="absolute top-2 right-2 px-2 py-1 rounded bg-slate-950/80 text-white text-[10px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <FaCloudUploadAlt size={28} className="text-slate-400 mb-2" />
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Click to upload cover photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </>
                )}
              </div>
            </div>

            {/* Screenshots */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">
                Screenshots Gallery
              </label>
              <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-2xl p-4 hover:border-sky-500 transition-colors bg-slate-50 dark:bg-slate-950 min-h-[105px]">
                <FaCloudUploadAlt size={28} className="text-slate-400 mb-2" />
                <span className="text-[10px] text-slate-500 dark:text-slate-400">
                  {screenshots.length > 0
                    ? `${screenshots.length} screenshot(s) ready`
                    : "Upload multiple screenshots"}
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleScreenshotsUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </div>
              
              {/* Screenshots display */}
              {screenshots.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 max-h-16 overflow-y-auto">
                  {screenshots.map((s, i) => (
                    <div key={i} className="relative w-10 h-8 rounded border border-slate-300 dark:border-white/10 overflow-hidden">
                      <img src={s} alt={`Thumb ${i}`} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setScreenshots((prev) => prev.filter((_, idx) => idx !== i))}
                        className="absolute inset-0 bg-rose-600/95 text-white text-[8px] font-bold flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                      >
                        Del
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">
                Project Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Sales BI Dashboard"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-sky-500 outline-none transition-colors text-sm text-slate-800 dark:text-white"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">
                Category/Tags
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="e.g. Finance, Marketing, HR"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-sky-500 outline-none transition-colors text-sm text-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-1 gap-4">
            {/* Technologies */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">
                Technologies Used (comma-separated)
              </label>
              <input
                type="text"
                value={stackInput}
                onChange={(e) => setStackInput(e.target.value)}
                placeholder="e.g. Power BI, DAX, SQL, Excel"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-sky-500 outline-none transition-colors text-sm text-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">
              Full Project Description <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows="4"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Provide a comprehensive summary of project goals, processes, metrics analyzed, and business outcomes."
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-sky-500 outline-none transition-colors text-sm resize-none text-slate-800 dark:text-white"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* GitHub URL */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">
                GitHub Repository URL <span className="text-rose-500">*</span>
              </label>
              <input
                type="url"
                required
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-sky-500 outline-none transition-colors text-sm text-slate-800 dark:text-white"
              />
            </div>

            {/* Live Demo URL */}
            <div>
              <label className="block text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">
                Live Demo / Article URL <span className="text-rose-500">*</span>
              </label>
              <input
                type="url"
                required
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://linkedin.com/... or https://..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-sky-500 outline-none transition-colors text-sm text-slate-800 dark:text-white"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold shadow-lg hover:shadow-sky-500/25 transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-70"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" /> Saving Changes...
                </>
              ) : isEditMode ? (
                <>
                  <FaSave /> Save Project Changes
                </>
              ) : (
                <>
                  <FaPlus /> Add Project to Portfolio
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
