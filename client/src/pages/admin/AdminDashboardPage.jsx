import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchDashboardMetrics } from '../../services/api';
import {
  Users,
  Briefcase,
  Layers,
  Inbox,
  ArrowUpRight,
  Clock,
  Sparkles,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState({
    totalLeads: 0,
    newLeads: 0,
    inDiscussionLeads: 0,
    wonLeads: 0,
    totalProjects: 5,
    totalServices: 8,
    unreadMessages: 0,
    recentLeads: [],
    recentMessages: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const res = await fetchDashboardMetrics();
        if (res.success && res.data) {
          setMetrics(res.data);
        }
      } catch (err) {
        console.error('Failed to load metrics', err);
      } finally {
        setLoading(false);
      }
    };
    loadMetrics();
  }, []);

  const stats = [
    { label: 'Total Inbound Leads', value: metrics.totalLeads, icon: Users, color: 'text-brand-600 bg-brand-50 dark:bg-brand-950/80', link: '/admin/leads' },
    { label: 'New / Uncontacted', value: metrics.newLeads, icon: Sparkles, color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/80', link: '/admin/leads?status=New' },
    { label: 'Active Projects', value: metrics.totalProjects, icon: Briefcase, color: 'text-sky-600 bg-sky-50 dark:bg-sky-950/80', link: '/admin/projects' },
    { label: 'Unread Inquiries', value: metrics.unreadMessages, icon: Inbox, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/80', link: '/admin/messages' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Agency Command Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Real-time pipeline analytics, project management, and inbound lead operations.
          </p>
        </div>

        <Link
          to="/admin/leads"
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-xs self-start"
        >
          <span>View All Leads CRM</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link
              key={idx}
              to={stat.link}
              className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xs hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </span>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white font-mono">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 group-hover:underline flex items-center gap-1">
                  Manage <ArrowUpRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Grid: Recent Inbound Leads & Recent Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Leads CRM */}
        <div className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-600" />
              <span>Recent Client Inquiries</span>
            </h2>
            <Link to="/admin/leads" className="text-xs font-semibold text-brand-600 hover:underline">
              View CRM
            </Link>
          </div>

          {metrics.recentLeads && metrics.recentLeads.length > 0 ? (
            <div className="space-y-3">
              {metrics.recentLeads.map((lead) => (
                <div
                  key={lead._id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4"
                >
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {lead.name} • <span className="text-slate-500">{lead.company || lead.country}</span>
                    </p>
                    <p className="text-[11px] text-brand-600 dark:text-brand-400 font-semibold truncate">
                      {lead.serviceNeeded} ({lead.budget})
                    </p>
                  </div>
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800 shrink-0">
                    {lead.status || 'New'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-500 dark:text-slate-400">
              No inbound leads captured yet.
            </div>
          )}
        </div>

        {/* Recent Contact Messages */}
        <div className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Inbox className="w-4 h-4 text-emerald-600" />
              <span>Direct Messages Inbox</span>
            </h2>
            <Link to="/admin/messages" className="text-xs font-semibold text-brand-600 hover:underline">
              View Inbox
            </Link>
          </div>

          {metrics.recentMessages && metrics.recentMessages.length > 0 ? (
            <div className="space-y-3">
              {metrics.recentMessages.map((msg) => (
                <div
                  key={msg._id}
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-navy-850 border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4"
                >
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {msg.name} ({msg.email})
                    </p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 truncate">
                      {msg.subject || msg.message}
                    </p>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-500 dark:text-slate-400">
              No direct messages in inbox yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

