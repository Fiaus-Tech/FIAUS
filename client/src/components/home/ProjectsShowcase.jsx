import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { fetchProjects } from '../../services/api';
import ProjectModal from '../common/ProjectModal';
import {
  ExternalLink,
  Github,
  Images,
  ArrowUpRight,
  Layers,
  CheckCircle2,
  Lock,
  Sparkles
} from 'lucide-react';

const fallbackProjects = [
  {
    _id: 'p1',
    title: 'ACC EST',
    titleAr: 'مؤسسة إيه سي سي',
    slug: 'acc-est',
    category: 'Web Engineering',
    categoryAr: 'هندسة الويب والمؤسسات',
    projectType: 'Enterprise Corporate Web Platform',
    shortDescription: 'High-performance modern corporate portal with interactive project showcases, client portal integration, and bilingual presentation.',
    shortDescriptionAr: 'منصة مؤسسية حديثة وعالية الأداء مع معارض مشاريع تفاعلية وبوابة عملاء متكاملة.',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Node.js'],
    features: ['Dynamic Project Showcase', 'Bilingual Architecture', 'Interactive Corporate Timeline', 'Client Engagement Portal', 'Optimized Core Web Vitals'],
    featuresAr: ['عرض تفاعلي للمشاريع', 'بنية ثنائية اللغة', 'جدول زمني تفاعلي', 'بوابة تفاعل العملاء', 'أداء وسرعة قياسية'],
    coverImage: '/assets/projects/p1/main.png',
    screenshots: [
      { title: 'Corporate Overview', url: '/assets/projects/p1/main.png' },
      { title: 'About & Vision', url: '/assets/projects/p1/about.png' },
      { title: 'Client Capabilities', url: '/assets/projects/p1/client.png' },
      { title: 'Headquarters & Facilities', url: '/assets/projects/p1/hq.png' },
      { title: 'Projects Portfolio', url: '/assets/projects/p1/project.png' }
    ],
    githubUrl: 'https://github.com/fahad1420/ACC-EST',
    liveUrl: 'https://acc-est.vercel.app/',
    featured: true,
    displayOrder: 1
  },
  {
    _id: 'p2',
    title: 'Rabiora E-Commerce',
    titleAr: 'متجر رابيورا الإلكتروني',
    slug: 'rabiora-ecommerce',
    category: 'E-Commerce & Retail',
    categoryAr: 'التجارة الإلكترونية والتجزئة',
    projectType: 'Full-Stack E-Commerce & Subscription Architecture',
    shortDescription: 'Scalable e-commerce ecosystem featuring dynamic product catalogs, customer subscription workflows, and full backend management.',
    shortDescriptionAr: 'منظومة تجارة إلكترونية متكاملة وقابلة للتوسع تتميز بكتالوج منتجات ديناميكي وإدارة الاشتراكات ولوحة تحكم شاملة.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'REST API'],
    features: ['Multi-Theme Support (Light & Dark)', 'Customer Subscriber Workflow', 'Administrative Product Management', 'Responsive Checkout Flow', 'Real-Time Inventory Updates'],
    featuresAr: ['دعم الوضعين الفاتح والداكن', 'إدارة المشتركين والنشرات', 'لوحة إدارة المنتجات', 'تجربة دفع سلسة ومتجاوبة', 'تحديثات المخزون الفورية'],
    coverImage: '/assets/projects/p2/main.png',
    screenshots: [
      { title: 'Storefront Experience', url: '/assets/projects/p2/main.png' },
      { title: 'Administrative Backend', url: '/assets/projects/p2/backend.png' },
      { title: 'Home & Featured Catalog', url: '/assets/projects/p2/home.png' },
      { title: 'Light Mode Interface', url: '/assets/projects/p2/light-mode.png' },
      { title: 'Subscribers & Audience Manager', url: '/assets/projects/p2/subscribers.png' }
    ],
    githubUrl: 'https://github.com/fahad1420/rabiora-ecommerce',
    liveUrl: 'https://rabiora-ecommerce.vercel.app/',
    featured: true,
    displayOrder: 2
  },
  {
    _id: 'p3',
    title: 'TECH-GURD',
    titleAr: 'تيك جارد',
    slug: 'tech-gurd',
    category: 'Cybersecurity & Tools',
    categoryAr: 'الأمن السيبراني وأدوات الحماية',
    projectType: 'Security & Browser Ad-Blocking Platform',
    shortDescription: 'Real-time web privacy and ad-blocking suite with live threat telemetry, browser extension distribution, and customizable protection tiers.',
    shortDescriptionAr: 'منصة حماية الخصوصية وحجب الإعلانات المزعجة في الوقت الفعلي مع لوحة تحكم بالتهديدات وتوزيع ملحق المتصفح.',
    technologies: ['TypeScript', 'React', 'Browser Extension APIs', 'WebSockets', 'Tailwind CSS'],
    features: ['Live Telemetry & Threat Blocking', 'Browser Extension Distribution Hub', 'Customizable Filter Lists', 'Security Dashboard Metrics', 'Low Latency Rules Engine'],
    featuresAr: ['حجب التهديدات والإعلانات في الوقت الحقيقي', 'مركز توزيع وتثبيت ملحق المتصفح', 'قوائم تصفية مخصصة', 'مؤشرات الأمان ولوحة التحكم', 'محرك فحص سريع ومنخفض الاستهلاك'],
    coverImage: '/assets/projects/p3/main.png',
    screenshots: [
      { title: 'Security Overview', url: '/assets/projects/p3/main.png' },
      { title: 'Live Telemetry Dashboard', url: '/assets/projects/p3/dashboard.png' },
      { title: 'Extension Installation Flow', url: '/assets/projects/p3/install-extension.png' },
      { title: 'Live Ad Blocking In Action', url: '/assets/projects/p3/live-ads-blocking.png' },
      { title: 'Protection Settings', url: '/assets/projects/p3/settings.png' }
    ],
    githubUrl: 'https://github.com/fahad1420/TECH-GURD',
    liveUrl: 'https://tech-gurd.vercel.app/',
    featured: true,
    displayOrder: 3
  },
  {
    _id: 'p4',
    title: 'Current Ache BD',
    titleAr: 'كرنت آشي بنغلاديش',
    slug: 'current-ache-bd',
    category: 'Full-Stack & Cloud',
    categoryAr: 'التطبيقات السحابية وأنظمة البيانات',
    projectType: 'National Power & Energy Telemetry Platform',
    shortDescription: 'Real-time public utility monitoring platform aggregating national power grid metrics, area-by-area load shedding history, and live stats.',
    shortDescriptionAr: 'منصة وطنية لمتابعة شبكة الكهرباء والطاقة في الوقت الفعلي مع تقارير وإحصاءات تاريخية ومناطقية مفصلة.',
    technologies: ['React', 'Vite', 'Node.js', 'Chart.js / Data Viz', 'Tailwind CSS', 'API Integration'],
    features: ['National Power Capacity Analytics', 'All-Area Real-Time Status Grid', 'Historical Outage & Restoration Logs', 'Bilingual Public Interface', 'High-Concurrence Caching'],
    featuresAr: ['تحليلات سعة شبكة الطاقة الوطنية', 'شبكة متابعة حالة جميع المناطق الحية', 'سجلات انقطاع واستعادة التيار التاريخية', 'واجهة مستخدم ثنائية اللغة', 'نظام تخزين مؤقت للتعامل مع آلاف الزوار'],
    coverImage: '/assets/projects/p4/main.png',
    screenshots: [
      { title: 'National Grid Overview', url: '/assets/projects/p4/main.png' },
      { title: 'National Power Statistics', url: '/assets/projects/p4/national-stats.png' },
      { title: 'All Area Real-Time Status', url: '/assets/projects/p4/all-area.png' },
      { title: 'Historical Power Outage Logs', url: '/assets/projects/p4/power-history.png' },
      { title: 'About & Methodology', url: '/assets/projects/p4/about.png' }
    ],
    githubUrl: 'https://github.com/fahad1420/Current-Ache-',
    liveUrl: 'https://current-ache-iota.vercel.app/',
    featured: true,
    displayOrder: 4
  },
  {
    _id: 'p5',
    title: 'AMA Specialty Coffee',
    titleAr: 'قهوة أما المختصة',
    slug: 'ama-specialty-coffee',
    category: 'Brand Experience & Hospitality',
    categoryAr: 'الهوية والتجارب الرقمية الفاخرة',
    projectType: 'Artisanal Brand Web Experience',
    shortDescription: 'Luxury digital brand experience for an artisanal specialty coffee roaster, presenting handcrafted menus, origin storytelling, and gallery.',
    shortDescriptionAr: 'تجربة رقمية فاخرة لعلامة تجارية متخصصة في القهوة المختصة تستعرض القائمة المميزة وقصة المنشأ والمعرض الفني.',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Responsive UI Design'],
    features: ['Interactive Specialty Coffee Menu', 'High-Resolution Visual Gallery', 'Artisanal Origin Storytelling', 'Why Choose Us Value Pillars', 'Fluid Mobile Experience'],
    featuresAr: ['قائمة تفاعلية للمشروبات والقهوة المختصة', 'معرض صور عالي الدقة', 'سرد قصة حبوب القهوة والمنشأ', 'ركائز القيمة والجودة', 'تصميم متجاوب بالكامل مع الجوال'],
    coverImage: '/assets/projects/p5/main.png',
    screenshots: [
      { title: 'Artisanal Brand Showcase', url: '/assets/projects/p5/main.png' },
      { title: 'Specialty Coffee Menu', url: '/assets/projects/p5/menu.png' },
      { title: 'Atmospheric Visual Gallery', url: '/assets/projects/p5/gallery.png' },
      { title: 'Brand Heritage & About', url: '/assets/projects/p5/about.png' },
      { title: 'Why Choose AMA Specialty Coffee', url: '/assets/projects/p5/why-choose-us.png' }
    ],
    githubUrl: 'https://github.com/fahad1420/ama-specialty-coffee',
    liveUrl: '',
    featured: true,
    displayOrder: 5
  }
];

