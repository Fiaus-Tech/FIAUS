import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { submitLeadInquiry } from '../../services/api';
import {
  X,
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Mail,
  Phone,
  Paperclip,
  ArrowUpRight
} from 'lucide-react';

export default function StartProjectModal({ isOpen, onClose }) {
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

  if (!isOpen) return null;

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

  const resetAndClose = () => {
    setSuccess(false);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-navy-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-navy-850/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t('leadForm.title')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('leadForm.subtitle')}
              </p>
            </div>
          </div>

          <button
            onClick={resetAndClose}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {success ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white">
                {t('leadForm.successTitle')}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                {t('leadForm.successMessage')}
              </p>
              <div className="pt-4">
                <button
                  onClick={resetAndClose}
                  className="px-6 py-2.5 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-xl transition-all shadow-md"
                >
                  {t('common.close')}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Grid 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('leadForm.fullName')} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('leadForm.fullNamePlaceholder')}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('leadForm.email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('leadForm.emailPlaceholder')}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                  />
                </div>
              </div>

              {/* Grid 2: WhatsApp & Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('leadForm.whatsapp')}
                  </label>
                  <input
                    type="text"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder={t('leadForm.whatsappPlaceholder')}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('leadForm.country')}
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
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

              {/* Grid 3: Service Needed & Budget */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('leadForm.service')}
                  </label>
                  <select
                    name="serviceNeeded"
                    value={formData.serviceNeeded}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                    {t('leadForm.budget')}
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
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
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  {t('leadForm.details')} *
                </label>
                <textarea
                  name="projectDetails"
                  required
                  rows={4}
                  value={formData.projectDetails}
                  onChange={handleChange}
                  placeholder={t('leadForm.detailsPlaceholder')}
                  className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 resize-none"
                />
              </div>

              {/* Preferred Contact Method */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  {t('leadForm.preferredContact')}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['WhatsApp', 'Email', 'Telegram', 'Phone'].map((channel) => (
                    <button
                      type="button"
                      key={channel}
                      onClick={() => setFormData({ ...formData, preferredContact: channel })}
                      className={`px-3 py-2 text-xs font-semibold rounded-xl border transition-all ${
                        formData.preferredContact === channel
                          ? 'bg-brand-600 text-white border-brand-600 shadow-xs'
                          : 'bg-slate-50 dark:bg-navy-850 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {channel}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-xl shadow-md hover:shadow-glow transition-all duration-200 disabled:opacity-50"
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

