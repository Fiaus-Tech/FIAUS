import React, { useState, useEffect } from 'react';
import { fetchServices, createService, updateService, deleteService } from '../../services/api';
import { Layers, Plus, Edit2, Trash2, X, CheckCircle } from 'lucide-react';

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);
  const [isNew, setIsNew] = useState(false);

  const loadServices = async () => {
    setLoading(true);
    try {
      const res = await fetchServices({ all: true });
      if (res.success && res.data) {
        setServices(res.data);
      }
    } catch (e) {
      console.error('Failed to load services', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    try {
      await deleteService(id);
      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch (e) {
      alert('Delete failed: ' + e.message);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (isNew) {
        await createService(editingService);
      } else {
        await updateService(editingService._id, editingService);
      }
      setEditingService(null);
      setIsNew(false);
      loadServices();
    } catch (e) {
      alert('Save failed: ' + e.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Services Management
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Configure agency capability offerings, deliverables, and service categories.
          </p>
        </div>

        <button
          onClick={() => {
            setIsNew(true);
            setEditingService({
              title: '',
              titleAr: '',
              slug: '',
              category: 'Web & App Engineering',
              icon: 'Code',
              shortDescription: '',
              shortDescriptionAr: '',
              deliverables: ['Custom Implementation', 'Quality Assurance'],
              technologies: ['React', 'Node.js'],
              active: true
            });
          }}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-xs self-start"
        >
          <Plus className="w-4 h-4" />
          <span>New Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <div className="py-12 text-center text-xs text-slate-500">Loading services...</div>
        ) : (
          services.map((srv) => (
            <div
              key={srv._id}
              className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                    {srv.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setIsNew(false);
                        setEditingService(srv);
                      }}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(srv._id)}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">
                  {srv.shortDescription}
                </p>
              </div>

              {srv.deliverables && (
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
                  {srv.deliverables.join(' • ')}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Edit Drawer */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {isNew ? 'Add Service' : `Edit Service: ${editingService.title}`}
              </h2>
              <button onClick={() => setEditingService(null)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Title (EN)</label>
                <input
                  type="text"
                  required
                  value={editingService.title || ''}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Slug</label>
                <input
                  type="text"
                  required
                  value={editingService.slug || ''}
                  onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Category</label>
                <select
                  value={editingService.category}
                  onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                >
                  <option value="Web & App Engineering">Web & App Engineering</option>
                  <option value="AI & Intelligent Automation">AI & Intelligent Automation</option>
                  <option value="Growth & Performance Marketing">Growth & Performance Marketing</option>
                  <option value="UI/UX & Brand Design">UI/UX & Brand Design</option>
                  <option value="Cloud & SaaS Architecture">Cloud & SaaS Architecture</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Short Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingService.shortDescription || ''}
                  onChange={(e) => setEditingService({ ...editingService, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 font-semibold rounded-xl border border-slate-200 dark:border-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

