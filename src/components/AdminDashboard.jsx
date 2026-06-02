import { useState, useEffect } from "react";
import { usePortfolioSettings } from "../hooks/usePortfolioSettings";
import { useProjects } from "../hooks/useProjects";
import { useSkills } from "../hooks/useSkills";
import { useExperience } from "../hooks/useExperience";
import { useEducation } from "../hooks/useEducation";
import AddProjectModal from "./AddProjectModal";
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes, FaCog, FaChartBar, FaTasks, FaUpload } from "react-icons/fa";
import { saveCvToStorage } from "../hooks/useCvStorage";
import toast from "react-hot-toast";

export default function AdminDashboard({ isAdmin, onLogout }) {
  const { settings, updateSettings } = usePortfolioSettings();
  const { projects, addProject, deleteProject, editProject } = useProjects();
  const { skills, addSkill, editSkill, deleteSkill } = useSkills();
  const { experience, addExperience, editExperience, deleteExperience } = useExperience();
  const { education, addEducation, editEducation, deleteEducation } = useEducation();

  const [activeTab, setActiveTab] = useState("projects");

  // Portfolio form state
  const [portfolioName, setPortfolioName] = useState(settings.name);
  const [portfolioSubtitle, setPortfolioSubtitle] = useState(settings.subtitle);
  const [portfolioDescription, setPortfolioDescription] = useState(settings.description);
  const [cvFile, setCvFile] = useState(null);

  useEffect(() => {
    setPortfolioName(settings.name);
    setPortfolioSubtitle(settings.subtitle);
    setPortfolioDescription(settings.description);
  }, [settings]);

  
  // Projects State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Skills State
  const [skillName, setSkillName] = useState("");
  const [skillLevel, setSkillLevel] = useState(80);
  const [skillCategory, setSkillCategory] = useState("Analysis");
  const [editingSkillId, setEditingSkillId] = useState(null);

  if (!isAdmin) return null;

  // Open modal for editing project
  const handleEditProjectClick = (project) => {
    setEditingProject(project);
    setIsProjectModalOpen(true);
  };

  // Open modal for adding project
  const handleAddProjectClick = () => {
    setEditingProject(null);
    setIsProjectModalOpen(true);
  };

  // Save skill (adds or edits)
  const handleSkillSubmit = async (e) => {
    e.preventDefault();
    if (!skillName) return;

    try {
      if (editingSkillId) {
        await editSkill(editingSkillId, {
          name: skillName,
          level: Number(skillLevel),
          category: skillCategory,
        });
        setEditingSkillId(null);
      } else {
        await addSkill({
          name: skillName,
          level: Number(skillLevel),
          category: skillCategory,
        });
      }
      // Reset Skill Form
      setSkillName("");
      setSkillLevel(80);
      setSkillCategory("Analysis");
    } catch (err) {
      console.error("Skill operation failed:", err);
    }
  };

  // Click edit skill
  const handleEditSkillClick = (skill) => {
    setEditingSkillId(skill.id);
    setSkillName(skill.name);
    setSkillLevel(skill.level);
    setSkillCategory(skill.category);
  };

  const handleCancelSkillEdit = () => {
    setEditingSkillId(null);
    setSkillName("");
    setSkillLevel(80);
    setSkillCategory("Analysis");
  };

  // Handle portfolio settings save
  const handlePortfolioSubmit = async (e) => {
    e.preventDefault();
    if (cvFile) {
      try {
        await saveCvToStorage(cvFile);
        setCvFile(null);
      } catch (err) {
        console.error("CV upload failed:", err);
        toast.error(err.message || "CV upload failed");
      }
    }
    try {
      await updateSettings({
        name: portfolioName,
        subtitle: portfolioSubtitle,
        description: portfolioDescription,
      });
    } catch (err) {
      console.error("Settings update failed:", err);
    }
  };

  const handleAddProject = async (projectData) => {
    await addProject(projectData);
  };

  return (
    <section id="admin-dashboard" className="py-24 bg-slate-50 dark:bg-slate-900/30 border-b border-slate-200/50 dark:border-white/5 relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
          <div className="flex flex-col items-start text-left">
            <div className="flex items-center gap-2 text-sky-500 font-mono text-xs font-semibold uppercase tracking-wider mb-2">
              <FaCog className="animate-spin text-sm" /> Controls Console
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Admin Dashboard</h2>
            <div className="w-12 h-1 bg-sky-500 rounded-full mt-3" />
          </div>

          <button
            onClick={onLogout}
            className="px-5 py-2.5 rounded-xl border border-rose-500/30 hover:border-rose-500 text-rose-500 text-sm font-semibold transition-all duration-300"
          >
            Sign Out Dashboard
          </button>
        </div>

        {/* Dashboard Tabs */}
        <div className="flex gap-4 border-b border-slate-200 dark:border-white/5 mb-8">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 pb-4 text-sm font-bold border-b-2 transition-all ${
              activeTab === "projects"
                ? "border-sky-500 text-sky-500"
                : "border-transparent text-slate-550 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            <FaTasks size={14} /> Manage Projects
          </button>
          <button
            onClick={() => setActiveTab("skills")}
            className={`flex items-center gap-2 pb-4 text-sm font-bold border-b-2 transition-all ${
              activeTab === "skills"
                ? "border-sky-500 text-sky-500"
                : "border-transparent text-slate-550 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            <FaChartBar size={14} /> Manage Skills
          </button>
          <button
            onClick={() => setActiveTab("portfolio")}
            className={`flex items-center gap-2 pb-4 text-sm font-bold border-b-2 transition-all ${
              activeTab === "portfolio"
                ? "border-sky-500 text-sky-500"
                : "border-transparent text-slate-550 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            <FaCog size={14} /> Settings
          </button>
          <button
            onClick={() => setActiveTab("experience")}
            className={`flex items-center gap-2 pb-4 text-sm font-bold border-b-2 transition-all ${
              activeTab === "experience"
                ? "border-sky-500 text-sky-500"
                : "border-transparent text-slate-550 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            <FaTasks size={14} /> Experience
          </button>
          <button
            onClick={() => setActiveTab("education")}
            className={`flex items-center gap-2 pb-4 text-sm font-bold border-b-2 transition-all ${
              activeTab === "education"
                ? "border-sky-500 text-sky-500"
                : "border-transparent text-slate-550 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white"
            }`}
          >
            <FaTasks size={14} /> Education
          </button>
        </div>

        {/* Tab Content: Projects */}
        {activeTab === "portfolio" && (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Portfolio Settings</h3>
    <form onSubmit={handlePortfolioSubmit} className="grid gap-4 max-w-lg">
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Name</label>
        <input
          type="text"
          value={portfolioName}
          onChange={(e) => setPortfolioName(e.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white py-2 px-3"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Subtitle</label>
        <input
          type="text"
          value={portfolioSubtitle}
          onChange={(e) => setPortfolioSubtitle(e.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white py-2 px-3"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Description</label>
        <textarea
          value={portfolioDescription}
          onChange={(e) => setPortfolioDescription(e.target.value)}
          className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white py-2 px-3"
          rows={4}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Upload New CV (PDF)</label>
        <div className="mt-1 flex items-center gap-3">
          <label className="cursor-pointer flex items-center gap-2 px-4 py-2.5 bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 rounded-xl hover:bg-sky-500 hover:text-white transition-all text-xs font-semibold">
            <FaUpload />
            {cvFile ? cvFile.name : "Choose File"}
            <input 
              type="file" 
              accept=".pdf" 
              className="hidden" 
              onChange={(e) => {
                if (e.target.files[0]) {
                  setCvFile(e.target.files[0]);
                }
              }} 
            />
          </label>
          {cvFile && (
            <button 
              type="button" 
              onClick={() => setCvFile(null)}
              className="text-rose-500 hover:text-rose-600 text-xs font-semibold"
            >
              Clear
            </button>
          )}
        </div>
      </div>
      <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-500/20 text-[10px] text-sky-600 dark:text-sky-400 font-mono">
        يمكنك الآن رفع ملف CV مباشرة هنا!
      </div>
      <button type="submit" className="self-start px-4 py-2 rounded-xl bg-sky-500 text-white hover:bg-sky-400 transition-colors">
        Save Settings
      </button>
    </form>
  </div>
)}
{activeTab === "experience" && (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Experience Management</h3>
    <button 
      onClick={() => addExperience({ role: "New Role", company: "Company", duration: "Jan 2026 - Present", points: ["Point 1"] })}
      className="px-4 py-2 bg-sky-500 text-white rounded-xl mb-4"
    >
      + Quick Add Blank Experience
    </button>
    <div className="grid gap-4">
      {experience.map(exp => (
        <div key={exp.id} className="p-4 border rounded-xl dark:border-slate-700 space-y-2">
          <input className="block w-full border p-2 rounded dark:bg-slate-800" value={exp.role} onChange={e => editExperience({id: exp.id, updatedData: {role: e.target.value}})} placeholder="Role" />
          <input className="block w-full border p-2 rounded dark:bg-slate-800" value={exp.company} onChange={e => editExperience({id: exp.id, updatedData: {company: e.target.value}})} placeholder="Company" />
          <input className="block w-full border p-2 rounded dark:bg-slate-800" value={exp.duration} onChange={e => editExperience({id: exp.id, updatedData: {duration: e.target.value}})} placeholder="Duration" />
          <button onClick={() => deleteExperience(exp.id)} className="text-rose-500 text-sm">Delete</button>
        </div>
      ))}
    </div>
  </div>
)}
{activeTab === "education" && (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Education Management</h3>
    <button 
      onClick={() => addEducation({ school: "University", degree: "Degree", year: "2026", tags: [] })}
      className="px-4 py-2 bg-sky-500 text-white rounded-xl mb-4"
    >
      + Quick Add Blank Education
    </button>
    <div className="grid gap-4">
      {education.map(edu => (
        <div key={edu.id} className="p-4 border rounded-xl dark:border-slate-700 space-y-2">
          <input className="block w-full border p-2 rounded dark:bg-slate-800" value={edu.school} onChange={e => editEducation({id: edu.id, updatedData: {school: e.target.value}})} placeholder="School" />
          <input className="block w-full border p-2 rounded dark:bg-slate-800" value={edu.degree} onChange={e => editEducation({id: edu.id, updatedData: {degree: e.target.value}})} placeholder="Degree" />
          <input className="block w-full border p-2 rounded dark:bg-slate-800" value={edu.year} onChange={e => editEducation({id: edu.id, updatedData: {year: e.target.value}})} placeholder="Year" />
          <button onClick={() => deleteEducation(edu.id)} className="text-rose-500 text-sm">Delete</button>
        </div>
      ))}
    </div>
  </div>
)}
{activeTab === "projects" && (

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold font-mono text-slate-500 dark:text-slate-400">
                Total Projects: {projects.length}
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddProjectClick}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-sm font-bold shadow-glow hover:shadow-sky-500/20 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <FaPlus size={12} /> Add Project
                </button>
              </div>
            </div>

            {/* Projects Table */}
            <div className="border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-950 text-slate-500 dark:text-slate-500 border-b border-slate-200 dark:border-white/5 font-semibold text-xs uppercase tracking-wider">
                      <th className="p-4">Cover</th>
                      <th className="p-4">Title</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Technologies</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => (
                      <tr
                        key={project.id}
                        className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-100/50 dark:hover:bg-slate-950/20 transition-colors"
                      >
                        <td className="p-4">
                          <div className="w-16 h-10 rounded overflow-hidden bg-slate-800 border border-slate-700">
                            {project.image ? (
                              <img
                                src={project.image}
                                alt={project.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[8px] text-slate-500 font-mono">
                                SVG-PREVIEW
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="p-4 font-bold text-slate-800 dark:text-white">
                          {project.title}
                        </td>
                        <td className="p-4 text-xs font-semibold text-sky-500">
                          {project.category || project.type || "Analyst project"}
                        </td>
                        <td className="p-4">
                          <div className="flex flex-wrap gap-1">
                            {(project.stack || []).slice(0, 3).map((item) => (
                              <span
                                key={item}
                                className="text-[10px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-mono"
                              >
                                {item}
                              </span>
                            ))}
                            {(project.stack || []).length > 3 && (
                              <span className="text-[10px] text-slate-400">
                                +{(project.stack || []).length - 3}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEditProjectClick(project)}
                              className="p-2 rounded-lg bg-sky-500/10 text-sky-500 hover:bg-sky-500 hover:text-white transition-all"
                              aria-label="Edit project"
                            >
                              <FaEdit size={12} />
                            </button>
                            <button
                              onClick={async () => {
                                if (confirm("Are you sure you want to delete this project?")) {
                                  await deleteProject(project.id);
                                }
                              }}
                              className="p-2 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                              aria-label="Delete project"
                            >
                              <FaTrash size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Skills */}
        {activeTab === "skills" && (
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {/* Form Skill Add/Edit */}
            <form
              onSubmit={handleSkillSubmit}
              className="p-6 rounded-2xl bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-white/5 space-y-4 hover:border-sky-500/30 transition-all shadow-sm"
            >
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                {editingSkillId ? "Edit Skill Details" : "Create New Skill"}
              </h3>

              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">
                  Skill Name
                </label>
                <input
                  type="text"
                  required
                  value={skillName}
                  onChange={(e) => setSkillName(e.target.value)}
                  placeholder="e.g. Power BI, SQL, Python"
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-sky-500 outline-none text-sm transition-colors text-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">
                  Skill Category
                </label>
                <select
                  value={skillCategory}
                  onChange={(e) => setSkillCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 focus:border-sky-500 outline-none text-sm transition-colors text-slate-800 dark:text-white"
                >
                  <option value="Analysis">Analysis</option>
                  <option value="Visualization">Visualization</option>
                  <option value="Database">Database</option>
                  <option value="Programming">Programming</option>
                  <option value="Data Management">Data Management</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
                    Competency Percentage
                  </label>
                  <span className="text-xs font-mono font-bold text-sky-500">{skillLevel}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={skillLevel}
                  onChange={(e) => setSkillLevel(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <FaSave size={12} /> {editingSkillId ? "Save Changes" : "Add Skill"}
                </button>
                {editingSkillId && (
                  <button
                    type="button"
                    onClick={handleCancelSkillEdit}
                    className="p-3 rounded-xl border border-slate-300 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm transition-all"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </form>

            {/* Skills List Table */}
            <div className="md:col-span-2 border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-950 text-slate-500 dark:text-slate-500 border-b border-slate-200 dark:border-white/5 font-semibold text-xs uppercase tracking-wider">
                      <th className="p-4">Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Level</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skills.map((skill) => (
                      <tr
                        key={skill.id}
                        className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-100/50 dark:hover:bg-slate-950/20 transition-colors"
                      >
                        <td className="p-4 font-bold text-slate-800 dark:text-white">
                          {skill.name}
                        </td>
                        <td className="p-4">
                          <span className="text-xs px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-500 font-semibold font-mono">
                            {skill.category}
                          </span>
                        </td>
                        <td className="p-4 font-mono font-bold text-slate-600 dark:text-slate-400">
                          {skill.level}%
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => handleEditSkillClick(skill)}
                              className="p-2 rounded-lg bg-sky-500/10 text-sky-500 hover:bg-sky-500 hover:text-white transition-all"
                              aria-label="Edit skill"
                            >
                              <FaEdit size={12} />
                            </button>
                            <button
                              onClick={async () => {
                                if (confirm("Are you sure you want to delete this skill?")) {
                                  await deleteSkill(skill.id);
                                }
                              }}
                              className="p-2 rounded-lg bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all"
                              aria-label="Delete skill"
                            >
                              <FaTrash size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Project Modal */}
      <AddProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        projectToEdit={editingProject}
        onAdd={handleAddProject}
        onEdit={async (id, data) => {
          await editProject(id, data);
        }}
      />
    </section>
  );
}
