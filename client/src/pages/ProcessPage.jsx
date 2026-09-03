import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Compass,
  Target,
  FileCode,
  Layout,
  Code2,
  Cpu,
  ShieldCheck,
  Rocket,
  LineChart,
  Sparkles,
  ArrowUpRight,
  MessageSquare,
  CheckCircle2,
  Layers,
  Clock
} from 'lucide-react';

export default function ProcessPage({ onOpenStartProject }) {
  const { t, isRTL, language } = useLanguage();

  const fullProcess = [
    {
      step: '01',
      icon: Compass,
      title: language === 'ar' ? '1. الاستكشاف وجلسة التعمق' : '1. Discovery & Needs Assessment',
      duration: language === 'ar' ? 'الأسبوع 1' : 'Week 1',
      desc: language === 'ar'
        ? 'نعقد جلسات تفصيلية لفهم نموذج أعمالك، الجمهور المستهدف في السعودية وبنغلاديش أو دولياً، والتحديات التقنية التي تواجهها.'
        : 'In-depth stakeholder sessions to analyze your core business model, target demographics across Saudi Arabia, Bangladesh, or globally, and technical constraints.',
      deliverables: [
        language === 'ar' ? 'وثيقة نطاق العمل التفصيلي (Scope of Work)' : 'Project Scope Document',
        language === 'ar' ? 'تحليل مسارات المستخدم المستهدفة' : 'User Journey & Persona Mapping',
        language === 'ar' ? 'تحديد المتطلبات الوظيفية وغير الوظيفية' : 'Functional & Security Requirements'
      ]
    },
    {
      step: '02',
      icon: Target,
      title: language === 'ar' ? '2. الاستراتيجية والجدوى التقنية' : '2. Strategy & Technical Feasibility',
      duration: language === 'ar' ? 'الأسبوع 1 - 2' : 'Week 1–2',
      desc: language === 'ar'
        ? 'تحديد حزمة التقنيات المناسبة، البنية السحابية، واستراتيجية التوسع وقابلية التحمل لأعلى معدلات الزوار.'
        : 'Aligning technology selection (React, Node.js, Cloud APIs) with scalability requirements, cost efficiency, and performance benchmarks.',
      deliverables: [
        language === 'ar' ? 'خارطة الطريق الزمنية والمراحل' : 'Milestone Delivery Roadmap',
        language === 'ar' ? 'مخطط تكامل الأنظمة السحابية' : 'Cloud Architecture Blueprint',
        language === 'ar' ? 'مصفوفة اختيار الأدوات ونماذج الذكاء الاصطناعي' : 'Tooling & AI Model Selection Matrix'
      ]
    },
    {
      step: '03',
      icon: FileCode,
      title: language === 'ar' ? '3. التخطيط وهيكلة قواعد البيانات' : '3. Planning & Architecture Design',
      duration: language === 'ar' ? 'الأسبوع 2' : 'Week 2',
      desc: language === 'ar'
        ? 'بناء المخطط المعماري لقواعد البيانات (Database Schema)، الواجهات البرمجية REST/GraphQL، وإجراءات الأمان.'
        : 'Structuring robust database models, API endpoint specifications, role-based access controls, and rate-limiting security layers.',
      deliverables: [
        language === 'ar' ? 'مخطط علاقات البيانات (Database Schema)' : 'Database ERD & Schema Design',
        language === 'ar' ? 'توثيق مواصفات الـ APIs' : 'API Contract Documentation',
        language === 'ar' ? 'بروتوكولات الأمان والتشفير' : 'Security & Encryption Protocol Specs'
      ]
    },
    {
      step: '04',
      icon: Layout,
      title: language === 'ar' ? '4. تصميم واجهات وتجربة المستخدم (UI/UX)' : '4. UI/UX & Interactive Prototyping',
      duration: language === 'ar' ? 'الأسبوع 2 - 3' : 'Week 2–3',
      desc: language === 'ar'
        ? 'تصميم نماذج تفاعلية تجسد الفخامة والبساطة، مع دعم كامل للغتين العربية (RTL) والإنجليزية والوضع الليلي/النهاري.'
        : 'Crafting luxury, high-conversion user interfaces with complete Light/Dark themes, responsive mobile-first layouts, and native Arabic RTL typography.',
      deliverables: [
        language === 'ar' ? 'نماذج أولية تفاعلية على Figma' : 'Interactive Figma High-Fidelity Prototypes',
        language === 'ar' ? 'نظام التصميم والأيقونات الموحدة' : 'Design System & Token Library',
        language === 'ar' ? 'مواءمة تجربة الجوال والشاشات المختلفة' : 'Mobile & Tablet Viewport Specifications'
      ]
    },
    {
      step: '05',
      icon: Code2,
      title: language === 'ar' ? '5. التطوير البرمجي المتكامل (Full-Stack)' : '5. Full-Stack Development',
      duration: language === 'ar' ? 'الأسبوع 3 - 5' : 'Week 3–5',
      desc: language === 'ar'
        ? 'كتابة أكواد نظيفة ونموذجية باستخدام أحدث تقنيات React و Node.js بدون قوالب جاهزة هشة، مع معالجة سريعة للبيانات.'
        : 'Clean, modular engineering across frontend and backend layers with zero reliance on fragile themes or unnecessary overhead.',
      deliverables: [
        language === 'ar' ? 'تطبيقات React التفاعلية السريعة' : 'Performant React Client Application',
        language === 'ar' ? 'خوادم Express وقواعد بيانات مرنة' : 'Resilient Express API & Database Services',
        language === 'ar' ? 'لوحة تحكم إدارية CMS متكاملة' : 'Integrated Admin CMS Dashboard'
      ]
    },
    {
      step: '06',
      icon: Cpu,
      title: language === 'ar' ? '6. دمج الذكاء الاصطناعي والأتمتة' : '6. AI & Automation Integration',
      duration: language === 'ar' ? 'الأسبوع 4 - 6' : 'Week 4–6',
      desc: language === 'ar'
        ? 'دمج وكلاء الذكاء الاصطناعي، مسارات الـ Webhooks، وروبوتات واتساب الرسمية لربط العمليات تلقائياً.'
        : 'Integrating domain-tailored AI agents, automated webhook pipelines, and official WhatsApp Cloud APIs for autonomous operations.',
      deliverables: [
        language === 'ar' ? 'روبوتات واتساب للأعمال وخدمة العملاء' : 'Official WhatsApp Cloud API Automation',
        language === 'ar' ? 'مسارات Webhooks لمزامنة البيانات' : 'Automated CRM & Payment Webhooks',
        language === 'ar' ? 'وكلاء ومساعدو الذكاء الاصطناعي RAG' : 'Private Knowledge Retrieval Models'
      ]
    },
    {
      step: '07',
      icon: ShieldCheck,
      title: language === 'ar' ? '7. الاختبار وضمان الجودة الصارم (QA)' : '7. Testing & Quality Assurance',
      duration: language === 'ar' ? 'الأسبوع 5 - 6' : 'Week 5–6',
      desc: language === 'ar'
        ? 'اختبار شامل عبر الهواتف والمتصفحات المختلفة، فحص الثغرات الأمنية، واختبار سرعة مؤشرات Core Web Vitals.'
        : 'Comprehensive cross-browser, cross-device testing, stress testing, security audits, and Core Web Vitals performance tuning.',
      deliverables: [
        language === 'ar' ? 'تقرير التوافق والأجهزة المتعددة' : 'Multi-Device Compatibility Report',
        language === 'ar' ? 'اختبارات مؤشرات السرعة Core Web Vitals' : 'Speed & Lighthouse 95+ Score Audit',
        language === 'ar' ? 'مراجعة معايير الحماية والأمان' : 'Security Headers & Input Sanitization Audit'
      ]
    },
    {
      step: '08',
      icon: Rocket,
      title: language === 'ar' ? '8. الإطلاق السحابي وتهيئة محركات البحث' : '8. Cloud Launch & Indexing',
      duration: language === 'ar' ? 'الأسبوع 6' : 'Week 6',
      desc: language === 'ar'
        ? 'نشر النظام على خوادم سحابية عالمية (Vercel / AWS)، ربط النطاقات، إعداد شهادات SSL، وضبط ملفات sitemap و robots.txt.'
        : 'Production deployment to global cloud edge networks, custom domain DNS configuration, SSL setup, and automated search engine indexing.',
      deliverables: [
        language === 'ar' ? 'نشر سحابي على Vercel / Cloud Edge' : 'Global Edge Cloud Deployment',
        language === 'ar' ? 'تهيئة ملفات الـ SEO و Schema.org' : 'SEO Structured Data & Sitemap Submission',
        language === 'ar' ? 'ربط أدوات التتبع (GA4, Pixel, Search Console)' : 'Analytics & Conversion Tracking Activation'
      ]
    },
    {
      step: '09',
      icon: LineChart,
      title: language === 'ar' ? '9. المتابعة والتحسين المستمر والدعم' : '9. Optimization & Ongoing Support',
      duration: language === 'ar' ? 'مستمر' : 'Ongoing',
      desc: language === 'ar'
        ? 'دعم فني مستمر، مراقبة استقرار الخوادم، وتحسين معدلات التحويل بناءً على تحليلات وسلوك المستخدمين الحقيقيين.'
        : 'Continuous telemetry monitoring, proactive maintenance, and iterative feature enhancements to ensure sustained business growth.',
      deliverables: [
        language === 'ar' ? 'مراقبة التوافر السحابي (Uptime Monitoring)' : '24/7 Server Uptime Monitoring',
        language === 'ar' ? 'تحديثات أمنية ودورية' : 'Scheduled Maintenance & Security Patches',
        language === 'ar' ? 'تقارير أداء دورية وتوصيات تحسين' : 'Monthly Performance & Optimization Reviews'
      ]
    }
  ];

  return (
    <div className="pt-28 pb-24 bg-white dark:bg-navy-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-4xl mb-20 space-y-6 text-start">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'منهجية العمل والشفافية' : 'OUR ENGINEERING PROCESS'}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
            {language === 'ar'
              ? 'إطار هندسي من 9 مراحل يضمن الدقة والشفافية'
              : 'Our 9-Phase Engineering Delivery Framework'}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {language === 'ar'
              ? 'منهجية واضحة وموثقة تبدأ من دراسة الفكرة وحتى الإطلاق والنمو المستمر، مع تسليم مبني على مراحل واضحة وتواصل مباشر أسبوعياً.'
              : 'A disciplined, milestone-driven development process ensuring predictable outcomes, robust security, and seamless communication from kickoff to post-launch scaling.'}
          </p>
        </div>

        {/* 9 Process Steps Detailed Timeline */}
        <div className="space-y-10 mb-24">
          {fullProcess.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative rounded-3xl bg-slate-50/80 dark:bg-navy-850/80 border border-slate-200/90 dark:border-slate-800/80 p-8 sm:p-10 shadow-sm hover:shadow-luxury dark:hover:shadow-luxury-dark hover:border-brand-500/40 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Number & Title */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-3xl font-black text-brand-600 dark:text-brand-400">
                        {item.step}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-200/70 dark:bg-navy-800 text-slate-700 dark:text-slate-300">
                        <Clock className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                        <span>{item.duration}</span>
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>

                  {/* Right Column: Key Deliverables */}
                  <div className="lg:col-span-7 bg-white dark:bg-navy-900 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 p-6 space-y-3">
                    <span className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 block mb-2">
                      {language === 'ar' ? 'مخرجات هذه المرحلة:' : 'Phase Deliverables & Verification:'}
                    </span>
                    <ul className="space-y-2.5">
                      {item.deliverables.map((del, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* High-Contrast CTA Section */}
        <div className="relative rounded-3xl bg-slate-900 dark:bg-navy-950 p-8 sm:p-14 text-white border border-brand-800/60 shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-start z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'هندسة بدون مفاجآت' : 'Predictable Execution'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {language === 'ar'
                ? 'هل أنت مستعد لبدء المرحلة الأولى من مشروعك؟'
                : 'Ready to initiate Phase 1 of your digital product?'}
            </h3>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {language === 'ar'
                ? 'تواصل مع فريقنا التقني اليوم لمناقشة أهدافك وبدء مرحلة الاستكشاف والتخطيط المباشر.'
                : 'Schedule an initial discovery consultation with our senior architects to map out your technical scope and milestones.'}
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
    </div>
  );
}

