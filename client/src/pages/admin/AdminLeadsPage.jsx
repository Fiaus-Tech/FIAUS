import React, { useState, useEffect } from 'react';
import { fetchLeads, updateLeadStatus, deleteLead } from '../../services/api';
import {
  Users,
  Search,
  Filter,
  MessageCircle,
  Mail,
  Phone,
  Trash2,
  CheckCircle2,
  Clock,
  FileText,
  AlertCircle
} from 'lucide-react';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedLead, setSelectedLead] = useState(null);
  const [internalNote, setInternalNote] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  const statuses = ['New', 'Contacted', 'In Discussion', 'Proposal Sent', 'Won', 'Lost'];

  const loadLeads = async () => {
    setLoading(true);
    try {
      const res = await fetchLeads();
      if (res.success && res.data) {
        setLeads(res.data);
      }
    } catch (e) {
      console.error('Failed to load leads', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLeads();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await updateLeadStatus(id, { status: newStatus });
      if (res.success) {
        setLeads((prev) =>
          prev.map((lead) => (lead._id === id ? { ...lead, status: newStatus } : lead))
        );
        if (selectedLead?._id === id) {
          setSelectedLead((prev) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (e) {
      alert('Failed to update lead status: ' + e.message);
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!internalNote.trim() || !selectedLead) return;
    setSavingNote(true);
    try {
      const res = await updateLeadStatus(selectedLead._id, { note: internalNote });
      if (res.success) {
        setSelectedLead(res.data);
        setInternalNote('');
        loadLeads();
      }
    } catch (e) {
      alert('Failed to save note: ' + e.message);
    } finally {
      setSavingNote(false);
    }
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead inquiry?')) return;
    try {
      await deleteLead(id);
      setLeads((prev) => prev.filter((l) => l._id !== id));
      if (selectedLead?._id === id) setSelectedLead(null);
    } catch (e) {
      alert('Failed to delete lead: ' + e.message);
    }
  };

  const filteredLeads =
    filterStatus === 'All' ? leads : leads.filter((l) => l.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Inbound Leads CRM
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Track client acquisition pipeline from New Inquiry to Won Project.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {['All', ...statuses].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                filterStatus === st
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-white dark:bg-navy-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Grid: Leads List & Lead Detail Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left List */}
        <div className="lg:col-span-7 space-y-3">
          {loading ? (
            <div className="py-12 text-center text-xs text-slate-500">Loading inquiries...</div>
          ) : filteredLeads.length === 0 ? (
            <div className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-8 text-center text-xs text-slate-500">
              No leads found matching "{filterStatus}".
            </div>
          ) : (
            filteredLeads.map((lead) => {
              const isSelected = selectedLead?._id === lead._id;
              return (
                <div
                  key={lead._id}
                  onClick={() => setSelectedLead(lead)}
                  className={`cursor-pointer rounded-2xl bg-white dark:bg-navy-900 border p-5 shadow-xs transition-all ${
                    isSelected
                      ? 'border-brand-500 ring-2 ring-brand-500/20 shadow-md'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {lead.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {lead.company ? `${lead.company} • ` : ''}{lead.country}
                      </p>
                    </div>

                    {/* Status Dropdown */}
                    <select
                      value={lead.status || 'New'}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                      className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-navy-850 text-brand-700 dark:text-brand-300 focus:outline-none"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-semibold text-brand-600 dark:text-brand-400 mb-2">
                    <span>{lead.serviceNeeded}</span>
                    <span>•</span>
                    <span className="text-slate-600 dark:text-slate-400">{lead.budget}</span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {lead.projectDetails}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Preferred: {lead.preferredContact || 'WhatsApp'}</span>
                    <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Right Detail Pane */}
        <div className="lg:col-span-5">
          {selectedLead ? (
            <div className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6 sticky top-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                    {selectedLead.name}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {selectedLead.country} • {selectedLead.company || 'Private Client'}
                  </p>
                </div>

                <button
                  onClick={() => handleDeleteLead(selectedLead._id)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors"
                  title="Delete Lead"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Contact Channels */}
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <Mail className="w-4 h-4 text-brand-600 shrink-0" />
                  <a href={`mailto:${selectedLead.email}`} className="hover:underline font-semibold">
                    {selectedLead.email}
                  </a>
                </div>

                {selectedLead.whatsapp && (
                  <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <a
                      href={`https://wa.me/${selectedLead.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline font-semibold"
                    >
                      WhatsApp: {selectedLead.whatsapp}
                    </a>
                  </div>
                )}
              </div>

              {/* Details Box */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-100 dark:border-slate-800 space-y-2">
                <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 block">
                  Project Brief & Requirements:
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {selectedLead.projectDetails}
                </p>
              </div>

              {/* Internal Notes */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Internal Team Notes & Next Actions
                </span>

                {selectedLead.internalNotes && selectedLead.internalNotes.length > 0 && (
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                    {selectedLead.internalNotes.map((n, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-slate-100 dark:bg-navy-800 text-xs text-slate-700 dark:text-slate-300 space-y-1"
                      >
                        <p>{n.note}</p>
                        <p className="text-[10px] text-slate-400">
                          {n.author || 'Admin'} • {new Date(n.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input
                    type="text"
                    value={internalNote}
                    onChange={(e) => setInternalNote(e.target.value)}
                    placeholder="Add an internal note..."
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                  />
                  <button
                    type="submit"
                    disabled={savingNote}
                    className="px-3.5 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-all disabled:opacity-50"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-12 text-center text-xs text-slate-500">
              Select a lead from the list to view full specifications, contact channels, and add internal notes.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

