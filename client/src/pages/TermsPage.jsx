import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FileText } from 'lucide-react';

export default function TermsPage() {
  const { language } = useLanguage();

  return (
    <div className="pt-28 pb-24 bg-white dark:bg-navy-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300">
            <FileText className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'الأحكام والشروط' : 'TERMS & CONDITIONS'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            {language === 'ar' ? 'الشروط والأحكام' : 'Terms & Conditions'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'ar' ? 'آخر تحديث: سبتمبر 2026' : 'Last updated: September 2026'}
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-8 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {language === 'ar' ? '1. شروط تقديم الخدمات البرمجية' : '1. Service Scope & Agreements'}
            </h2>
            <p>
              {language === 'ar'
                ? 'يتم تقديم جميع الحلول البرمجية وهندسة الويب ودمج الذكاء الاصطناعي وفقاً لعقود ومواثيق تسليم محددة المعالم والمراحل المتفق عليها كتابياً بين فياوس تك والعميل.'
                : 'All engineering deliverables, custom AI integrations, and digital solutions are provided in accordance with mutually agreed milestones and documented scope of work.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {language === 'ar' ? '2. الملكية الفكرية والأكواد' : '2. Intellectual Property'}
            </h2>
            <p>
              {language === 'ar'
                ? 'عند استكمال جميع مستحقات المشروع، تنتقل كامل حقوق الملكية الفكرية للأكواد المخصصة والواجهات البرمجية إلى العميل وفقاً للاتفاق المبرم.'
                : 'Upon completion and settlement of project milestones, full intellectual property and code ownership for custom builds are transferred to the client.'}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
