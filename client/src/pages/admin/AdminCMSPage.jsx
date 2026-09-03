import React, { useState, useEffect } from 'react';
import {
  fetchFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
  fetchTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  fetchTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  fetchBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost
} from '../../services/api';
import {
  HelpCircle,
  Users,
  MessageSquare,
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Check,
  X,
  Eye,
  EyeOff,
  Sparkles,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export default function AdminCMSPage() {
  const [activeTab, setActiveTab] = useState('faqs');
  const [loading, setLoading] = useState(true);

  // States for FAQs
  const [faqs, setFaqs] = useState([]);
  const [editingFaq, setEditingFaq] = useState(null);
  const [isNewFaq, setIsNewFaq] = useState(false);

  // States for Team
  const [team, setTeam] = useState([]);
  const [editingMember, setEditingMember] = useState(null);
  const [isNewMember, setIsNewMember] = useState(false);

  // States for Testimonials
  const [testimonials, setTestimonials] = useState([]);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [isNewTestimonial, setIsNewTestimonial] = useState(false);

  // States for Blog
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [isNewBlog, setIsNewBlog] = useState(false);

  // Load active tab data
  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'faqs') {
        const res = await fetchFAQs({ all: true });
        if (res.success && res.data) setFaqs(res.data);
      } else if (activeTab === 'team') {
        const res = await fetchTeamMembers({ all: true });
        if (res.success && res.data) setTeam(res.data);
      } else if (activeTab === 'testimonials') {
        const res = await fetchTestimonials({ all: true });
        if (res.success && res.data) setTestimonials(res.data);
      } else if (activeTab === 'blog') {
        const res = await fetchBlogPosts({ all: true });
        if (res.success && res.data) setBlogs(res.data);
      }
    } catch (e) {
      console.error('Failed to load CMS data', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [activeTab]);

  // --- FAQ Handlers ---
  const handleSaveFaq = async (e) => {
    e.preventDefault();
    try {
      if (isNewFaq) {
        await createFAQ(editingFaq);
      } else {
        await updateFAQ(editingFaq._id, editingFaq);
      }
      setEditingFaq(null);
      setIsNewFaq(false);
      loadData();
    } catch (err) {
      alert('Save failed: ' + err.message);
    }
  };

  const handleDeleteFaq = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      await deleteFAQ(id);
      loadData();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  // --- Team Handlers ---
  const handleSaveTeam = async (e) => {
    e.preventDefault();
    try {
      if (isNewMember) {
        await createTeamMember(editingMember);
      } else {
        await updateTeamMember(editingMember._id, editingMember);
      }
      setEditingMember(null);
      setIsNewMember(false);
      loadData();
    } catch (err) {
      alert('Save failed: ' + err.message);
    }
  };

  const handleDeleteTeam = async (id) => {
    if (!window.confirm('Delete this team member?')) return;
    try {
      await deleteTeamMember(id);
      loadData();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  // --- Testimonial Handlers ---
  const handleSaveTestimonial = async (e) => {
    e.preventDefault();
    try {
      if (isNewTestimonial) {
        await createTestimonial(editingTestimonial);
      } else {
        await updateTestimonial(editingTestimonial._id, editingTestimonial);
      }
      setEditingTestimonial(null);
      setIsNewTestimonial(false);
      loadData();
    } catch (err) {
      alert('Save failed: ' + err.message);
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await deleteTestimonial(id);
      loadData();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  // --- Blog Handlers ---
  const handleSaveBlog = async (e) => {
    e.preventDefault();
    try {
      if (isNewBlog) {
        await createBlogPost(editingBlog);
      } else {
        await updateBlogPost(editingBlog._id, editingBlog);
      }
      setEditingBlog(null);
      setIsNewBlog(false);
      loadData();
    } catch (err) {
      alert('Save failed: ' + err.message);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await deleteBlogPost(id);
      loadData();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Content Management (CMS)
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Create, edit, publish, and manage FAQs, Team profiles, Testimonials, and Blog articles.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        {[
          { id: 'faqs', name: `FAQs (${faqs.length})`, icon: HelpCircle },
          { id: 'blog', name: `Blog & Insights (${blogs.length})`, icon: BookOpen },
          { id: 'team', name: `Team (${team.length})`, icon: Users },
          { id: 'testimonials', name: `Testimonials (${testimonials.length})`, icon: MessageSquare }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all ${
                isActive
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-brand-500'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.name}</span>
            </button>
          );
        })}
      </div>

      {/* 1. FAQs TAB */}
      {activeTab === 'faqs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Manage Frequently Asked Questions
            </h3>
            <button
              onClick={() => {
                setIsNewFaq(true);
                setEditingFaq({
                  question: '',
                  questionAr: '',
                  answer: '',
                  answerAr: '',
                  category: 'Services',
                  categoryAr: 'الخدمات',
                  displayOrder: faqs.length + 1,
                  active: true
                });
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl"
            >
              <Plus className="w-4 h-4" />
              <span>Add FAQ</span>
            </button>
          </div>

          <div className="space-y-3">
            {loading ? (
              <div className="py-12 text-center text-xs text-slate-500">Loading FAQs...</div>
            ) : faqs.length === 0 ? (
              <div className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-8 text-center text-xs text-slate-500">
                No FAQs created yet.
              </div>
            ) : (
              faqs.map((faq) => (
                <div
                  key={faq._id}
                  className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-2 flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                          {faq.category || 'General'}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${faq.active !== false ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-slate-100 text-slate-600'}`}>
                          {faq.active !== false ? 'Published' : 'Hidden'}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {faq.question}
                      </h4>
                      {faq.questionAr && (
                        <p className="text-xs text-slate-500 mt-0.5">
                          {faq.questionAr}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          setIsNewFaq(false);
                          setEditingFaq(faq);
                        }}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-navy-800"
                        title="Edit FAQ"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteFaq(faq._id)}
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                        title="Delete FAQ"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-2 border-t border-slate-100 dark:border-slate-800">
                    {faq.answer}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 2. BLOG TAB */}
      {activeTab === 'blog' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Blog & Engineering Publications
            </h3>
            <button
              onClick={() => {
                setIsNewBlog(true);
                setEditingBlog({
                  title: '',
                  titleAr: '',
                  slug: '',
                  category: 'AI & Automation',
                  categoryAr: 'الذكاء الاصطناعي والأتمتة',
                  tags: ['AI', 'Engineering'],
                  coverImage: '/assets/projects/p1/main.png',
                  author: { name: 'FIAUS Tech Lab', role: 'Technical Team' },
                  excerpt: '',
                  excerptAr: '',
                  content: '',
                  contentAr: '',
                  status: 'published',
                  readTime: '5 min read'
                });
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl"
            >
              <Plus className="w-4 h-4" />
              <span>New Article</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? (
              <div className="py-12 text-center text-xs text-slate-500 col-span-2">Loading articles...</div>
            ) : blogs.length === 0 ? (
              <div className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-8 text-center text-xs text-slate-500 col-span-2">
                No blog articles published yet.
              </div>
            ) : (
              blogs.map((b) => (
                <div
                  key={b._id}
                  className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300">
                        {b.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${b.status === 'published' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950' : 'bg-amber-50 text-amber-700'}`}>
                          {b.status}
                        </span>
                        <button
                          onClick={() => {
                            setIsNewBlog(false);
                            setEditingBlog(b);
                          }}
                          className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(b._id)}
                          className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      {b.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {b.excerpt}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{b.author?.name || 'FIAUS Tech'}</span>
                    <span>{b.readTime || '5 min read'}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 3. TEAM TAB (Ready for real team members) */}
      {activeTab === 'team' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Team Profiles Directory
              </h3>
              <p className="text-xs text-slate-500">
                Add verified team profiles when real photos and bios are available.
              </p>
            </div>
            <button
              onClick={() => {
                setIsNewMember(true);
                setEditingMember({
                  name: '',
                  position: '',
                  positionAr: '',
                  photo: '',
                  bio: '',
                  bioAr: '',
                  socialLinks: { linkedin: '', twitter: '', github: '' },
                  displayOrder: team.length + 1,
                  status: 'active'
                });
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl"
            >
              <Plus className="w-4 h-4" />
              <span>Add Member</span>
            </button>
          </div>

          {team.length === 0 ? (
            <div className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 mx-auto flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Team Directory Ready
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No mock profiles created. Real verified engineers and founders can be added dynamically using the "Add Member" button above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {team.map((m) => (
                <div
                  key={m._id}
                  className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{m.name}</h4>
                      <p className="text-xs text-brand-600">{m.position}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setIsNewMember(false);
                          setEditingMember(m);
                        }}
                        className="p-1 text-slate-500"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteTeam(m._id)} className="p-1 text-red-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">{m.bio}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 4. TESTIMONIALS TAB (Ready for real verified clients) */}
      {activeTab === 'testimonials' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Client Testimonials & Feedback
              </h3>
              <p className="text-xs text-slate-500">
                Add real client reviews and feedback as engagements complete.
              </p>
            </div>
            <button
              onClick={() => {
                setIsNewTestimonial(true);
                setEditingTestimonial({
                  clientName: '',
                  company: '',
                  position: '',
                  photo: '',
                  content: '',
                  contentAr: '',
                  rating: 5,
                  displayOrder: testimonials.length + 1,
                  published: true
                });
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl"
            >
              <Plus className="w-4 h-4" />
              <span>Add Testimonial</span>
            </button>
          </div>

          {testimonials.length === 0 ? (
            <div className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 mx-auto flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Testimonials Module Ready
              </h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No fake reviews created. As client engagements complete, add genuine feedback with company attribution.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map((t) => (
                <div
                  key={t._id}
                  className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col justify-between"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">{t.clientName}</h4>
                      <p className="text-xs text-slate-500">{t.company} • {t.position}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => {
                          setIsNewTestimonial(false);
                          setEditingTestimonial(t);
                        }}
                        className="p-1 text-slate-500"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteTestimonial(t._id)} className="p-1 text-red-500">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 italic">"{t.content}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* --- FAQ MODAL DRAWER --- */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {isNewFaq ? 'Add New FAQ' : 'Edit FAQ'}
              </h3>
              <button onClick={() => setEditingFaq(null)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Question (English) *</label>
                <input
                  type="text"
                  required
                  value={editingFaq.question || ''}
                  onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Question (Arabic)</label>
                <input
                  type="text"
                  value={editingFaq.questionAr || ''}
                  onChange={(e) => setEditingFaq({ ...editingFaq, questionAr: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Answer (English) *</label>
                <textarea
                  rows={3}
                  required
                  value={editingFaq.answer || ''}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Answer (Arabic)</label>
                <textarea
                  rows={3}
                  value={editingFaq.answerAr || ''}
                  onChange={(e) => setEditingFaq({ ...editingFaq, answerAr: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={editingFaq.category || 'Services'}
                    onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                  >
                    <option value="Services">Services</option>
                    <option value="Process">Process</option>
                    <option value="AI & Automation">AI & Automation</option>
                    <option value="Timelines">Timelines</option>
                    <option value="International">International</option>
                    <option value="Legal & IP">Legal & IP</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="faqActive"
                    checked={editingFaq.active !== false}
                    onChange={(e) => setEditingFaq({ ...editingFaq, active: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-600"
                  />
                  <label htmlFor="faqActive" className="font-bold text-slate-700 dark:text-slate-300">Published</label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => setEditingFaq(null)} className="px-4 py-2 font-semibold rounded-xl border border-slate-200 dark:border-slate-800">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl">
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- BLOG MODAL DRAWER --- */}
      {editingBlog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {isNewBlog ? 'Create Article' : 'Edit Article'}
              </h3>
              <button onClick={() => setEditingBlog(null)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <form onSubmit={handleSaveBlog} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Title (EN) *</label>
                  <input
                    type="text"
                    required
                    value={editingBlog.title || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Slug *</label>
                  <input
                    type="text"
                    required
                    value={editingBlog.slug || ''}
                    onChange={(e) => setEditingBlog({ ...editingBlog, slug: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingBlog.category || 'AI & Automation'}
                    onChange={(e) => setEditingBlog({ ...editingBlog, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Cover Image URL</label>
                  <input
                    type="text"
                    value={editingBlog.coverImage || '/assets/projects/p1/main.png'}
                    onChange={(e) => setEditingBlog({ ...editingBlog, coverImage: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Excerpt *</label>
                <textarea
                  rows={2}
                  required
                  value={editingBlog.excerpt || ''}
                  onChange={(e) => setEditingBlog({ ...editingBlog, excerpt: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Full Article Content (Markdown) *</label>
                <textarea
                  rows={6}
                  required
                  value={editingBlog.content || ''}
                  onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Status</label>
                  <select
                    value={editingBlog.status || 'published'}
                    onChange={(e) => setEditingBlog({ ...editingBlog, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Read Time</label>
                  <input
                    type="text"
                    value={editingBlog.readTime || '5 min read'}
                    onChange={(e) => setEditingBlog({ ...editingBlog, readTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => setEditingBlog(null)} className="px-4 py-2 font-semibold rounded-xl border border-slate-200 dark:border-slate-800">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl">
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- TEAM MODAL DRAWER --- */}
      {editingMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {isNewMember ? 'Add Team Member' : 'Edit Member'}
              </h3>
              <button onClick={() => setEditingMember(null)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <form onSubmit={handleSaveTeam} className="space-y-3">
              <div>
                <label className="block font-bold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={editingMember.name || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Role / Position *</label>
                <input
                  type="text"
                  required
                  value={editingMember.position || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, position: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Photo URL</label>
                <input
                  type="text"
                  placeholder="/assets/team/photo.jpg"
                  value={editingMember.photo || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, photo: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                />
              </div>

              <div>
                <label className="block font-bold mb-1">Bio</label>
                <textarea
                  rows={2}
                  value={editingMember.bio || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => setEditingMember(null)} className="px-4 py-2 font-semibold rounded-xl border border-slate-200 dark:border-slate-800">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl">
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- TESTIMONIAL MODAL DRAWER --- */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {isNewTestimonial ? 'Add Client Review' : 'Edit Review'}
              </h3>
              <button onClick={() => setEditingTestimonial(null)}><X className="w-5 h-5 text-slate-400" /></button>
            </div>

            <form onSubmit={handleSaveTestimonial} className="space-y-3">
              <div>
                <label className="block font-bold mb-1">Client Name *</label>
                <input
                  type="text"
                  required
                  value={editingTestimonial.clientName || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, clientName: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Company *</label>
                  <input
                    type="text"
                    required
                    value={editingTestimonial.company || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1">Position</label>
                  <input
                    type="text"
                    value={editingTestimonial.position || ''}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, position: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1">Testimonial Text *</label>
                <textarea
                  rows={3}
                  required
                  value={editingTestimonial.content || ''}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, content: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => setEditingTestimonial(null)} className="px-4 py-2 font-semibold rounded-xl border border-slate-200 dark:border-slate-800">
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl">
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
