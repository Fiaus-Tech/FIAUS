import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { fetchServices } from '../../services/api';
import {
  Code,
  Layers,
  Cpu,
  Zap,
  MessageSquare,
  ShoppingBag,
  Target,
  Palette,
  Cloud,
  ArrowUpRight,
  CheckCircle,
  Sparkles
} from 'lucide-react';

const iconMap = {
  Code: Code,
  Layers: Layers,
  Cpu: Cpu,
  Zap: Zap,
  MessageSquare: MessageSquare,
  ShoppingBag: ShoppingBag,
  Target: Target,
  Palette: Palette,
  Cloud: Cloud
};

const fallbackServices = [
  {
    _id: 's1',
    title: 'Web Development',
    titleAr: 'تطوير المواقع والتطبيقات',
    slug: 'web-development',
    category: 'Web & App Engineering',
    categoryAr: 'هندسة الويب والتطبيقات',
    icon: 'Code',
    shortDescription: 'High-performance, bespoke web platforms engineered with React, Next.js, and modern architecture.',
    shortDescriptionAr: 'منصات ويب مخصصة فائقة الأداء مبنية بأحدث تقنيات React و Next.js.',
    deliverables: ['Custom Web Applications', 'API Integration', 'Responsive UI/UX', 'SEO Architecture', 'Speed Optimization'],
    deliverablesAr: ['تطبيقات ويب مخصصة', 'ربط الواجهات البرمجية APIs', 'تصميم متجاوب بالكامل', 'تهيئة محركات البحث SEO', 'تحسين سرعة التحميل'],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS']
  },
  {
    _id: 's2',
    title: 'Full-Stack Development',
    titleAr: 'تطوير المنظومات المتكاملة',
    slug: 'full-stack-development',
    category: 'Web & App Engineering',
    categoryAr: 'هندسة الويب والتطبيقات',
    icon: 'Layers',
    shortDescription: 'End-to-end full-stack architectures connecting robust database layers with intuitive client interfaces.',
    shortDescriptionAr: 'بنية برمجية متكاملة تربط قواعد البيانات القوية بواجهات استخدام تفاعلية وسريعة.',
    deliverables: ['Database Design & Modeling', 'REST & GraphQL APIs', 'Secure Auth Systems', 'Cloud Deployment'],
    deliverablesAr: ['تصميم وهيكلة قواعد البيانات', 'واجهات برمجية REST و GraphQL', 'أنظمة توثيق وحماية متقدمة', 'نشر وإدارة سحابية'],
    technologies: ['MongoDB', 'PostgreSQL', 'Express.js', 'Node.js', 'Docker']
  },
  {
    _id: 's3',
    title: 'AI Solutions & LLM Integration',
    titleAr: 'حلول الذكاء الاصطناعي ودمج النماذج',
    slug: 'ai-solutions',
    category: 'AI & Intelligent Automation',
    categoryAr: 'الذكاء الاصطناعي والأتمتة الذكية',
    icon: 'Cpu',
    shortDescription: 'Custom AI agent integrations, RAG knowledge bases, and LLM-powered business intelligence.',
    shortDescriptionAr: 'دمج وكلاء الذكاء الاصطناعي وقواعد المعرفة التفاعلية وتحليلات الأعمال الذكية.',
    deliverables: ['Custom LLM Workflows', 'RAG Enterprise Search', 'Internal AI Copilots', 'Data Extraction Pipelines'],
    deliverablesAr: ['مسارات عمل بنماذج LLM مخصصة', 'محركات بحث معرفية RAG للمؤسسات', 'مساعدون أذكياء لفرق العمل', 'استخراج وتحليل البيانات آلياً'],
    technologies: ['OpenAI API', 'Gemini Models', 'LangChain', 'Vector DBs', 'Python']
  },
  {
    _id: 's4',
    title: 'AI Automation & Workflow Systems',
    titleAr: 'الأتمتة الذكية وسير العمل الآلي',
    slug: 'ai-automation',
    category: 'AI & Intelligent Automation',
    categoryAr: 'الذكاء الاصطناعي والأتمتة الذكية',
    icon: 'Zap',
    shortDescription: 'Automate repetitive enterprise tasks, CRM synchronization, lead routing, and document processing.',
    shortDescriptionAr: 'أتمتة المهام المتكررة ومزامنة أنظمة إدارة العملاء ومعالجة المستندات آلياً.',
    deliverables: ['Zapier & Make Automations', 'Custom Webhook Pipelines', 'Automated Lead Routing', 'Data Sync Bots'],
    deliverablesAr: ['أتمتة عبر Zapier و Make', 'مسارات Webhooks مخصصة', 'توزيع وتوجيه العملاء آلياً', 'بوتات مزامنة البيانات'],
    technologies: ['Make.com', 'Zapier', 'Node.js Microservices', 'REST Webhooks']
  },
  {
    _id: 's5',
    title: 'WhatsApp Marketing & AI Bots',
    titleAr: 'تسويق وروبوتات واتساب الذكية',
    slug: 'whatsapp-marketing',
    category: 'AI & Intelligent Automation',
    categoryAr: 'الذكاء الاصطناعي والأتمتة الذكية',
    icon: 'MessageSquare',
    shortDescription: 'Automated WhatsApp Cloud API workflows, 24/7 intelligent customer engagement, and broadcast campaigns.',
    shortDescriptionAr: 'أتمتة التواصل عبر واتساب للأعمال، روبوتات محادثة ذكية على مدار الساعة، وحملات بث مخصصة.',
    deliverables: ['WhatsApp Business Cloud API', 'Automated Support Bots', 'Broadcast Messaging', 'CRM Lead Sync'],
    deliverablesAr: ['واجهة واتساب السحابية للأعمال', 'بوتات خدمة عملاء ذكية على مدار الساعة', 'حملات رسائل تسويقية موجهة', 'مزامنة العملاء مع CRM'],
    technologies: ['Meta WhatsApp Cloud API', 'Node.js', 'Webhook Queues']
  },
  {
    _id: 's6',
    title: 'E-Commerce Architecture',
    titleAr: 'حلول ومتاجر التجارة الإلكترونية',
    slug: 'ecommerce-solutions',
    category: 'Web & App Engineering',
    categoryAr: 'هندسة الويب والتطبيقات',
    icon: 'ShoppingBag',
    shortDescription: 'High-conversion online retail platforms engineered for speed, custom checkout workflows, and inventory sync.',
    shortDescriptionAr: 'متاجر إلكترونية عالية التحويل مصممة للسرعة وإدارة المنتجات والدفع الإلكتروني السلس.',
    deliverables: ['Custom Storefronts', 'Payment Gateway Integration', 'Inventory Management', 'Order Tracking Pipelines'],
    deliverablesAr: ['واجهات متاجر احترافية مخصصة', 'ربط بوابات الدفع الإلكتروني', 'إدارة وتتبع المخزون', 'متابعة وتحديث مسار الطلبات'],
    technologies: ['Shopify Custom', 'Next.js Commerce', 'Stripe', 'Node.js']
  },
  {
    _id: 's7',
    title: 'Google & Meta Ads Growth',
    titleAr: 'إعلانات جوجل وميتا الممولة',
    slug: 'google-meta-ads',
    category: 'Growth & Performance Marketing',
    categoryAr: 'التسويق الرقمي ونمو المبيعات',
    icon: 'Target',
    shortDescription: 'High-ROI search and paid social campaigns targeted to capture high-intent buyers in Saudi Arabia and global markets.',
    shortDescriptionAr: 'حملات إعلانية عالية العائد على جوجل وميتا للوصول إلى المشترين في الأسواق المستهدفة.',
    deliverables: ['Keyword Intent Research', 'Ad Creative Testing', 'Conversion Tracking Setup', 'Pixel & CAPI Tracking'],
    deliverablesAr: ['بحث الكلمات المفتاحية عالية النية', 'اختبار وتصميم الإعلانات الإبداعية', 'إعداد وتتبع التحويلات بدقة', 'ربط Pixel و Conversions API'],
    technologies: ['Google Ads', 'Meta Ads', 'GA4', 'Tag Manager']
  },
  {
    _id: 's8',
    title: 'UI/UX Design & Brand Experience',
    titleAr: 'تصميم واجهات وتجربة المستخدم',
    slug: 'ui-ux-design',
    category: 'UI/UX & Brand Design',
    categoryAr: 'التصميم وتجربة المستخدم والهوية',
    icon: 'Palette',
    shortDescription: 'Human-centered user interfaces, interactive prototypes, and luxury design systems.',
    shortDescriptionAr: 'واجهات مستخدم تفاعلية وجذابة مع نماذج أولية متطورة وأنظمة تصميم متكاملة.',
    deliverables: ['Wireframing & User Flows', 'Interactive Prototypes', 'Design System Components', 'Brand Guidelines'],
    deliverablesAr: ['مخططات تدفق المستخدم والواجهات', 'نماذج أولية تفاعلية عالية الدقة', 'مكتبة مكونات التصميم Design System', 'دليل الهوية البصرية الرقمية'],
    technologies: ['Figma', 'Design Systems', 'Micro-Animations']
  }
];

