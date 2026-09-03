import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Compass, ArrowLeft, ArrowRight } from 'lucide-react';

export default function NotFoundPage() {
  const { t, isRTL, language } = useLanguage();

  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-28 pb-16 bg-white dark:bg-navy-900 transition-colors">
      <div className="max-w-md mx-auto px-4 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto shadow-md">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <span className="text-6xl font-black font-mono text-brand-600 dark:text-brand-400 block tracking-tight">
          404
        </span>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          {t('common.notFound')}
        </h1>

        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {t('common.notFoundDesc')}
        </p>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md transition-all"
          >
            {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{t('common.backHome')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
