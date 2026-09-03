import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, Compass, Layout, Code2, Rocket } from 'lucide-react';

export default function ProcessSection() {
  const { t, language } = useLanguage();

  const steps = [
    {
      number: '01',
      icon: Compass,
      title: t('process.step1.title'),
      desc: t('process.step1.desc')
    },
    {
      number: '02',
      icon: Layout,
      title: t('process.step2.title'),
      desc: t('process.step2.desc')
    },
    {
      number: '03',
      icon: Code2,
      title: t('process.step3.title'),
      desc: t('process.step3.desc')
    },
    {
      number: '04',
      icon: Rocket,
      title: t('process.step4.title'),
      desc: t('process.step4.desc')
    }
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-white dark:bg-navy-900 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-start max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('process.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
            {t('process.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {t('process.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative rounded-3xl bg-slate-50/70 dark:bg-navy-850/70 border border-slate-200/90 dark:border-slate-800/80 p-8 shadow-sm hover:shadow-luxury dark:hover:shadow-luxury-dark transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black font-mono text-brand-600 dark:text-brand-400">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {step.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

