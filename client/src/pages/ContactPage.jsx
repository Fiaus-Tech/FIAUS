import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { submitContact } from '../services/api';
import {
  Mail,
  Phone,
  MessageCircle,
  Globe,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';

export default function ContactPage() {
  const { t, isRTL, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Agency Inquiry',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await submitContact(formData);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Unable to send message. Please reach out via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const socials = [
    { name: 'Facebook', url: 'https://facebook.com/fiaustech' },
    { name: 'Instagram', url: 'https://instagram.com/fiaustech' },
    { name: 'X (Twitter)', url: 'https://x.com/fiaus_tech' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/fiaus-tech' },
    { name: 'GitHub', url: 'https://github.com/Fiaus-Tech' },
    { name: 'YouTube', url: 'https://youtube.com/@FiausTech' },
    { name: 'Telegram', url: 'https://t.me/fiaustech' },
    { name: 'TikTok', url: 'https://tiktok.com/@fiaustech' },
    { name: 'Snapchat', url: 'https://snapchat.com/add/fiaustech' }
  ];

  return (
    <div className="pt-28 pb-24 bg-white dark:bg-navy-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('contact.badge')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
            {t('contact.title')}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Direct Info Cards & Socials */}
          <div className="lg:col-span-5 space-y-6">
            {/* WhatsApp Direct Chat Card */}
            <div className="rounded-3xl bg-emerald-500/10 border border-emerald-500/20 p-6 sm:p-8 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {t('contact.chatWhatsApp')}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {language === 'ar'
                  ? 'تواصل مباشرة مع فريق فياوس تك عبر الواتساب للرد السريع على استفساراتك.'
                  : 'Fastest response time. Chat directly with a technical team member.'}
              </p>
              <a
                href="https://wa.me/966511269264"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all"
              >
                <span dir="ltr">+966 51 126 9264</span>
                <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </a>
            </div>

            {/* Email Card */}
            <div className="rounded-3xl bg-slate-50/80 dark:bg-navy-850/80 border border-slate-200/90 dark:border-slate-800/80 p-6 sm:p-8 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                {t('contact.emailLabel')}
              </h4>
              <a
                href="mailto:fiaustech@hotmail.com"
                className="text-base font-bold text-slate-900 dark:text-white hover:text-brand-600 transition-colors block"
              >
                fiaustech@hotmail.com
              </a>
            </div>

            {/* Regional Hubs */}
            <div className="rounded-3xl bg-slate-50/80 dark:bg-navy-850/80 border border-slate-200/90 dark:border-slate-800/80 p-6 sm:p-8 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
                {t('contact.regionsLabel')}
              </h4>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                {t('contact.regionsValue')}
              </p>
            </div>

            {/* Social Grid */}
            <div className="rounded-3xl bg-slate-50/80 dark:bg-navy-850/80 border border-slate-200/90 dark:border-slate-800/80 p-6 sm:p-8 space-y-4">
              <h4 className="text-xs uppercase tracking-wider font-bold text-slate-900 dark:text-white">
                {t('contact.socialTitle')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-500 transition-all shadow-2xs"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-slate-50/80 dark:bg-navy-850/80 border border-slate-200/90 dark:border-slate-800/80 p-8 sm:p-12 shadow-luxury dark:shadow-luxury-dark">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
                {t('contact.sendMessage')}
              </h3>

              {success ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                    {language === 'ar' ? 'تم إرسال رسالتك بنجاح' : 'Message Sent Successfully'}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {language === 'ar'
                      ? 'شكراً لتواصلك. سنقوم بالرد عليك عبر البريد الإلكتروني أو الواتساب في أقرب وقت.'
                      : 'Thank you for reaching out. We will get back to you promptly.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        {t('contact.formName')} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        {t('contact.formEmail')} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      {t('contact.formSubject')}
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      {t('contact.formMessage')} *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-xl shadow-md hover:shadow-glow transition-all duration-200 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? t('common.loading') : t('contact.formSubmit')}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
