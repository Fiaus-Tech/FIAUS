import React, { useState, useEffect } from 'react';
import { fetchContactMessages } from '../../services/api';
import { Inbox, Mail, Phone, Clock, Trash2, CheckCircle2 } from 'lucide-react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const res = await fetchContactMessages();
        if (res.success && res.data) {
          setMessages(res.data);
        }
      } catch (e) {
        console.error('Failed to load messages', e);
      } finally {
        setLoading(false);
      }
    };
    loadMessages();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Direct Messages Inbox
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          General contact inquiries submitted via the public contact form.
        </p>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="py-12 text-center text-xs text-slate-500">Loading inbox...</div>
        ) : messages.length === 0 ? (
          <div className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-12 text-center text-xs text-slate-500">
            Your contact inbox is empty. No unread messages.
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id}
              className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {msg.name}
                  </h3>
                  <a
                    href={`mailto:${msg.email}`}
                    className="text-xs text-brand-600 dark:text-brand-400 hover:underline"
                  >
                    {msg.email}
                  </a>
                </div>
                <span className="text-[11px] text-slate-400">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>

              {msg.subject && (
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Subject: {msg.subject}
                </p>
              )}

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">
                {msg.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

