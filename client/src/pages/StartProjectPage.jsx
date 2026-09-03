import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { submitLeadInquiry } from '../services/api';
import {
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Mail,
  Phone,
  ShieldCheck,
  Clock
} from 'lucide-react';

export default function StartProjectPage() {
  const { t, isRTL, language } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    country: 'Saudi Arabia',
    company: '',
    serviceNeeded: 'Web Development',
    budget: '$3,000 - $5,000',
    projectDetails: '',
    preferredContact: 'WhatsApp'
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
      await submitLeadInquiry(formData);
      setSuccess(true);
    } catch (err) {
      setError(err.message || t('leadForm.errorMessage'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-white dark:bg-navy-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('leadForm.badge')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
            {t('leadForm.title')}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {t('leadForm.subtitle')}
          </p>
        </div>

        {/* Card Form */}
        <div className="rounded-3xl bg-slate-50/80 dark:bg-navy-850/80 border border-slate-200/90 dark:border-slate-800/80 p-8 sm:p-12 shadow-luxury dark:shadow-luxury-dark">
          {success ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                {t('leadForm.successTitle')}
              </h2>
              <p className="text-base text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                {t('leadForm.successMessage')}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    {t('leadForm.fullName')} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('leadForm.fullNamePlaceholder')}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    {t('leadForm.email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('leadForm.emailPlaceholder')}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    {t('leadForm.whatsapp')}
                  </label>
                  <input
                    type="text"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder={t('leadForm.whatsappPlaceholder')}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    {t('leadForm.country')}
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                  >
                    <option value="Saudi Arabia">Saudi Arabia (المملكة العربية السعودية)</option>
                    <option value="Bangladesh">Bangladesh (বাংলাদেশ)</option>
                    <option value="United Arab Emirates">United Arab Emirates (الإمارات)</option>
                    <option value="Qatar">Qatar (قطر)</option>
                    <option value="Kuwait">Kuwait (الكويت)</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="International / Other">International / Other</option>
                  </select>
                </div>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    {t('leadForm.service')}
                  </label>
                  <select
                    name="serviceNeeded"
                    value={formData.serviceNeeded}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                  >
                    <option value="Web Development">Web & Frontend Development</option>
                    <option value="Full-Stack Development">Full-Stack Platform Engineering</option>
                    <option value="AI Solutions">Custom AI & LLM Solutions</option>
                    <option value="AI Automation">Workflow & Process Automation</option>
                    <option value="WhatsApp Marketing & AI">WhatsApp AI & Marketing</option>
                    <option value="E-Commerce">E-Commerce Architecture</option>
                    <option value="Google & Meta Ads">Google & Meta Ads Growth</option>
                    <option value="UI/UX & Branding">Luxury UI/UX & Brand Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                    {t('leadForm.budget')}
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                  >
                    <option value="$1,500 - $3,000">$1,500 - $3,000 (MVP / Launchpad)</option>
                    <option value="$3,000 - $5,000">$3,000 - $5,000 (Standard Platform)</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000 (Comprehensive System)</option>
                    <option value="$10,000+">$10,000+ (Enterprise / Scaled AI)</option>
                    <option value="To be discussed">Flexible / To be discussed</option>
                  </select>
                </div>
              </div>

              {/* Project Details */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  {t('leadForm.details')} *
                </label>
                <textarea
                  name="projectDetails"
                  required
                  rows={5}
                  value={formData.projectDetails}
                  onChange={handleChange}
                  placeholder={t('leadForm.detailsPlaceholder')}
                  className="w-full px-4 py-3.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 resize-none"
                />
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  {t('leadForm.preferredContact')}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {['WhatsApp', 'Email', 'Telegram', 'Phone'].map((channel) => (
                    <button
                      type="button"
                      key={channel}
                      onClick={() => setFormData({ ...formData, preferredContact: channel })}
                      className={`px-4 py-2.5 text-xs font-semibold rounded-xl border transition-all ${
                        formData.preferredContact === channel
                          ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                          : 'bg-white dark:bg-navy-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-brand-500'
                      }`}
                    >
                      {channel}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2.5 py-4 px-8 text-base font-bold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-xl shadow-md hover:shadow-glow transition-all duration-200 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? t('leadForm.submitting') : t('leadForm.submit')}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
