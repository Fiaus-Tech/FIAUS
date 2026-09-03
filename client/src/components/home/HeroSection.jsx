import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import HeroScene from '../3d/HeroScene';
import { Sparkles, ArrowUpRight, ShieldCheck, Cpu, Globe } from 'lucide-react';

export default function HeroSection({ onOpenStartProject }) {
  const { t, isRTL, language } = useLanguage();

  const scrollToWork = () => {
    const el = document.getElementById('selected-work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-white dark:bg-navy-900 transition-colors">
      {/* Background Subtle Tech Grid & Radial Glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-start space-y-6">
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-brand-600 dark:bg-brand-400 animate-pulse" />
              <span>{t('hero.badge')}</span>
            </div>

            {/* Tagline / Subtitle */}
            <p className="text-sm sm:text-base font-bold text-brand-600 dark:text-brand-400 tracking-wide">
              {t('hero.tagline')}
            </p>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.15]">
              {t('hero.titleLine1')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-sky-500 dark:from-brand-400 dark:to-sky-300">
                {t('hero.titleHighlight')}
              </span>{' '}
              {t('hero.titleLine2')}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
              {t('hero.subhead')}
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <button
                onClick={onOpenStartProject}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-base font-semibold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-xl shadow-md hover:shadow-glow transition-all duration-200 group"
              >
                <Sparkles className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>{t('hero.ctaPrimary')}</span>
                <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={scrollToWork}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-800 dark:text-slate-100 bg-slate-100/80 dark:bg-navy-800/80 hover:bg-slate-200 dark:hover:bg-navy-750 border border-slate-200 dark:border-slate-700/80 rounded-xl transition-all"
              >
                <span>{t('hero.ctaSecondary')}</span>
              </button>
            </div>

            {/* Trust Pillars strip */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-slate-800/80 w-full grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                <span>{t('hero.trustBadges.global')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                <span>{t('hero.trustBadges.engineering')}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{t('hero.trustBadges.performance')}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Canvas */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full relative rounded-2xl overflow-hidden p-2">
              <HeroScene />
              
              {/* Subtle overlay helper tag */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[11px] font-medium bg-white/70 dark:bg-navy-900/80 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 shadow-sm pointer-events-none">
                {language === 'ar' ? 'نموذج ثلاثي الأبعاد تفاعلي • حرك المؤشر' : 'Interactive 3D Visualizer • Drag or Move'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

