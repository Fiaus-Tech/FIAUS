import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Cpu,
  Bot,
  Zap,
  MessageSquare,
  Sparkles,
  ArrowUpRight,
  Database,
  Network,
  ShieldCheck,
  LineChart,
  Layers,
  FileCheck,
  CheckCircle2,
  Workflow,
  Headphones,
  Settings
} from 'lucide-react';

export default function AISolutionsPage({ onOpenStartProject }) {
  const { t, isRTL, language } = useLanguage();

  const offerings = [
    {
      icon: Bot,
      title: language === 'ar' ? 'وكلاء ومساعدو الذكاء الاصطناعي' : 'Custom AI Agents & Copilots',
      desc: language === 'ar'
        ? 'وكلاء أذكياء مدربون على بيانات ومعرفة شركتك لأداء المهام المعقدة، الرد على الاستفسارات، وتوجيه العمليات آلياً.'
        : 'Domain-specific autonomous agents trained on proprietary enterprise knowledge bases to assist teams, route operations, and process client requests.'
    },
    {
      icon: Workflow,
      title: language === 'ar' ? 'أتمتة العمليات والمهام (BPA)' : 'Business Process Automation (BPA)',
      desc: language === 'ar'
        ? 'تحويل الإجراءات اليدوية المتكررة إلى مسارات عمل مؤتمتة بين أنظمة CRM، البرامج المحاسبية، وبوابات الدفع.'
        : 'Automate repetitive back-office workflows, CRM record synchronization, invoicing triggers, and multi-platform data pipelines.'
    },
    {
      icon: MessageSquare,
      title: language === 'ar' ? 'أتمتة وروبوتات واتساب السحابية' : 'WhatsApp Cloud API & AI Chatbots',
      desc: language === 'ar'
        ? 'روبوتات محادثة تفاعلية على مدار الساعة عبر واجهة Meta الرسمية لتأهيل العملاء المحتملين والدعم الفوري.'
        : 'Official Meta WhatsApp Cloud API integration with conversational intelligence for 24/7 client onboarding, automated inquiries, and broadcast updates.'
    },
    {
      icon: Database,
      title: language === 'ar' ? 'البحث الذكي وقواعد المعرفة (RAG)' : 'Enterprise RAG & Knowledge Retrieval',
      desc: language === 'ar'
        ? 'بناء محركات استرجاع معرفي ذكية تتيح للفرق البحث واستخراج المعلومات الدقيقة من مئات المستندات في ثوانٍ.'
        : 'Vector database architectures allowing instant semantic search, compliance verification, and deep document intelligence across internal archives.'
    },
    {
      icon: FileCheck,
      title: language === 'ar' ? 'معالجة واستخراج بيانات المستندات' : 'Intelligent Document Processing',
      desc: language === 'ar'
        ? 'قراءة وتحليل العقود، الفواتير، ونماذج الطلبات آلياً باستخدام نماذج الرؤية الحاسوبية ومعالجة اللغة الطبيعية.'
        : 'Automated extraction, classification, and validation of invoices, receipts, contracts, and application forms directly into databases.'
    },
    {
      icon: LineChart,
      title: language === 'ar' ? 'تحليلات الأعمال والذكاء التنبؤي' : 'Predictive Intelligence & Insights',
      desc: language === 'ar'
        ? 'ربط البيانات التشغيلية بنماذج تحليلية متقدمة لاكتشاف الفرص، توقع اتجاهات الطلب، وتحسين اتخاذ القرارات.'
        : 'Actionable data pipelines connecting telemetry, customer engagement, and sales funnels to identify growth bottlenecks and automate reporting.'
    }
  ];

  const useCases = [
    {
      sector: language === 'ar' ? 'تأهيل العملاء وإدارة المبيعات' : 'Lead Qualification & Inbound Sales',
      desc: language === 'ar'
        ? 'الرد الفوري على استفسارات العملاء على واتساب والبريد، جمع متطلبات المشروع، وتعيين الصفقات للمسؤولين آلياً.'
        : 'Instant multi-channel response on WhatsApp and web forms, collecting technical requirements and routing qualified deals directly to sales CRM.'
    },
    {
      sector: language === 'ar' ? 'خدمة العملاء والدعم الفني 24/7' : '24/7 Customer Support & Triage',
      desc: language === 'ar'
        ? 'حل الأسئلة الشائعة فوراً وتصعيد الحالات المعقدة للمهندسين مع ملخص دقيق للمشكلة وسجل المحادثة.'
        : 'Resolve tier-1 support inquiries instantly and escalate critical tickets with conversation context summaries to human specialists.'
    },
    {
      sector: language === 'ar' ? 'مزامنة الأنظمة المتعددة والـ ERP' : 'ERP, CRM & Communications Sync',
      desc: language === 'ar'
        ? 'ربط قواعد البيانات، منصات التجارة، والأنظمة الداخلية بمسارات Webhooks سريعة بدون إدخال يدوي مكرر.'
        : 'Eliminate duplicate manual entry by synchronizing storefront orders, inventory logs, and accounting entries in real time.'
    },
    {
      sector: language === 'ar' ? 'أتمتة المستندات والتقارير الدورية' : 'Automated Reporting & Documents',
      desc: language === 'ar'
        ? 'توليد التقارير الإدارية، إعداد العروض الفنية، وتحليل الأداء التشغيلي بصورة دورية ومجدولة.'
        : 'Scheduled generation of operational KPIs, client summary proposals, and executive data digests delivered straight to team inboxes.'
    }
  ];

  const frameworkSteps = [
    {
      step: '01',
      title: language === 'ar' ? 'الاستكشاف وتحديد عنق الزجاجة' : 'Workflow Audit & Discovery',
      desc: language === 'ar'
        ? 'نحلل مسارات العمل اليدوية في مؤسستك ونحدد العمليات الأكثر استنزافاً للوقت والتكاليف لتوجيه الأتمتة نحو أعلى عائد.'
        : 'We analyze your internal workflows, identifying high-friction manual bottlenecks where AI automation yields immediate efficiency gains.'
    },
    {
      step: '02',
      title: language === 'ar' ? 'التصميم المعماري واختيار النماذج' : 'Architecture & Model Selection',
      desc: language === 'ar'
        ? 'نصمم بنية آمنة تدمج النماذج المناسبة (LLMs, Vector DBs, Cloud APIs) مع مراعاة سرية البيانات وسرعة المعالجة.'
        : 'We engineer a resilient architecture combining domain-tailored models, vector storage, and secure APIs aligned with enterprise privacy.'
    },
    {
      step: '03',
      title: language === 'ar' ? 'التطوير وربط الأنظمة عبر APIs' : 'Pipeline Engineering & Integration',
      desc: language === 'ar'
        ? 'بناء مسارات الـ Webhooks، وكلاء الذكاء الاصطناعي، وربطها بأنظمتكم الحالية (CRM, Database, WhatsApp) بدون توقف للخدمة.'
        : 'We construct end-to-end webhook pipelines, conversational agents, and data transformers connected seamlessly to your live systems.'
    },
    {
      step: '04',
      title: language === 'ar' ? 'الاختبار الصارم والإطلاق السحابي' : 'Validation, Deployment & Scaling',
      desc: language === 'ar'
        ? 'إجراء اختبارات دقيقة لضمان عدم وجود أخطاء في الردود أو مزامنة البيانات، مع مراقبة الأداء وتحديث النماذج باستمرار.'
        : 'Rigorous regression testing against hallucination benchmarks, followed by zero-downtime deployment and telemetry monitoring.'
    }
  ];

  return (
    <div className="pt-28 pb-24 bg-white dark:bg-navy-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dedicated Hero Section */}
        <div className="max-w-4xl mb-20 space-y-6 text-start">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300">
            <Cpu className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'حلول الذكاء الاصطناعي والأتمتة' : 'ENTERPRISE AI & AUTOMATION'}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
            {language === 'ar'
              ? 'تحويل العمليات اليدوية إلى منظومات ذاتية التشغيل والنمو'
              : 'Architecting Autonomous AI Agents & Intelligent Workflow Systems'}
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {language === 'ar'
              ? 'نساعد الشركات الرائدة في المملكة العربية السعودية وبنغلاديش ودولياً على خفض التكاليف التشغيلية ومضاعفة الإنتاجية عبر وكلاء ذكاء اصطناعي مخصصين، أتمتة مسارات العمل، والتكامل السحابي الشامل.'
              : 'FIAUS Tech engineers proprietary AI copilots, enterprise RAG knowledge systems, and multi-channel automation pipelines designed to eliminate operational friction and accelerate business velocity.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={onOpenStartProject}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-xl shadow-md hover:shadow-glow transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('hero.ctaPrimary')}</span>
              <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </button>

            <a
              href="https://wa.me/966511269264"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 dark:hover:bg-navy-750 border border-slate-200 dark:border-slate-700 rounded-xl transition-all"
            >
              <MessageSquare className="w-4 h-4 text-emerald-500" />
              <span>{language === 'ar' ? 'استشارة واتساب مباشرة' : 'Direct AI Consultation'}</span>
            </a>
          </div>
        </div>

        {/* Section 1: Core AI & Automation Solutions */}
        <div className="mb-24">
          <div className="max-w-3xl mb-12 space-y-3">
            <span className="text-xs uppercase tracking-wider font-bold text-brand-600 dark:text-brand-400">
              {language === 'ar' ? 'قدراتنا في الذكاء الاصطناعي' : 'Core AI Offerings'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              {language === 'ar' ? 'حلول مصممة خصيصاً لاحتياجات أعمالك' : 'Engineered For Enterprise Scale & Reliability'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
              {language === 'ar'
                ? 'لا نعتمد على الأدوات العامة، بل نبني حلولاً مخصصة تندمج مباشرة مع بنيتكم التحتية وقواعد بياناتكم.'
                : 'We build tailored architectures connecting private enterprise datasets with advanced language models and automated execution flows.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offerings.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-slate-50/80 dark:bg-navy-850/80 border border-slate-200/90 dark:border-slate-800/80 p-8 shadow-sm hover:shadow-luxury dark:hover:shadow-luxury-dark hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Real Automation Use Cases */}
        <div className="mb-24 rounded-3xl bg-slate-50/70 dark:bg-navy-850/70 border border-slate-200/90 dark:border-slate-800/80 p-8 sm:p-14">
          <div className="max-w-3xl mb-12 space-y-3">
            <span className="text-xs uppercase tracking-wider font-bold text-brand-600 dark:text-brand-400">
              {language === 'ar' ? 'حالات الاستخدام الواقعية' : 'Practical Automation Use Cases'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              {language === 'ar' ? 'كيف ترفع الأتمتة كفاءة قطاعات الأعمال؟' : 'How Automated Workflows Drive Direct ROI'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {useCases.map((uc, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 space-y-3 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {uc.sector}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {uc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Engineering Approach / Framework */}
        <div className="mb-24">
          <div className="max-w-3xl mb-12 space-y-3">
            <span className="text-xs uppercase tracking-wider font-bold text-brand-600 dark:text-brand-400">
              {language === 'ar' ? 'منهجية تنفيذ مشاريع الذكاء الاصطناعي' : 'AI Engineering Framework'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
              {language === 'ar' ? 'من التحليل وحتى الإطلاق والمراقبة المستمرة' : 'From Data Auditing to Production Deployment'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {frameworkSteps.map((fs, idx) => (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-xs"
              >
                <span className="text-3xl font-black font-mono text-brand-600 dark:text-brand-400">
                  {fs.step}
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {fs.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {fs.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: High-Contrast CTA */}
        <div className="relative rounded-3xl bg-slate-900 dark:bg-navy-950 p-8 sm:p-14 text-white border border-brand-800/60 shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-start z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'ابدأ التحول الذكي' : 'Unlock Autonomous Growth'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              {language === 'ar'
                ? 'جاهز لأتمتة عمليات مؤسستك بأحدث حلول الذكاء الاصطناعي؟'
                : 'Ready to build custom AI copilots and automate your business operations?'}
            </h3>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {language === 'ar'
                ? 'تواصل مع فريقنا التقني لمناقشة أهدافك وبناء المخطط التقني للأتمتة المخصصة.'
                : 'Connect with our senior technical architects today. We evaluate your current systems and deliver an actionable AI implementation roadmap.'}
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