export default function ServicesSection({ onOpenStartProject }) {
  const { t, isRTL, language } = useLanguage();
  const [services, setServices] = useState(fallbackServices);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await fetchServices();
        if (res.success && res.data && res.data.length > 0) {
          setServices(res.data);
        }
      } catch (e) {
        console.error('Failed to load services, using fallback', e);
      }
    };
    loadServices();
  }, []);

  const categories = [
    { id: 'All', labelEn: 'All Capabilities', labelAr: 'جميع القدرات' },
    { id: 'Web & App Engineering', labelEn: 'Web & Engineering', labelAr: 'هندسة الويب والتطبيقات' },
    { id: 'AI & Intelligent Automation', labelEn: 'AI & Automation', labelAr: 'الذكاء الاصطناعي والأتمتة' },
    { id: 'Growth & Performance Marketing', labelEn: 'Growth & Marketing', labelAr: 'التسويق الرقمي والنمو' },
    { id: 'UI/UX & Brand Design', labelEn: 'UI/UX & Branding', labelAr: 'التصميم وتجربة المستخدم' }
  ];

  const filteredServices =
    activeCategory === 'All'
      ? services
      : services.filter((s) => s.category === activeCategory);

  return (
    <section
      id="services"
      className="relative py-24 sm:py-32 bg-slate-50/60 dark:bg-navy-950/60 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-start max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('services.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
            {t('services.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-2">
          {categories.map((cat) => {
            const label = language === 'ar' ? cat.labelAr : cat.labelEn;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md'
                    : 'bg-white dark:bg-navy-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-brand-500/60'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => {
            const IconComponent = iconMap[service.icon] || Code;
            const title =
              language === 'ar' && service.titleAr ? service.titleAr : service.title;
            const desc =
              language === 'ar' && service.shortDescriptionAr
                ? service.shortDescriptionAr
                : service.shortDescription;
            const deliverables =
              language === 'ar' && service.deliverablesAr && service.deliverablesAr.length > 0
                ? service.deliverablesAr
                : service.deliverables || [];

            return (
              <div
                key={service._id || service.slug}
                className="group relative rounded-2xl bg-white dark:bg-navy-900 border border-slate-200/90 dark:border-slate-800/90 p-7 shadow-sm hover:shadow-luxury dark:hover:shadow-luxury-dark hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Header */}
                  <div className="w-12 h-12 rounded-xl bg-brand-50 dark:bg-brand-950/80 border border-brand-200/80 dark:border-brand-800/80 text-brand-600 dark:text-brand-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <span className="text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 block mb-1">
                    {language === 'ar' && service.categoryAr ? service.categoryAr : service.category}
                  </span>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight mb-3">
                    {title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-normal">
                    {desc}
                  </p>

                  {/* Deliverables List */}
                  {deliverables.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800/60 mb-6">
                      <span className="text-[11px] uppercase tracking-wider font-bold text-slate-600 dark:text-slate-400 block">
                        {language === 'ar' ? 'المخرجات الرئيسية:' : 'Core Deliverables:'}
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                        {deliverables.slice(0, 4).map((d, dIdx) => (
                          <li key={dIdx} className="flex items-center gap-2">
                            <CheckCircle className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 shrink-0" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Card Footer CTA */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <button
                    onClick={onOpenStartProject}
                    className="text-xs font-bold text-brand-600 dark:text-brand-400 group-hover:text-brand-700 dark:group-hover:text-brand-300 inline-flex items-center gap-1.5 transition-colors"
                  >
                    <span>{language === 'ar' ? 'طلب هذه الخدمة' : 'Inquire For Project'}</span>
                    <ArrowUpRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

