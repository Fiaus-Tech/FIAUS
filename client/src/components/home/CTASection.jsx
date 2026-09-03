import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, ArrowUpRight, MessageCircle } from 'lucide-react';

export default function CTASection({ onOpenStartProject }) {
  const { t, isRTL, language } = useLanguage();

  return (
    <section className="relative py-20 bg-white dark:bg-navy-900 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl bg-slate-900 dark:bg-navy-950 p-8 sm:p-14 text-white border border-brand-700/50 dark:border-brand-800/60 shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Subtle Ambient Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 max-w-2xl text-start z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500/25 text-brand-300 border border-brand-500/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('footer.descriptor')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {language === 'ar'
                ? 'جاهز لبدء مشروعك القادم مع فياوس تك؟'
                : 'Ready to elevate your digital presence and automate your growth?'}
            </h2>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {language === 'ar'
                ? 'تواصل مع فريقنا التقني اليوم لمناقشة أهدافك وبدء مرحلة التخطيط والتنفيذ المباشر.'
                : 'Connect with our senior technical architects today. We analyze your requirements and deliver a clear implementation plan.'}
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/25 rounded-xl transition-all"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>{language === 'ar' ? 'محادثة واتساب سريعة' : 'Quick WhatsApp Chat'}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
