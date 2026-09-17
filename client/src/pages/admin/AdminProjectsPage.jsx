import React, { useState, useEffect } from 'react';
import {
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  reorderProjects,
  uploadFile,
  uploadFiles
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
  Image as ImageIcon,
  Images,
  Eye,
  EyeOff,
  Layers,
  Globe,
  FileText,
  Settings2,
  MoveUp,
  MoveDown,
  RefreshCw
} from 'lucide-react';

const CATEGORY_PRESETS = [
  { en: 'Web Engineering', ar: 'هندسة الويب والمؤسسات' },
  { en: 'Full-Stack & Cloud', ar: 'التطبيقات السحابية وأنظمة البيانات' },
  { en: 'AI & Intelligent Automation', ar: 'الذكاء الاصطناعي والأتمتة الذكية' },
  { en: 'Cybersecurity & Tools', ar: 'الأمن السيبراني وأدوات الحماية' },
  { en: 'E-Commerce & Retail', ar: 'التجارة الإلكترونية والتجزئة' },
  { en: 'Brand Experience & Hospitality', ar: 'الهوية والتجارب الرقمية الفاخرة' },
  { en: 'Automotive & Mobility', ar: 'السيارات والتنقل الفاخر' }
];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [activeFormTab, setActiveFormTab] = useState('basic'); // 'basic' | 'media' | 'content' | 'links'
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [replacingGalleryIdx, setReplacingGalleryIdx] = useState(null);
  const [saving, setSaving] = useState(false);

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
      alert('Failed to reorder projects: ' + e.message);
      loadProjects();
    }
  };

  const handleToggleStatus = async (project) => {
    const newStatus = project.status === 'published' ? 'draft' : 'published';
    try {
      await updateProject(project._id, { status: newStatus });
      setProjects((prev) =>
        prev.map((p) => (p._id === project._id ? { ...p, status: newStatus } : p))
      );
    } catch (e) {
      alert('Failed to update status: ' + e.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to permanently delete this project?')) return;
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

  // Gallery Management Handlers
  const handleMultiGalleryUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadingGallery(true);
    try {
      const res = await uploadFiles(files, 'projects');
      const uploadedItems = res?.data || [];
      const newScreenshots = Array.isArray(uploadedItems)
        ? uploadedItems.map((item, idx) => ({
            url: item.url || item,
            title: `Screenshot ${((editingProject.screenshots || []).length + idx + 1)}`,
            titleAr: `لقطة شاشة ${((editingProject.screenshots || []).length + idx + 1)}`,
            caption: '',
            captionAr: '',
            order: (editingProject.screenshots || []).length + idx + 1,
            public_id: item.public_id || ''
          }))
        : [];

      setEditingProject((prev) => ({
        ...prev,
        screenshots: [...(prev.screenshots || []), ...newScreenshots]
      }));
    } catch (err) {
      alert('Gallery upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleAddBlankGalleryItem = () => {
    const currentList = editingProject.screenshots || [];
    const nextIdx = currentList.length + 1;
    const newItem = {
      url: '',
      title: `Screenshot ${nextIdx}`,
      titleAr: `لقطة شاشة ${nextIdx}`,
      caption: '',
      captionAr: '',
      order: nextIdx
    };
    setEditingProject((prev) => ({
      ...prev,
      screenshots: [...(prev.screenshots || []), newItem]
    }));
  };

  const handleReplaceGalleryImage = async (index, e) => {
    const file = e.target.files[0];
    if (!file) return;
    setReplacingGalleryIdx(index);
    try {
      const res = await uploadFile(file, 'projects');
      const newUrl = res?.data?.url || res?.url || (res?.data && typeof res.data === 'string' ? res.data : null);
      if (newUrl) {
        setEditingProject((prev) => {
          const list = [...(prev.screenshots || [])];
          list[index] = { ...list[index], url: newUrl, public_id: res?.data?.public_id || '' };
          return { ...prev, screenshots: list };
        });
      }
    } catch (err) {
      alert('Replacement upload failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setReplacingGalleryIdx(null);
    }
  };

  const handleUpdateGalleryField = (index, field, value) => {
    setEditingProject((prev) => {
      const list = [...(prev.screenshots || [])];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, screenshots: list };
    });
  };

  const handleMoveGalleryItem = (index, direction) => {
    const list = [...(editingProject.screenshots || [])];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    // update order numbers
    const updated = list.map((item, idx) => ({ ...item, order: idx + 1 }));
    setEditingProject((prev) => ({ ...prev, screenshots: updated }));
  };

  const handleDeleteGalleryItem = (index) => {
    setEditingProject((prev) => {
      const list = (prev.screenshots || []).filter((_, idx) => idx !== index);
      const updated = list.map((item, idx) => ({ ...item, order: idx + 1 }));
      return { ...prev, screenshots: updated };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...editingProject,
        gallery: editingProject.screenshots || []
      };

      if (isNew) {
        await createProject(payload);
      } else {
        await updateProject(editingProject._id, payload);
      }
      setEditingProject(null);
      setIsNew(false);
      loadProjects();
    } catch (err) {
      alert('Save failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setSaving(false);
    }
  };

  const initNewProject = () => {
    setIsNew(true);
    setActiveFormTab('basic');
    setEditingProject({
      title: '',
      titleAr: '',
      slug: '',
      category: 'Web Engineering',
      categoryAr: 'هندسة الويب والمؤسسات',
      projectType: 'Production Web Application',
      projectTypeAr: 'تطبيق ويب احترافي',
      shortDescription: '',
      shortDescriptionAr: '',
      fullDescription: '',
      fullDescriptionAr: '',
      technologies: ['React', 'Node.js', 'Tailwind CSS'],
      features: ['High Performance Architecture', 'Responsive Interface'],
      featuresAr: ['بنية برمجية عالية الأداء', 'واجهة مستخدم متجاوبة'],
      challenge: '',
      challengeAr: '',
      solution: '',
      solutionAr: '',
      coverImage: 'https://res.cloudinary.com/n5yq0whs/image/upload/v1789044884/FIAUS/projects/p1/main.png',
      screenshots: [],
      gallery: [],
      githubUrl: '',
      liveUrl: '',
      featured: true,
      status: 'published'
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-navy-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-2 rounded-xl bg-brand-50 dark:bg-brand-950/80 text-brand-600 dark:text-brand-400">
              <Briefcase className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Projects & Case Studies CMS
            </h1>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Manage projects, upload screenshot galleries, configure bilingual content (EN / AR), and reorder showcases.
          </p>
        </div>

        <button
          onClick={initNewProject}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-xl shadow-sm transition-all self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Projects List */}
      <div className="space-y-3">
        {loading ? (
          <div className="py-16 text-center text-xs text-slate-500">
            <div className="w-6 h-6 border-2 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
            <span>Loading projects from database...</span>
          </div>
        ) : projects.length === 0 ? (
          <div className="py-16 text-center text-xs text-slate-500 bg-white dark:bg-navy-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            No projects found in database. Click "New Project" to create one.
          </div>
        ) : (
          projects.map((proj, index) => {
            const num = String(index + 1).padStart(2, '0');
            const galleryCount = (proj.screenshots || proj.gallery || []).length;
            const isPublished = proj.status === 'published';

            return (
              <div
                key={proj._id || proj.slug}
                className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all hover:border-brand-500/40"
              >
                {/* Left: Preview & Details */}
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="w-20 h-14 rounded-xl bg-slate-900 overflow-hidden shrink-0 border border-slate-200 dark:border-slate-800 relative group">
                    <img
                      src={proj.coverImage}
                      alt={proj.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          'https://res.cloudinary.com/n5yq0whs/image/upload/v1789044884/FIAUS/projects/p1/main.png';
                      }}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-black text-brand-600 dark:text-brand-400">
                        0{index + 1}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                        {proj.title}
                      </h3>
                      {proj.titleAr && (
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                          ({proj.titleAr})
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300">
                        {proj.category}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-brand-50 dark:bg-brand-950/70 text-brand-600 dark:text-brand-400">
                        <Images className="w-3 h-3" />
                        <span>{galleryCount} shots</span>
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {proj.shortDescription || proj.fullDescription || 'No description provided.'}
                    </p>
                  </div>
                </div>

                {/* Right: Actions & Reordering */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  {/* Status Toggle Button */}
                  <button
                    onClick={() => handleToggleStatus(proj)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      isPublished
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/80 hover:bg-emerald-100'
                        : 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/80 hover:bg-amber-100'
                    }`}
                    title={isPublished ? 'Project is published on public site' : 'Project is drafted/hidden'}
                  >
                    {isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{isPublished ? 'Published' : 'Draft'}</span>
                  </button>

                  {/* Reorder Up/Down */}
                  <div className="flex items-center bg-slate-100 dark:bg-navy-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
                    <button
                      disabled={index === 0}
                      onClick={() => handleMove(index, 'up')}
                      className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-navy-700 disabled:opacity-20"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      disabled={index === projects.length - 1}
                      onClick={() => handleMove(index, 'down')}
                      className="p-1 rounded text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-navy-700 disabled:opacity-20"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Edit */}
                  <button
                    onClick={() => {
                      setIsNew(false);
                      setActiveFormTab('basic');
                      setEditingProject({
                        ...proj,
                        screenshots: proj.screenshots || proj.gallery || []
                      });
                    }}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
                    title="Edit Project & Gallery"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(proj._id)}
                    className="p-2 rounded-xl border border-red-200 dark:border-red-900/60 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Edit / Create Full Modal Drawer */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-white dark:bg-navy-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[92vh] overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/80 dark:bg-navy-850/80">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>{isNew ? 'Create New Project' : `Edit: ${editingProject.title || 'Project'}`}</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Manage bilingual metadata, cover asset, and interactive screenshot gallery.
                </p>
              </div>

              <button
                onClick={() => setEditingProject(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-navy-900 border-b border-slate-200 dark:border-slate-800 overflow-x-auto text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveFormTab('basic')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                  activeFormTab === 'basic'
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-800'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>1. General & Bilingual Info</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFormTab('media')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                  activeFormTab === 'media'
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-800'
                }`}
              >
                <Images className="w-3.5 h-3.5" />
                <span>2. Cover & Gallery ({(editingProject.screenshots || []).length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFormTab('content')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                  activeFormTab === 'content'
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-800'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>3. Specs, Challenge & Solution</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveFormTab('links')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
                  activeFormTab === 'links'
                    ? 'bg-brand-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-800'
                }`}
              >
                <Settings2 className="w-3.5 h-3.5" />
                <span>4. Links & Publishing</span>
              </button>
            </div>

            {/* Modal Body / Form Content */}
            <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* TAB 1: BASIC & BILINGUAL */}
              {activeFormTab === 'basic' && (
                <div className="space-y-5">
                  {/* Titles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                        Project Title (English) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. CAR 2 GO"
                        value={editingProject.title || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditingProject({
                            ...editingProject,
                            title: val,
                            slug: isNew && !editingProject.slug ? val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : editingProject.slug
                          });
                        }}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1" dir="rtl">
                        عنوان المشروع (باللغة العربية)
                      </label>
                      <input
                        type="text"
                        dir="rtl"
                        placeholder="مثال: كار تو جو"
                        value={editingProject.titleAr || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, titleAr: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Slug & Preset Selector */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                        URL Slug (/work/[slug]) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. car-2-go"
                        value={editingProject.slug || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                        Quick Category Preset
                      </label>
                      <select
                        onChange={(e) => {
                          const found = CATEGORY_PRESETS.find((c) => c.en === e.target.value);
                          if (found) {
                            setEditingProject({
                              ...editingProject,
                              category: found.en,
                              categoryAr: found.ar
                            });
                          }
                        }}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white"
                        value={CATEGORY_PRESETS.some((c) => c.en === editingProject.category) ? editingProject.category : ''}
                      >
                        <option value="">-- Choose or Custom Below --</option>
                        {CATEGORY_PRESETS.map((cat) => (
                          <option key={cat.en} value={cat.en}>
                            {cat.en} ({cat.ar})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Category EN & AR Custom */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                        Category (English) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Automotive & Mobility"
                        value={editingProject.category || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1" dir="rtl">
                        التصنيف (باللغة العربية)
                      </label>
                      <input
                        type="text"
                        dir="rtl"
                        placeholder="مثال: السيارات والتنقل الفاخر"
                        value={editingProject.categoryAr || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, categoryAr: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Project Type EN & AR */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                        Project Type / Sub-Label (English)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Luxury Car Rental & Booking Platform"
                        value={editingProject.projectType || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, projectType: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1" dir="rtl">
                        نوع المشروع والتصنيف الفرعي (بالعربية)
                      </label>
                      <input
                        type="text"
                        dir="rtl"
                        placeholder="مثال: منصة حجز وتأجير السيارات الفاخرة"
                        value={editingProject.projectTypeAr || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, projectTypeAr: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Short Description EN & AR */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                        Short Description (English) *
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Concise overview for project cards on the homepage/showcase..."
                        value={editingProject.shortDescription || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1" dir="rtl">
                        الوصف المختصر (بالعربية)
                      </label>
                      <textarea
                        rows={3}
                        dir="rtl"
                        placeholder="نبذة مختصرة لبطاقة المشروع في الصفحة الرئيسية..."
                        value={editingProject.shortDescriptionAr || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, shortDescriptionAr: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Full Description EN & AR */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                        Full Case Study Description (English)
                      </label>
                      <textarea
                        rows={4}
                        placeholder="Comprehensive case study overview for the detail page..."
                        value={editingProject.fullDescription || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, fullDescription: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1" dir="rtl">
                        الوصف الكامل لدراسة الحالة (بالعربية)
                      </label>
                      <textarea
                        rows={4}
                        dir="rtl"
                        placeholder="تفاصيل شاملة عن المشروع لصفحة دراسة الحالة..."
                        value={editingProject.fullDescriptionAr || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, fullDescriptionAr: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: COVER & PROJECT GALLERY MANAGEMENT */}
              {activeFormTab === 'media' && (
                <div className="space-y-8">
                  {/* Section A: Cover Image */}
                  <div className="rounded-2xl bg-slate-50 dark:bg-navy-850 p-5 border border-slate-200 dark:border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <ImageIcon className="w-4 h-4 text-brand-600" />
                        <span>Primary Cover Image</span>
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Required for Showcase Cards
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="w-36 h-24 rounded-xl overflow-hidden border-2 border-brand-500/40 bg-slate-900 shrink-0">
                        {editingProject.coverImage ? (
                          <img
                            src={editingProject.coverImage}
                            alt="Cover Preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <ImageIcon className="w-8 h-8" />
                          </div>
                        )}
                      </div>

                      <div className="space-y-2 flex-1 w-full">
                        <div className="flex flex-wrap items-center gap-2">
                          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-brand-600 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 cursor-pointer hover:bg-brand-100 transition-colors">
                            <Upload className="w-3.5 h-3.5" />
                            <span>{uploadingCover ? 'Uploading Cover...' : 'Upload Cover to Cloudinary'}</span>
                            <input
                              type="file"
                              accept="image/*"
                              disabled={uploadingCover}
                              onChange={handleCoverUpload}
                              className="hidden"
                            />
                          </label>
                        </div>
                        <input
                          type="text"
                          required
                          placeholder="Or paste Direct Image URL"
                          value={editingProject.coverImage || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, coverImage: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-900 text-xs text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section B: Project Detail Gallery / Screenshots */}
                  <div className="rounded-2xl bg-slate-50 dark:bg-navy-850 p-5 border border-slate-200 dark:border-slate-800 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-750">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <Images className="w-4 h-4 text-brand-600" />
                          <span>Project Detail Screenshots & Gallery</span>
                        </h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Upload multiple screenshots for the public case study modal & gallery carousel.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Multi-upload Button */}
                        <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 cursor-pointer shadow-xs transition-colors">
                          <Upload className="w-3.5 h-3.5" />
                          <span>{uploadingGallery ? 'Uploading Batch...' : 'Upload Multiple Images'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            multiple
                            disabled={uploadingGallery}
                            onChange={handleMultiGalleryUpload}
                            className="hidden"
                          />
                        </label>

                        {/* Add blank URL button */}
                        <button
                          type="button"
                          onClick={handleAddBlankGalleryItem}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add URL</span>
                        </button>
                      </div>
                    </div>

                    {/* Gallery Items List */}
                    {(!editingProject.screenshots || editingProject.screenshots.length === 0) ? (
                      <div className="py-8 text-center text-xs text-slate-400 border border-dashed border-slate-300 dark:border-slate-700 rounded-xl">
                        No detail gallery images added yet. Click "Upload Multiple Images" to add screenshots.
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {editingProject.screenshots.map((item, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 shadow-2xs flex flex-col md:flex-row items-start md:items-center gap-4"
                          >
                            {/* Number & Thumbnail */}
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="font-mono text-xs font-bold text-slate-400 w-6">
                                #{idx + 1}
                              </span>
                              <div className="w-20 h-14 rounded-lg overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 relative group">
                                {item.url ? (
                                  <img
                                    src={item.url}
                                    alt={item.title}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-slate-500 text-[10px]">
                                    No Image
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Inputs: URL, Titles, Captions */}
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
                              <div>
                                <input
                                  type="text"
                                  placeholder="Image URL *"
                                  value={item.url || ''}
                                  onChange={(e) => handleUpdateGalleryField(idx, 'url', e.target.value)}
                                  className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white mb-1"
                                />
                                <input
                                  type="text"
                                  placeholder="Title (English)"
                                  value={item.title || ''}
                                  onChange={(e) => handleUpdateGalleryField(idx, 'title', e.target.value)}
                                  className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white"
                                />
                              </div>

                              <div>
                                <input
                                  type="text"
                                  dir="rtl"
                                  placeholder="العنوان (بالعربية)"
                                  value={item.titleAr || ''}
                                  onChange={(e) => handleUpdateGalleryField(idx, 'titleAr', e.target.value)}
                                  className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white mb-1"
                                />
                                <input
                                  type="text"
                                  placeholder="Caption / Description (EN)"
                                  value={item.caption || ''}
                                  onChange={(e) => handleUpdateGalleryField(idx, 'caption', e.target.value)}
                                  className="w-full px-2.5 py-1 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white"
                                />
                              </div>
                            </div>

                            {/* Action Buttons: Replace, Move Up/Down, Delete */}
                            <div className="flex items-center gap-1 shrink-0 self-end md:self-center">
                              {/* Replace button */}
                              <label
                                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-navy-800 cursor-pointer"
                                title="Replace image file"
                              >
                                <RefreshCw className={`w-3.5 h-3.5 ${replacingGalleryIdx === idx ? 'animate-spin' : ''}`} />
                                <input
                                  type="file"
                                  accept="image/*"
                                  disabled={replacingGalleryIdx === idx}
                                  onChange={(e) => handleReplaceGalleryImage(idx, e)}
                                  className="hidden"
                                />
                              </label>

                              {/* Move Up */}
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => handleMoveGalleryItem(idx, 'up')}
                                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 disabled:opacity-20"
                                title="Move Up"
                              >
                                <MoveUp className="w-3.5 h-3.5" />
                              </button>

                              {/* Move Down */}
                              <button
                                type="button"
                                disabled={idx === editingProject.screenshots.length - 1}
                                onClick={() => handleMoveGalleryItem(idx, 'down')}
                                className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 disabled:opacity-20"
                                title="Move Down"
                              >
                                <MoveDown className="w-3.5 h-3.5" />
                              </button>

                              {/* Delete */}
                              <button
                                type="button"
                                onClick={() => handleDeleteGalleryItem(idx)}
                                className="p-1.5 rounded-lg border border-red-200 dark:border-red-900/50 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                                title="Delete Screenshot"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: CONTENT, SPECS, CHALLENGE & SOLUTION */}
              {activeFormTab === 'content' && (
                <div className="space-y-5">
                  {/* Tech Stack */}
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                      Technologies & Tools (Comma Separated)
                    </label>
                    <input
                      type="text"
                      placeholder="React, Next.js, Node.js, Tailwind CSS, Stripe, AWS"
                      value={Array.isArray(editingProject.technologies) ? editingProject.technologies.join(', ') : (editingProject.technologies || '')}
                      onChange={(e) =>
                        setEditingProject({
                          ...editingProject,
                          technologies: e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                        })
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white"
                    />
                  </div>

                  {/* Key Features EN & AR */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                        Key Features (English - Comma Separated)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Dynamic Vehicle Search, Instant Booking Engine, Bilingual Support"
                        value={Array.isArray(editingProject.features) ? editingProject.features.join(', ') : (editingProject.features || '')}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            features: e.target.value.split(',').map((f) => f.trim()).filter(Boolean)
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1" dir="rtl">
                        المميزات الرئيسية (بالعربية - مفصولة بفواصل)
                      </label>
                      <textarea
                        rows={3}
                        dir="rtl"
                        placeholder="محرك حجز فوري، نظام بحث متقدم عن المركبات، دعم كامل للغتين"
                        value={Array.isArray(editingProject.featuresAr) ? editingProject.featuresAr.join(', ') : (editingProject.featuresAr || '')}
                        onChange={(e) =>
                          setEditingProject({
                            ...editingProject,
                            featuresAr: e.target.value.split(',').map((f) => f.trim()).filter(Boolean)
                          })
                        }
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Challenge EN & AR */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                        Engineering Challenge (English)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="What architectural, speed, or integration challenges had to be solved?"
                        value={editingProject.challenge || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, challenge: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1" dir="rtl">
                        التحدي الهندسي والمتطلبات (بالعربية)
                      </label>
                      <textarea
                        rows={3}
                        dir="rtl"
                        placeholder="ما هي التحديات التقنية ومتطلبات الأداء التي واجهت المشروع؟"
                        value={editingProject.challengeAr || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, challengeAr: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Solution EN & AR */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                        Technical Solution & Architecture (English)
                      </label>
                      <textarea
                        rows={3}
                        placeholder="How did the FIAUS engineering team design and deliver the solution?"
                        value={editingProject.solution || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1" dir="rtl">
                        الحل البرمجي والتنفيذ (بالعربية)
                      </label>
                      <textarea
                        rows={3}
                        dir="rtl"
                        placeholder="كيف تم تصميم وتنفيذ البنية البرمجية والحلول من قبل فياوس تك؟"
                        value={editingProject.solutionAr || ''}
                        onChange={(e) => setEditingProject({ ...editingProject, solutionAr: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: LINKS & PUBLISHING */}
              {activeFormTab === 'links' && (
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                        Live Demo / Production URL
                      </label>
                      <div className="relative">
                        <ExternalLink className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="https://example.com or https://fahad1420.github.io/car-2-go/"
                          value={editingProject.liveUrl || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, liveUrl: e.target.value })}
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                        GitHub Repository URL
                      </label>
                      <div className="relative">
                        <Github className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="https://github.com/fahad1420/car-2-go/"
                          value={editingProject.githubUrl || ''}
                          onChange={(e) => setEditingProject({ ...editingProject, githubUrl: e.target.value })}
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                        Status
                      </label>
                      <select
                        value={editingProject.status || 'published'}
                        onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white"
                      >
                        <option value="published">Published (Visible on site)</option>
                        <option value="draft">Draft (Hidden)</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">
                        Display Order
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={editingProject.displayOrder || 1}
                        onChange={(e) => setEditingProject({ ...editingProject, displayOrder: parseInt(e.target.value, 10) || 1 })}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-6">
                      <input
                        type="checkbox"
                        id="projFeaturedToggle"
                        checked={editingProject.featured !== false}
                        onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                        className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
                      />
                      <label htmlFor="projFeaturedToggle" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                        Featured in Hero/Showcase
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-400">
                  {isNew ? 'New project will be added to database' : 'Changes will immediately sync to public site'}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="px-4 py-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-6 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-xl shadow-md transition-all"
                  >
                    {saving ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Saving to Database...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{isNew ? 'Create & Publish Project' : 'Save & Sync Project'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
