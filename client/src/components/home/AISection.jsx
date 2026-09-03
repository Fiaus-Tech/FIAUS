import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Cpu,
  Bot,
  Zap,
  MessageSquare,
  ArrowUpRight,
  Database,
  Network,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function AISection({ onOpenStartProject }) {
  const { t, isRTL, language } = useLanguage();

  return (
    <section
      id="ai-solutions"
      className="relative py-24 sm:py-32 bg-white dark:bg-navy-900 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors overflow-hidden"
    >
      {/* Background glowing gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 dark:bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-start max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300">
            <Cpu className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
            <span>{t('ai.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
            {t('ai.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {t('ai.subtitle')}
          </p>
        </div>

        {/* 3 AI Pillars Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Pillar 1 */}
          <div className="relative rounded-3xl bg-slate-50/80 dark:bg-navy-850/80 border border-slate-200/90 dark:border-slate-800/80 p-8 shadow-sm hover:shadow-luxury dark:hover:shadow-luxury-dark hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-brand-600/10 dark:bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bot className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {t('ai.card1.title')}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('ai.card1.desc')}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 text-xs font-semibold text-brand-600 dark:text-brand-400">
              <Database className="w-4 h-4" />
              <span>{language === 'ar' ? 'ربط قواعد البيانات والمعرفة RAG' : 'RAG & Custom Vector Knowledge'}</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="relative rounded-3xl bg-slate-50/80 dark:bg-navy-850/80 border border-slate-200/90 dark:border-slate-800/80 p-8 shadow-sm hover:shadow-luxury dark:hover:shadow-luxury-dark hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Zap className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {t('ai.card2.title')}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('ai.card2.desc')}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 text-xs font-semibold text-sky-600 dark:text-sky-400">
              <Network className="w-4 h-4" />
              <span>{language === 'ar' ? 'مزامنة CRM وبوابات الويب' : 'CRM & Webhook Pipeline Sync'}</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="relative rounded-3xl bg-slate-50/80 dark:bg-navy-850/80 border border-slate-200/90 dark:border-slate-800/80 p-8 shadow-sm hover:shadow-luxury dark:hover:shadow-luxury-dark hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {t('ai.card3.title')}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('ai.card3.desc')}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>{language === 'ar' ? 'واجهة واتساب السحابية الرسمية Meta' : 'Official Meta WhatsApp Cloud API'}</span>
            </div>
          </div>
        </div>

        {/* Feature Integration Banner */}
        <div className="relative rounded-3xl bg-slate-900 dark:bg-navy-950 p-8 sm:p-14 text-white border border-brand-800/60 shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-600/15 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 max-w-2xl text-start z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'دمج الذكاء الاصطناعي المؤسسي' : 'Enterprise AI Integration'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {language === 'ar'
                ? 'جاهز لأتمتة عمليات شركتك وتطوير تجربة عملائك؟'
                : 'Ready to automate your operations and unlock new growth?'}
            </h3>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {language === 'ar'
                ? 'نصمم ونربط حلول الذكاء الاصطناعي والأتمتة المخصصة مباشرة مع بنيتكم التقنية الحالية بأعلى معايير الأمان والسرعة.'
                : 'We engineer tailored AI copilot architectures and webhook automations that integrate directly with your current technology stack.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full lg:w-auto z-10 shrink-0">
            <button
              onClick={onOpenStartProject}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-xl shadow-lg hover:shadow-glow transition-all duration-200 group"
            >
              <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>{t('hero.ctaPrimary')}</span>
              <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </button>

            <a
              href="https://wa.me/966511269264"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>{language === 'ar' ? 'محادثة واتساب سريعة' : 'Quick WhatsApp Chat'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

