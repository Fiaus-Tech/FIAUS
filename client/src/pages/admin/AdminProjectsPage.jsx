import React, { useState, useEffect } from 'react';
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  reorderProjects,
  uploadFile
} from '../../services/api';
import {
  Briefcase,
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  Github,
  Check,
  X,
  Sparkles,
  Upload,
  Image
} from 'lucide-react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await fetchProjects({ all: true });
      if (res.success && res.data) {
        setProjects(res.data);
      }
    } catch (e) {
      console.error('Failed to fetch projects', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleMove = async (index, direction) => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= projects.length) return;

    const newProjects = [...projects];
    const temp = newProjects[index];
    newProjects[index] = newProjects[targetIndex];
    newProjects[targetIndex] = temp;

    setProjects(newProjects);

    try {
      await reorderProjects(newProjects.map((p) => p._id));
    } catch (e) {
      alert('Failed to reorder projects');
      loadProjects();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (e) {
      alert('Delete failed: ' + e.message);
    }
  };

  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingCover(true);
    try {
      const res = await uploadFile(file, 'projects');
      const coverUrl = res?.data?.url || res?.url || (res?.data && typeof res.data === 'string' ? res.data : null);
      if (coverUrl) {
        setEditingProject((prev) => ({ ...prev, coverImage: coverUrl }));
      } else {
        alert('Image uploaded but no URL was returned');
      }
    } catch (err) {
      alert('Cover upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploadingCover(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (isNew) {
        await createProject(editingProject);
      } else {
        await updateProject(editingProject._id, editingProject);
      }
      setEditingProject(null);
      setIsNew(false);
      loadProjects();
    } catch (err) {
      alert('Save failed: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Case Studies & Projects Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Reorder, edit, and publish project showcases. Project numbers (01, 02...) update automatically.
          </p>
        </div>

        <button
          onClick={() => {
            setIsNew(true);
            setEditingProject({
              title: '',
              titleAr: '',
              slug: '',
              category: 'Web Engineering',
              categoryAr: '',
              projectType: 'Production Web Application',
              shortDescription: '',
              shortDescriptionAr: '',
              fullDescription: '',
              fullDescriptionAr: '',
              technologies: ['React', 'Node.js', 'Tailwind CSS'],
              features: ['High Performance', 'Responsive Architecture'],
              coverImage: 'https://res.cloudinary.com/n5yq0whs/image/upload/v1789044884/FIAUS/projects/p1/main.png',
              githubUrl: '',
              liveUrl: '',
              featured: true,
              status: 'published'
            });
          }}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-xs self-start"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        {loading ? (
          <div className="py-12 text-center text-xs text-slate-500">Loading projects...</div>
        ) : (
          projects.map((proj, index) => {
            const num = String(index + 1).padStart(2, '0');
            return (
              <div
                key={proj._id}
                className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 truncate">
                  <div className="w-16 h-12 rounded-lg bg-slate-900 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-800">
                    <img
                      src={proj.coverImage}
                      alt={proj.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-brand-600 dark:text-brand-400">
                        0{index + 1}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {proj.title}
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-400">
                        {proj.category}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {proj.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {/* Order buttons */}
                  <button
                    disabled={index === 0}
                    onClick={() => handleMove(index, 'up')}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30"
                    title="Move Up"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={index === projects.length - 1}
                    onClick={() => handleMove(index, 'down')}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white disabled:opacity-30"
                    title="Move Down"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      setIsNew(false);
                      setEditingProject(proj);
                    }}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800"
                    title="Edit Project"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDelete(proj._id)}
                    className="p-1.5 rounded-lg border border-red-200 dark:border-red-900/60 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Edit/Create Modal Drawer */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 my-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {isNew ? 'Create New Project' : `Edit Project: ${editingProject.title}`}
              </h2>
              <button
                onClick={() => setEditingProject(null)}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Title (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Title (Arabic)
                  </label>
                  <input
                    type="text"
                    value={editingProject.titleAr || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, titleAr: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Slug *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.slug || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Category *
                  </label>
                  <select
                    value={editingProject.category || 'Web Engineering'}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                  >
                    <option value="Web Engineering">Web Engineering</option>
                    <option value="Full-Stack & Cloud">Full-Stack & Cloud</option>
                    <option value="AI & Intelligent Automation">AI & Intelligent Automation</option>
                    <option value="Cybersecurity & Tools">Cybersecurity & Tools</option>
                    <option value="E-Commerce & Retail">E-Commerce & Retail</option>
                    <option value="Brand Experience & Hospitality">Brand Experience & Hospitality</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Live Demo URL
                  </label>
                  <input
                    type="text"
                    value={editingProject.liveUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                    placeholder="https://example.vercel.app (Leave empty if in dev)"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    GitHub URL
                  </label>
                  <input
                    type="text"
                    value={editingProject.githubUrl || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                    placeholder="https://github.com/fahad1420/..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                  />
                </div>
              </div>

              {/* Cover Image Upload & Preview */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1.5">
                  Project Cover Image (Cloudinary FIAUS/projects) *
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-16 rounded-xl overflow-hidden border-2 border-brand-500/30 bg-slate-100 dark:bg-navy-850 shrink-0">
                    {editingProject.coverImage ? (
                      <img
                        src={editingProject.coverImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = 'https://res.cloudinary.com/n5yq0whs/image/upload/v1789044884/FIAUS/projects/p1/main.png'; }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <Image className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 flex-1">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-brand-600 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 cursor-pointer hover:bg-brand-100 transition-colors">
                      <Upload className="w-3.5 h-3.5" />
                      <span>{uploadingCover ? 'Uploading to Cloudinary...' : 'Upload Cover Image'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingCover}
                        onChange={handleCoverUpload}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Or enter image URL"
                      value={editingProject.coverImage || ''}
                      onChange={(e) => setEditingProject({ ...editingProject, coverImage: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-xs"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Short Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.shortDescription || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                  Full Description / Overview
                </label>
                <textarea
                  rows={4}
                  value={editingProject.fullDescription || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                  placeholder="Detailed case study explanation..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Technologies (comma separated)
                  </label>
                  <input
                    type="text"
                    value={Array.isArray(editingProject.technologies) ? editingProject.technologies.join(', ') : (editingProject.technologies || '')}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                      })
                    }
                    placeholder="React, Node.js, Tailwind, AWS"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Key Features (comma separated)
                  </label>
                  <input
                    type="text"
                    value={Array.isArray(editingProject.features) ? editingProject.features.join(', ') : (editingProject.features || '')}
                    onChange={(e) =>
                      setEditingProject({
                        ...editingProject,
                        features: e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                      })
                    }
                    placeholder="Responsive Architecture, Realtime Sync, Fast Load"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                    Status
                  </label>
                  <select
                    value={editingProject.status || 'published'}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-5">
                  <input
                    type="checkbox"
                    id="projFeatured"
                    checked={editingProject.featured !== false}
                    onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-600"
                  />
                  <label htmlFor="projFeatured" className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Featured Showcase
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

