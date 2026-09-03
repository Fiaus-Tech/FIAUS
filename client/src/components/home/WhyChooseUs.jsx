import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe2, Code2, Bot, MessageSquareText, Shield, Sparkles } from 'lucide-react';

export default function WhyChooseUs() {
  const { t } = useLanguage();

  const pillars = [
    {
      icon: Globe2,
      title: t('whyUs.p1.title'),
      desc: t('whyUs.p1.desc')
    },
    {
      icon: Code2,
      title: t('whyUs.p2.title'),
      desc: t('whyUs.p2.desc')
    },
    {
      icon: Bot,
      title: t('whyUs.p3.title'),
      desc: t('whyUs.p3.desc')
    },
    {
      icon: MessageSquareText,
      title: t('whyUs.p4.title'),
      desc: t('whyUs.p4.desc')
    }
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-slate-50/60 dark:bg-navy-950/60 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-start max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('whyUs.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
            {t('whyUs.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-white dark:bg-navy-900 border border-slate-200/90 dark:border-slate-800/90 p-7 shadow-sm hover:shadow-luxury dark:hover:shadow-luxury-dark hover:border-brand-500/40 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/80 border border-brand-200/80 dark:border-brand-800/80 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2.5">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

