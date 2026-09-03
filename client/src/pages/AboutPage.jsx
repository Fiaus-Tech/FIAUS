import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Globe, Cpu, ShieldCheck, Users, Target, Rocket, ArrowUpRight } from 'lucide-react';

export default function AboutPage({ onOpenStartProject }) {
  const { t, isRTL, language } = useLanguage();

  return (
    <div className="pt-28 pb-20 bg-white dark:bg-navy-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'عن فياوس تك' : 'ABOUT FIAUS TECH'}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
            {language === 'ar'
              ? 'نبني حلولاً رقمية وأنظمة ذكاء اصطناعي تقود المستقبل'
              : 'Engineering Purpose-Driven Digital Experiences & Intelligent AI Systems'}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {language === 'ar'
              ? 'فياوس تك هي وكالة رقمية وحلول ذكاء اصطناعي حديثة، تأسست لتمكين الشركات الطموحة في المملكة العربية السعودية وبنغلاديش والعالم من خلال أنظمة تقنية عالية الكفاءة وتطبيقات مخصصة.'
              : 'FIAUS Tech is an international Digital & AI Agency engineered to empower forward-looking businesses across Bangladesh, Saudi Arabia, and global markets with high-performance web systems, custom AI automation, and scalable cloud products.'}
          </p>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <div className="rounded-3xl bg-slate-50/80 dark:bg-navy-850/80 border border-slate-200/90 dark:border-slate-800/80 p-8 sm:p-10 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              {language === 'ar' ? 'رؤيتنا الاستراتيجية' : 'Our Strategic Vision'}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {language === 'ar'
                ? 'أن نكون الشريك التقني الموثوق للمؤسسات الرائدة التي تسعى لتحويل عملياتها نحو الأتمتة الكاملة والريادة الرقمية عبر حلول هندسية متينة وواجهات مستخدم استثنائية.'
                : 'To serve as the premier engineering partner for enterprises seeking full operational automation and market leadership through resilient software architecture and conversion-centric design.'}
            </p>
          </div>

          <div className="rounded-3xl bg-slate-50/80 dark:bg-navy-850/80 border border-slate-200/90 dark:border-slate-800/80 p-8 sm:p-10 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center mb-6">
              <Rocket className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              {language === 'ar' ? 'شعارنا وقيمنا الأساسية' : 'Tagline & Core Principles'}
            </h3>
            <p className="text-base font-semibold text-brand-600 dark:text-brand-400 mb-2">
              “{t('hero.tagline')}”
            </p>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {language === 'ar'
                ? 'الابتكار في كل سطر برمجي، الأتمتة لتحرير الوقت وتخفيض التكاليف، والنمو كهدف نهائي يقاس بنتائج حقيقية لأعمال عملائنا.'
                : 'Innovation in architectural design, automation to eliminate friction and overhead, and sustainable growth measured by tangible client success.'}
            </p>
          </div>
        </div>

        {/* Global Delivery Hubs */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-navy-950 p-8 sm:p-12 text-white border border-slate-800 mb-20 shadow-xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30">
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'نطاق الخدمة الدولي' : 'INTERNATIONAL REACH'}</span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              {language === 'ar'
                ? 'نخدم العملاء في المملكة العربية السعودية وبنغلاديش وحول العالم'
                : 'Serving Clients in Saudi Arabia, Bangladesh, and Worldwide'}
            </h2>
            <p className="text-slate-300 leading-relaxed">
              {language === 'ar'
                ? 'بفضل خبرتنا في بناء الأنظمة ثنائية اللغة (العربية والإنجليزية) وفهمنا لمتطلبات الأسواق المحلية والدولية، نقدم تجربة تعاون مرنة وسلسة عبر جميع المناطق الزمنية.'
                : 'With bilingual engineering expertise (English & Arabic RTL) and an in-depth understanding of high-growth markets, we deliver frictionless collaboration across regional and international timezones.'}
            </p>
          </div>
        </div>

        {/* Team Section (Graceful, truthful growing team presentation) */}
        <div className="rounded-3xl bg-slate-50/70 dark:bg-navy-850/70 border border-slate-200/90 dark:border-slate-800/80 p-8 sm:p-12 text-center space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400 flex items-center justify-center mx-auto">
            <Users className="w-7 h-7" />
          </div>
          <div className="max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {language === 'ar' ? 'فريقنا التقني في توسع مستمر' : 'Our Engineering Team is Expanding'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {language === 'ar'
                ? 'تضم فياوس تك نخبة من المطورين ومهندسي الذكاء الاصطناعي والمصممين. يتم إدارة تحديثات أعضاء الفريق مباشرة عبر لوحة التحكم مع كل مرحلة توسع جديدة.'
                : 'FIAUS Tech brings together specialized software architects, AI engineers, and UI/UX designers. Dedicated team profiles and leadership directories are dynamically managed via our CMS dashboard.'}
            </p>
          </div>
          <div className="pt-2">
            <button
              onClick={onOpenStartProject}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-md transition-all"
            >
              <span>{t('hero.ctaPrimary')}</span>
              <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