export default function ProjectsShowcase() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInitialIndex, setModalInitialIndex] = useState(0);
  const { t, isRTL, language } = useLanguage();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const res = await fetchProjects();
        if (res.success && res.data && res.data.length > 0) {
          setProjects(res.data);
        }
      } catch (err) {
        console.error('Failed to load projects from API, using fallback data', err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  const openGallery = (project, index = 0) => {
    setSelectedProject(project);
    setModalInitialIndex(index);
    setModalOpen(true);
  };

  return (
    <section
      id="selected-work"
      className="relative py-24 sm:py-32 bg-white dark:bg-navy-900 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors overflow-hidden"
    >
      {/* Background ambient accents */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-brand-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-start max-w-3xl mb-16 sm:mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('projects.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
            {t('projects.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Sequential Projects Showcase List */}
        <div className="space-y-24 sm:space-y-32">
          {projects.map((project, index) => {
            // Automatic dynamic two-digit numbering: 01, 02, 03...
            const projectNumber = String(index + 1).padStart(2, '0');
            const isEven = index % 2 === 1;

            const localizedTitle =
              language === 'ar' && project.titleAr ? project.titleAr : project.title;
            const localizedCategory =
              language === 'ar' && project.categoryAr ? project.categoryAr : project.category;
            const localizedShortDesc =
              language === 'ar' && project.shortDescriptionAr
                ? project.shortDescriptionAr
                : project.shortDescription;
            const localizedFeatures =
              language === 'ar' && project.featuresAr && project.featuresAr.length > 0
                ? project.featuresAr
                : project.features || [];

            return (
              <div
                key={project._id || project.slug}
                className="relative group rounded-3xl bg-slate-50/70 dark:bg-navy-850/60 border border-slate-200/90 dark:border-slate-800/80 p-6 sm:p-10 lg:p-12 shadow-luxury dark:shadow-luxury-dark transition-all duration-300 hover:border-brand-500/40"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isEven ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Visual Preview Side (Large Showcase) */}
                  <div
                    className={`lg:col-span-7 ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl group-hover:shadow-2xl transition-all duration-300">
                      {/* Interactive image container */}
                      <div
                        onClick={() => openGallery(project, 0)}
                        className="cursor-pointer relative aspect-[16/10] overflow-hidden group/img"
                      >
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          className="w-full h-full object-cover object-top transform group-hover/img:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        
                        {/* Hover Overlay with View Gallery prompt */}
                        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/img:opacity-100 backdrop-blur-[2px] transition-opacity duration-300 flex items-center justify-center gap-2">
                          <button className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-brand-600/90 hover:bg-brand-600 shadow-lg flex items-center gap-1.5 transition-transform group-hover/img:translate-y-0 translate-y-2">
                            <Images className="w-4 h-4" />
                            <span>{t('projects.viewGallery')}</span>
                          </button>
                        </div>
                      </div>

                      {/* Mini Thumbnail bar below main image */}
                      {project.screenshots && project.screenshots.length > 1 && (
                        <div className="px-4 py-3 bg-white/95 dark:bg-navy-900/95 border-t border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-2 overflow-x-auto">
                          <div className="flex items-center gap-2">
                            {project.screenshots.slice(0, 4).map((shot, sIdx) => (
                              <button
                                key={sIdx}
                                onClick={() => openGallery(project, sIdx)}
                                className="w-12 h-8 rounded-md overflow-hidden border border-slate-300 dark:border-slate-700 opacity-80 hover:opacity-100 hover:border-brand-500 transition-all shrink-0"
                                title={shot.title}
                              >
                                <img
                                  src={shot.url}
                                  alt={shot.title}
                                  className="w-full h-full object-cover"
                                />
                              </button>
                            ))}
                          </div>

                          <button
                            onClick={() => openGallery(project, 0)}
                            className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1 shrink-0"
                          >
                            <span>{project.screenshots.length} {language === 'ar' ? 'لقطات' : 'Screenshots'}</span>
                            <Images className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content & Specs Side */}
                  <div
                    className={`lg:col-span-5 flex flex-col space-y-5 ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    {/* Project Number & Category Pill */}
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-3xl sm:text-4xl font-black text-brand-600 dark:text-brand-400 tracking-tight font-mono">
                        {t('projects.projectPrefix')} {projectNumber}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200/80 dark:bg-navy-800 text-slate-700 dark:text-slate-300 border border-slate-300/60 dark:border-slate-700/60">
                        {localizedCategory}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                      {localizedTitle}
                    </h3>

                    {/* Project Type sub-label */}
                    <p className="text-xs uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                      {project.projectType}
                    </p>

                    {/* Short Description */}
                    <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {localizedShortDesc}
                    </p>

                    {/* Key Features Bullet List */}
                    {localizedFeatures.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <span className="text-xs uppercase tracking-wider font-bold text-slate-700 dark:text-slate-300 block">
                          {t('projects.keyFeatures')}
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                          {localizedFeatures.slice(0, 4).map((feature, fIdx) => (
                            <li key={fIdx} className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400 shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech Stack Tags */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="pt-2">
                        <span className="text-xs uppercase tracking-wider font-bold text-slate-700 dark:text-slate-300 block mb-2">
                          {t('projects.techStack')}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-1 text-xs font-semibold rounded-md bg-white dark:bg-navy-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-2xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Links Bar */}
                    <div className="pt-4 flex flex-wrap items-center gap-3">
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-xl shadow-sm hover:shadow-glow transition-all"
                        >
                          <span>{t('projects.liveDemo')}</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/80 rounded-xl">
                          <Lock className="w-3.5 h-3.5" />
                          <span>{t('projects.statusPrivate')}</span>
                        </div>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-navy-900 hover:bg-slate-100 dark:hover:bg-navy-800 border border-slate-200 dark:border-slate-800 rounded-xl transition-all"
                        >
                          <Github className="w-4 h-4" />
                          <span>{t('projects.viewCode')}</span>
                        </a>
                      )}

                      <Link
                        to={`/work/${project.slug}`}
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
                      >
                        <span>{t('projects.caseStudy')}</span>
                        <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Screenshot Gallery Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialIndex={modalInitialIndex}
      />
    </section>
  );
}

