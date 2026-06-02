import { memo, useCallback, useMemo, useState } from "react";
import { useProjects } from "../hooks/useProjects";
import ProjectCard from "./ProjectCard";
import AddProjectModal from "./AddProjectModal";
import ImageGalleryModal from "./ImageGalleryModal";
import ProjectDetailsModal from "./ProjectDetailsModal";

import { FaPlus, FaSearch } from "react-icons/fa";
import Spinner from "./Spinner";

function Projects({ isAdmin }) {
  const { projects, addProject, loading } = useProjects();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTech, setSelectedTech] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDetailsProject, setSelectedDetailsProject] = useState(null);
  const [galleryState, setGalleryState] = useState({ isOpen: false, images: [], index: 0 });


  const handleAddProject = useCallback(async (projectData) => {
    const result = await addProject(projectData);
    if (result && !result.success) {
      alert(result.message);
      return;
    }
    setIsAddModalOpen(false);
  }, [addProject]);

  // Get all unique technologies across all projects
  const allTechs = useMemo(
    () => ["All", ...new Set(projects.flatMap((p) => p.stack || []))],
    [projects]
  );

  // Filter projects by search and tech filter
  const filteredProjects = useMemo(
    () => projects.filter((project) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        (project.title || "").toLowerCase().includes(query) ||
        (project.desc || "").toLowerCase().includes(query);
      const matchesTech = selectedTech === "All" || project.stack?.includes(selectedTech);
      return matchesSearch && matchesTech;
    }),
    [projects, searchQuery, selectedTech]
  );

  const handleImageClick = useCallback((images, index) => {
    setGalleryState({ isOpen: true, images, index });
  }, []);

  return (
    <section id="projects" className="py-24 border-b border-slate-200/50 dark:border-white/5 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="flex flex-col items-start text-left">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Portfolio Projects</h2>
            <div className="w-12 h-1 bg-sky-500 rounded-full mt-3" />
            <p className="mt-4 text-slate-500 dark:text-slate-400 max-w-2xl text-sm md:text-base">
              Explore my database querying, BI visualizations, and analytical dashboards.
            </p>
          </div>
          
          {/* Add Project Button (Only shown if logged in as Admin) */}
          {isAdmin && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm font-bold shadow-glow hover:shadow-sky-500/20 hover:-translate-y-0.5 transition-all duration-300"
            >
              <FaPlus size={12} /> Add Project
            </button>
          )}
        </div>

        {/* Filters and Search toolbar */}
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-10">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-white/10 focus:border-sky-500 outline-none text-sm transition-colors text-slate-800 dark:text-white"
            />
          </div>

          {/* Tech Filters List */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none max-w-full">
            {allTechs.slice(0, 7).map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTech(tech)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap border transition-all duration-300 ${
                  selectedTech === tech
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white shadow-md"
                    : "bg-white/50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/5 hover:border-sky-500/50"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onImageClick={handleImageClick}
                onCardClick={setSelectedDetailsProject}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center border border-dashed border-slate-300 dark:border-slate-800 rounded-3xl bg-slate-50 dark:bg-slate-900/10">
            <p className="text-slate-400 dark:text-slate-500 text-sm">
              No projects found matching the criteria. Try a different query.
            </p>
          </div>
        )}
      </div>
       {loading && <Spinner />}

      {/* Add Project Modal */}
      <AddProjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddProject}
      />

      {/* Lightbox Modal */}
      <ImageGalleryModal
        isOpen={galleryState.isOpen}
        images={galleryState.images}
        initialIndex={galleryState.index}
        onClose={() => setGalleryState({ isOpen: false, images: [], index: 0 })}
      />

      {/* Project Details Modal */}
      <ProjectDetailsModal
        isOpen={!!selectedDetailsProject}
        project={selectedDetailsProject}
        onClose={() => setSelectedDetailsProject(null)}
      />
    </section>
  );
}

export default memo(Projects);
