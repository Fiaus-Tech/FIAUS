import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Admin from '../models/Admin.js';
import Project from '../models/Project.js';
import Service from '../models/Service.js';
import FAQ from '../models/FAQ.js';
import WebsiteSettings from '../models/WebsiteSettings.js';

dotenv.config({ path: path.resolve('server/.env') });

const realProjects = [
  {
    title: 'ACC EST',
    titleAr: 'مؤسسة إيه سي سي',
    slug: 'acc-est',
    category: 'Web Engineering',
    categoryAr: 'هندسة الويب والمؤسسات',
    projectType: 'Enterprise Corporate Web Platform',
    shortDescription: 'High-performance modern corporate portal with interactive project showcases, client portal integration, and bilingual presentation.',
    shortDescriptionAr: 'منصة مؤسسية حديثة وعالية الأداء مع معارض مشاريع تفاعلية وبوابة عملاء متكاملة.',
    fullDescription: 'ACC EST is an enterprise-grade digital platform engineered for high-visibility corporate presentation and client engagement. Built with contemporary design aesthetics and robust component architecture, it presents corporate capabilities, project portfolios, and headquarters operations seamlessly across all devices.',
    fullDescriptionAr: 'منصة رقمية متطورة على مستوى المؤسسات صُممت لتقديم رؤية واضحة للقدرات المؤسسية وحافظة المشاريع ومقر العمليات بسلاسة عبر مختلف الشاشات.',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Node.js'],
    features: [
      'Dynamic Project Showcase',
      'Bilingual Architecture',
      'Interactive Corporate Timeline',
      'Client Engagement Portal',
      'Optimized Core Web Vitals'
    ],
    featuresAr: [
      'عرض تفاعلي للمشاريع',
      'بنية ثنائية اللغة',
      'جدول زمني تفاعلي',
      'بوابة تفاعل العملاء',
      'أداء وسرعة قياسية'
    ],
    challenge: 'Deliver an executive-level web platform that effectively communicates company strength, scale, and operational capabilities to regional and international partners.',
    solution: 'Designed a sophisticated, modern UI with smooth micro-interactions, responsive typography, and an intuitive content hierarchy.',
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
    displayOrder: 1,
    status: 'published'
  },
  {
    title: 'Rabiora E-Commerce',
    titleAr: 'متجر رابيورا الإلكتروني',
    slug: 'rabiora-ecommerce',
    category: 'E-Commerce & Retail',
    categoryAr: 'التجارة الإلكترونية والتجزئة',
    projectType: 'Full-Stack E-Commerce & Subscription Architecture',
    shortDescription: 'Scalable e-commerce ecosystem featuring dynamic product catalogs, customer subscription workflows, and full backend management.',
    shortDescriptionAr: 'منظومة تجارة إلكترونية متكاملة وقابلة للتوسع تتميز بكتالوج منتجات ديناميكي وإدارة الاشتراكات ولوحة تحكم شاملة.',
    fullDescription: 'Rabiora is a next-generation e-commerce web platform engineered for conversion and fluid consumer browsing. Incorporating full light/dark theming, automated subscriber management, lightning-fast cart interactions, and administrative dashboards, Rabiora provides a robust foundation for modern digital retail.',
    fullDescriptionAr: 'منصة تجارة إلكترونية من الجيل القادم تم تصميمها لتحقيق أعلى معدلات التحويل مع دعم كامل للوضع الليلي والنهاري وإدارة المشتركين ولوحة تحكم متطورة.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'REST API'],
    features: [
      'Multi-Theme Support (Light & Dark)',
      'Customer Subscriber Workflow',
      'Administrative Product Management',
      'Responsive Checkout Flow',
      'Real-Time Inventory Updates'
    ],
    featuresAr: [
      'دعم الوضعين الفاتح والداكن',
      'إدارة المشتركين والنشرات',
      'لوحة إدارة المنتجات',
      'تجربة دفع سلسة ومتجاوبة',
      'تحديثات المخزون الفورية'
    ],
    challenge: 'Build a lightning-fast, visually compelling digital shopping experience with seamless theme transitions and end-to-end subscriber workflows.',
    solution: 'Engineered a modular React frontend powered by an optimized Express/MongoDB backend with responsive state management.',
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
    displayOrder: 2,
    status: 'published'
  },
  {
    title: 'TECH-GURD',
    titleAr: 'تيك جارد',
    slug: 'tech-gurd',
    category: 'Cybersecurity & Tools',
    categoryAr: 'الأمن السيبراني وأدوات الحماية',
    projectType: 'Security & Browser Ad-Blocking Platform',
    shortDescription: 'Real-time web privacy and ad-blocking suite with live threat telemetry, browser extension distribution, and customizable protection tiers.',
    shortDescriptionAr: 'منصة حماية الخصوصية وحجب الإعلانات المزعجة في الوقت الفعلي مع لوحة تحكم بالتهديدات وتوزيع ملحق المتصفح.',
    fullDescription: 'TECH-GURD is a cutting-edge privacy and security platform designed to protect users from intrusive trackers, malicious ad injections, and privacy leaks. Featuring live telemetry metrics, an intuitive browser extension installation flow, and deep security configuration settings, TECH-GURD demonstrates advanced tool engineering.',
    fullDescriptionAr: 'منصة أمنية متقدمة لحماية المستخدمين من أدوات التتبع والإعلانات الضارة مع إحصاءات حية وإعدادات حماية متقدمة.',
    technologies: ['TypeScript', 'React', 'Browser Extension APIs', 'WebSockets', 'Tailwind CSS'],
    features: [
      'Live Telemetry & Threat Blocking',
      'Browser Extension Distribution Hub',
      'Customizable Filter Lists',
      'Security Dashboard Metrics',
      'Low Latency Rules Engine'
    ],
    featuresAr: [
      'حجب التهديدات والإعلانات في الوقت الحقيقي',
      'مركز توزيع وتثبيت ملحق المتصفح',
      'قوائم تصفية مخصصة',
      'مؤشرات الأمان ولوحة التحكم',
      'محرك فحص سريع ومنخفض الاستهلاك'
    ],
    challenge: 'Provide users with a seamless bridge between a high-converting web presence and browser extension installation with live security metrics.',
    solution: 'Designed an ultra-clean tech interface highlighting protection statistics, intuitive step-by-step setup, and transparent security controls.',
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
    displayOrder: 3,
    status: 'published'
  },
  {
    title: 'Current Ache BD',
    titleAr: 'كرنت آشي بنغلاديش',
    slug: 'current-ache-bd',
    category: 'Full-Stack & Cloud',
    categoryAr: 'التطبيقات السحابية وأنظمة البيانات',
    projectType: 'National Power & Energy Telemetry Platform',
    shortDescription: 'Real-time public utility monitoring platform aggregating national power grid metrics, area-by-area load shedding history, and live stats.',
    shortDescriptionAr: 'منصة وطنية لمتابعة شبكة الكهرباء والطاقة في الوقت الفعلي مع تقارير وإحصاءات تاريخية ومناطقية مفصلة.',
    fullDescription: 'Current Ache BD is a high-availability telemetry portal serving real-time energy tracking across all regions of Bangladesh. With live national capacity analytics, area-specific power status tracking, and historical outage logs, the platform processes heavy data updates while remaining ultra-fast and accessible.',
    fullDescriptionAr: 'بوابة بيانات عامة عالية التوافر لتتبع حالة شبكة الكهرباء ومحطات الطاقة في مختلف مناطق بنغلاديش بدقة وسرعة فائقة.',
    technologies: ['React', 'Vite', 'Node.js', 'Chart.js / Data Viz', 'Tailwind CSS', 'API Integration'],
    features: [
      'National Power Capacity Analytics',
      'All-Area Real-Time Status Grid',
      'Historical Outage & Restoration Logs',
      'Bilingual Public Interface',
      'High-Concurrence Caching'
    ],
    featuresAr: [
      'تحليلات سعة شبكة الطاقة الوطنية',
      'شبكة متابعة حالة جميع المناطق الحية',
      'سجلات انقطاع واستعادة التيار التاريخية',
      'واجهة مستخدم ثنائية اللغة',
      'نظام تخزين مؤقت للتعامل مع آلاف الزوار'
    ],
    challenge: 'Process and render high-frequency real-time public telemetry data with zero UI lag for thousands of concurrent users.',
    solution: 'Implemented lightweight data models, efficient chart visualizations, and regional search filters for instant feedback.',
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
    displayOrder: 4,
    status: 'published'
  },
  {
    title: 'AMA Specialty Coffee',
    titleAr: 'قهوة أما المختصة',
    slug: 'ama-specialty-coffee',
    category: 'Brand Experience & Hospitality',
    categoryAr: 'الهوية والتجارب الرقمية الفاخرة',
    projectType: 'Artisanal Brand Web Experience',
    shortDescription: 'Luxury digital brand experience for an artisanal specialty coffee roaster, presenting handcrafted menus, origin storytelling, and gallery.',
    shortDescriptionAr: 'تجربة رقمية فاخرة لعلامة تجارية متخصصة في القهوة المختصة تستعرض القائمة المميزة وقصة المنشأ والمعرض الفني.',
    fullDescription: 'AMA Specialty Coffee combines artisanal aesthetics with refined web craftsmanship. Designed to evoke luxury, craftsmanship, and community, the platform features curated roast menus, high-resolution aesthetic galleries, and brand origin narratives.',
    fullDescriptionAr: 'تجمع منصة قهوة أما المختصة بين الجماليات الحرفية والهندسة الرقمية الراقية، لتعكس الفخامة والأصالة من خلال قوائم تفاعلية ومعارض بصرية خلابة.',
    technologies: ['React', 'Tailwind CSS', 'Framer Motion', 'Responsive UI Design'],
    features: [
      'Interactive Specialty Coffee Menu',
      'High-Resolution Visual Gallery',
      'Artisanal Origin Storytelling',
      'Why Choose Us Value Pillars',
      'Fluid Mobile Experience'
    ],
    featuresAr: [
      'قائمة تفاعلية للمشروبات والقهوة المختصة',
      'معرض صور عالي الدقة',
      'سرد قصة حبوب القهوة والمنشأ',
      'ركائز القيمة والجودة',
      'تصميم متجاوب بالكامل مع الجوال'
    ],
    challenge: 'Translate an upscale sensory hospitality brand into a refined, immersive digital experience.',
    solution: 'Constructed an editorial aesthetic with warm minimalist typography, smooth micro-interactions, and visual storytelling.',
    coverImage: '/assets/projects/p5/main.png',
    screenshots: [
      { title: 'Artisanal Brand Showcase', url: '/assets/projects/p5/main.png' },
      { title: 'Specialty Coffee Menu', url: '/assets/projects/p5/menu.png' },
      { title: 'Atmospheric Visual Gallery', url: '/assets/projects/p5/gallery.png' },
      { title: 'Brand Heritage & About', url: '/assets/projects/p5/about.png' },
      { title: 'Why Choose AMA Specialty Coffee', url: '/assets/projects/p5/why-choose-us.png' }
    ],
    githubUrl: 'https://github.com/fahad1420/ama-specialty-coffee',
    liveUrl: '', // No fake URL
    featured: true,
    displayOrder: 5,
    status: 'published'
  }
];

const realServices = [
  // 1. Web & App Engineering
  {
    title: 'Web Development',
    titleAr: 'تطوير المواقع والتطبيقات',
    slug: 'web-development',
    category: 'Web & App Engineering',
    categoryAr: 'هندسة الويب والتطبيقات',
    icon: 'Code',
    shortDescription: 'High-performance, bespoke web platforms engineered with React, Next.js, and modern architecture.',
    shortDescriptionAr: 'منصات ويب مخصصة فائقة الأداء مبنية بأحدث تقنيات React و Next.js.',
    deliverables: ['Custom Web Applications', 'API Integration', 'Responsive UI/UX', 'SEO Architecture', 'Speed Optimization'],
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    displayOrder: 1
  },
  {
    title: 'Full-Stack Development',
    titleAr: 'تطوير المنظومات المتكاملة',
    slug: 'full-stack-development',
    category: 'Web & App Engineering',
    categoryAr: 'هندسة الويب والتطبيقات',
    icon: 'Layers',
    shortDescription: 'End-to-end full-stack architectures connecting robust database layers with intuitive client interfaces.',
    shortDescriptionAr: 'بنية برمجية متكاملة تربط قواعد البيانات القوية بواجهات استخدام تفاعلية وسريعة.',
    deliverables: ['Database Design & Modeling', 'REST & GraphQL APIs', 'Secure Auth Systems', 'Cloud Deployment'],
    technologies: ['MongoDB', 'PostgreSQL', 'Express.js', 'Node.js', 'Docker'],
    displayOrder: 2
  },
  {
    title: 'E-Commerce Architecture',
    titleAr: 'حلول ومتاجر التجارة الإلكترونية',
    slug: 'ecommerce-solutions',
    category: 'Web & App Engineering',
    categoryAr: 'هندسة الويب والتطبيقات',
    icon: 'ShoppingBag',
    shortDescription: 'High-conversion online retail platforms engineered for speed, custom checkout workflows, and inventory sync.',
    shortDescriptionAr: 'متاجر إلكترونية عالية التحويل مصممة للسرعة وإدارة المنتجات والدفع الإلكتروني السلس.',
    deliverables: ['Custom Storefronts', 'Payment Gateway Integration', 'Inventory Management', 'Order Tracking Pipelines'],
    technologies: ['Shopify Custom', 'Next.js Commerce', 'Stripe', 'Node.js'],
    displayOrder: 3
  },
  {
    title: 'SaaS Solutions Engineering',
    titleAr: 'تطوير منصات البرمجيات كخدمة (SaaS)',
    slug: 'saas-solutions',
    category: 'Web & App Engineering',
    categoryAr: 'هندسة الويب والتطبيقات',
    icon: 'Cloud',
    shortDescription: 'Multi-tenant cloud platforms, subscription billing systems, and client dashboards designed to scale.',
    shortDescriptionAr: 'منصات سحابية متعددة المستخدمين مع إدارة الاشتراكات ولوحات تحكم مخصصة للتوسع.',
    deliverables: ['Multi-Tenant Infrastructure', 'Subscription Billing Integration', 'Role-Based Access Control', 'Admin Dashboards'],
    technologies: ['React', 'Node.js', 'Redis', 'PostgreSQL', 'AWS / Vercel'],
    displayOrder: 4
  },

  // 2. AI & Intelligent Automation
  {
    title: 'AI Solutions & LLM Integration',
    titleAr: 'حلول الذكاء الاصطناعي ودمج النماذج',
    slug: 'ai-solutions',
    category: 'AI & Intelligent Automation',
    categoryAr: 'الذكاء الاصطناعي والأتمتة الذكية',
    icon: 'Cpu',
    shortDescription: 'Custom AI agent integrations, RAG knowledge bases, and LLM-powered business intelligence.',
    shortDescriptionAr: 'دمج وكلاء الذكاء الاصطناعي وقواعد المعرفة التفاعلية وتحليلات الأعمال الذكية.',
    deliverables: ['Custom LLM Workflows', 'RAG Enterprise Search', 'Internal AI Copilots', 'Data Extraction Pipelines'],
    technologies: ['OpenAI API', 'Gemini Models', 'LangChain', 'Vector DBs', 'Python'],
    displayOrder: 5
  },
  {
    title: 'AI Automation & Workflow Systems',
    titleAr: 'الأتمتة الذكية وسير العمل الآلي',
    slug: 'ai-automation',
    category: 'AI & Intelligent Automation',
    categoryAr: 'الذكاء الاصطناعي والأتمتة الذكية',
    icon: 'Zap',
    shortDescription: 'Automate repetitive enterprise tasks, CRM synchronization, lead routing, and document processing.',
    shortDescriptionAr: 'أتمتة المهام المتكررة ومزامنة أنظمة إدارة العملاء ومعالجة المستندات آلياً.',
    deliverables: ['Zapier & Make Automations', 'Custom Webhook Pipelines', 'Automated Lead Routing', 'Data Sync Bots'],
    technologies: ['Make.com', 'Zapier', 'Node.js Microservices', 'REST Webhooks'],
    displayOrder: 6
  },
  {
    title: 'WhatsApp Marketing & AI Bots',
    titleAr: 'تسويق وروبوتات واتساب الذكية',
    slug: 'whatsapp-marketing',
    category: 'AI & Intelligent Automation',
    categoryAr: 'الذكاء الاصطناعي والأتمتة الذكية',
    icon: 'MessageSquare',
    shortDescription: 'Automated WhatsApp Cloud API workflows, 24/7 intelligent customer engagement, and broadcast campaigns.',
    shortDescriptionAr: 'أتمتة التواصل عبر واتساب للأعمال، روبوتات محادثة ذكية على مدار الساعة، وحملات بث مخصصة.',
    deliverables: ['WhatsApp Business Cloud API', 'Automated Customer Support Bots', 'Broadcast Messaging', 'CRM Lead Sync'],
    technologies: ['Meta WhatsApp Cloud API', 'Node.js', 'Webhook Queues'],
    displayOrder: 7
  },

  // 3. Growth & Performance Marketing
  {
    title: 'Google Ads & Search Marketing',
    titleAr: 'إعلانات جوجل والتسويق عبر البحث',
    slug: 'google-ads',
    category: 'Growth & Performance Marketing',
    categoryAr: 'التسويق الرقمي ونمو المبيعات',
    icon: 'Search',
    shortDescription: 'High-ROI Google Search, Performance Max, and Display campaigns targeted to capture high-intent buyers.',
    shortDescriptionAr: 'حملات إعلانية عالية العائد على جوجل للوصول إلى العملاء المحتملين ذوي الجدية العالية.',
    deliverables: ['Keyword Intent Research', 'Ad Copywriting & A/B Testing', 'Conversion Tracking Setup', 'Negative Keyword Optimization'],
    technologies: ['Google Ads', 'Google Tag Manager', 'Google Analytics 4'],
    displayOrder: 8
  },
  {
    title: 'Meta (Facebook & Instagram) Ads',
    titleAr: 'إعلانات ميتا (فيسبوك وإنستغرام)',
    slug: 'meta-ads',
    category: 'Growth & Performance Marketing',
    categoryAr: 'التسويق الرقمي ونمو المبيعات',
    icon: 'Target',
    shortDescription: 'Strategic social advertising campaigns with hyper-targeted audience segmentation and creative testing.',
    shortDescriptionAr: 'حملات إعلانية ممولة ومستهدفة بدقة على منصات ميتا مع اختبارات مستمرة للنتائج.',
    deliverables: ['Creative Ad Design', 'Audience Funnel Building', 'Retargeting Campaigns', 'Pixel & CAPI Tracking'],
    technologies: ['Meta Ads Manager', 'Conversions API (CAPI)', 'Lookalike Audiences'],
    displayOrder: 9
  },
  {
    title: 'Social Media Marketing & Growth',
    titleAr: 'إدارة وتنمية حسابات التواصل الاجتماعي',
    slug: 'social-media-marketing',
    category: 'Growth & Performance Marketing',
    categoryAr: 'التسويق الرقمي ونمو المبيعات',
    icon: 'Share2',
    shortDescription: 'Comprehensive organic and paid social strategies to build brand authority and engaged communities.',
    shortDescriptionAr: 'استراتيجيات شاملة لإدارة وتنمية منصات التواصل وبناء حضور قوي للعلامة التجارية.',
    deliverables: ['Content Calendars', 'Community Management', 'Hashtag & Trend Analysis', 'Influencer Outreach'],
    technologies: ['LinkedIn', 'Instagram', 'X (Twitter)', 'TikTok'],
    displayOrder: 10
  },
  {
    title: 'Analytics & Conversion Optimization',
    titleAr: 'التحليلات وتحسين معدل التحويل',
    slug: 'analytics-conversion',
    category: 'Growth & Performance Marketing',
    categoryAr: 'التسويق الرقمي ونمو المبيعات',
    icon: 'BarChart2',
    shortDescription: 'Data-driven funnel tracking, user heatmap analysis, and conversion rate optimization (CRO).',
    shortDescriptionAr: 'تتبع مسار المستخدمين، تحليل الخرائط الحرارية، وتحسين نسبة التحويل للمبيعات.',
    deliverables: ['GA4 Custom Event Tracking', 'Heatmap & Session Recording Setup', 'Funnel Drop-Off Audits', 'Monthly Performance Reporting'],
    technologies: ['GA4', 'Microsoft Clarity', 'Hotjar', 'Looker Studio'],
    displayOrder: 11
  },

  // 4. UI/UX & Brand Design
  {
    title: 'UI/UX Design & Prototyping',
    titleAr: 'تصميم واجهات وتجربة المستخدم',
    slug: 'ui-ux-design',
    category: 'UI/UX & Brand Design',
    categoryAr: 'التصميم وتجربة المستخدم والهوية',
    icon: 'Layout',
    shortDescription: 'Human-centered user interfaces, interactive Figma prototypes, and scalable design systems.',
    shortDescriptionAr: 'واجهات مستخدم تفاعلية وجذابة مع نماذج أولية متطورة وأنظمة تصميم متكاملة.',
    deliverables: ['Wireframing & User Flows', 'Interactive High-Fidelity Prototypes', 'Design System Components', 'Developer Hand-off Specs'],
    technologies: ['Figma', 'Design Systems', 'Micro-Animations'],
    displayOrder: 12
  },
  {
    title: 'Brand Identity & Visual Systems',
    titleAr: 'بناء الهوية البصرية والعلامة التجارية',
    slug: 'branding',
    category: 'UI/UX & Brand Design',
    categoryAr: 'التصميم وتجربة المستخدم والهوية',
    icon: 'Palette',
    shortDescription: 'Strategic visual identities, typography guidelines, color systems, and digital brand assets.',
    shortDescriptionAr: 'تصميم هويات بصرية مميزة تعبر عن قوة وتفرد المشروع وتترك انطباعاً استثنائياً.',
    deliverables: ['Logo Guidelines & Usage', 'Typography & Color Tokens', 'Digital Brand Guidelines', 'Stationery & Social Kits'],
    technologies: ['Adobe Illustrator', 'Figma', 'Vector Assets'],
    displayOrder: 13
  },
  {
    title: 'Content Creation & Video Editing',
    titleAr: 'صناعة المحتوى والمونتاج الاحترافي',
    slug: 'content-and-video',
    category: 'UI/UX & Brand Design',
    categoryAr: 'التصميم وتجربة المستخدم والهوية',
    icon: 'Video',
    shortDescription: 'High-impact short-form and corporate video editing, motion graphics, and tech storytelling.',
    shortDescriptionAr: 'إنتاج ومونتاج فيديوهات احترافية ومحتوى بصري يجذب الانتباه ويشرح الحلول التقنية.',
    deliverables: ['Short-Form Video Production (Reels/TikTok)', 'Product Explainer Videos', 'Motion Graphics & Intros', 'Audio Mastering'],
    technologies: ['Premiere Pro', 'After Effects', 'CapCut Pro'],
    displayOrder: 14
  }
];

const initialFAQs = [
  {
    question: 'How does FIAUS Tech approach new client projects?',
    questionAr: 'كيف تبدأ فياوس تك العمل على المشاريع الجديدة؟',
    answer: 'We begin with a strategic discovery phase to understand your business goals, target markets (e.g. Bangladesh, Saudi Arabia, or Global), and technical requirements. We then craft a tailored architecture, prototype the design, engineer the solution, and deploy with comprehensive testing and ongoing support.',
    answerAr: 'نبدأ بجلسة استكشاف استراتيجية لفهم أهداف مشروعك والسوق المستهدف، ثم نضع المخطط التقني ونبني الواجهات والأنظمة مع إجراء اختبارات أداء دقيقة قبل الإطلاق.',
    category: 'General',
    displayOrder: 1
  },
  {
    question: 'What regions and clients do you serve?',
    questionAr: 'ما هي المناطق والأسواق التي تخدمونها؟',
    answer: 'FIAUS Tech operates internationally with core focus on clients in Bangladesh, Saudi Arabia, the GCC, and worldwide. Our infrastructure, bilingual capabilities (English & Arabic RTL), and flexible engagement models allow us to collaborate smoothly across time zones.',
    answerAr: 'نقدم خدماتنا دولياً مع تركيز رئيسي على العملاء في المملكة العربية السعودية وبنغلاديش ودول الخليج وحول العالم، مع دعم كامل للغتين العربية والإنجليزية.',
    category: 'General',
    displayOrder: 2
  },
  {
    question: 'Can you integrate custom AI models and automation into existing business systems?',
    questionAr: 'هل يمكنكم دمج نماذج الذكاء الاصطناعي والأتمتة في أنظمتنا الحالية؟',
    answer: 'Yes. We specialize in building custom AI agents, LLM integrations, document processors, and WhatsApp AI automation that connect directly into your existing CRM, database, or internal ERP systems without requiring a complete platform rebuild.',
    answerAr: 'نعم بالتأكيد، نحن متخصصون في بناء وكلاء الذكاء الاصطناعي وروبوتات واتساب الذكية وربطها مباشرة بقواعد بياناتكم أو أنظمة إدارة العملاء الحالية.',
    category: 'AI & Automation',
    displayOrder: 3
  },
  {
    question: 'What is the typical timeframe for a custom web or software project?',
    questionAr: 'ما هو الوقت المتوقع لإنجاز مشروع برمجي متكامل؟',
    answer: 'Timelines vary based on complexity: a targeted high-impact web portal or MVP typically takes 2–4 weeks, while comprehensive full-stack platforms or custom AI integrations range from 4–8 weeks with weekly milestone updates.',
    answerAr: 'يختلف الإطار الزمني وفقاً لحجم المشروع: المنصات التعريفية والتطبيقات الأولية تستغرق عادة من 2 إلى 4 أسابيع، بينما المنصات المعقدة تتراوح بين 4 إلى 8 أسابيع.',
    category: 'Development',
    displayOrder: 4
  },
  {
    question: 'How do you structure project engagement and payments?',
    questionAr: 'كيف يتم هيكلة خطط العمل والدفعات؟',
    answer: 'We work with clear milestone-based pricing. After aligning on the project scope and deliverables, payment is structured across key delivery phases (e.g. Kickoff, Design Approval, Beta Deployment, Final Launch).',
    answerAr: 'نعتمد هيكل دفعات مرتبط بالإنجاز والمراحل الواضحة المتفق عليها مسبقاً (مرحلة البدء، اعتماد التصميم، الإطلاق التجريبي، ثم التسليم النهائي).',
    category: 'Engagement & Pricing',
    displayOrder: 5
  }
];

export const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/fiaus_tech';
    await mongoose.connect(mongoUri);
    console.log('[Seed] Connected to MongoDB for seeding...');

    // 1. Seed Admin
    const defaultEmail = process.env.ADMIN_DEFAULT_EMAIL || 'admin@fiaus.tech';
    const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'FiausTech2026!Admin';
    const existingAdmin = await Admin.findOne({ email: defaultEmail });
    if (!existingAdmin) {
      await Admin.create({
        name: 'FIAUS Tech Super Admin',
        email: defaultEmail,
        password: defaultPassword,
        role: 'super_admin'
      });
      console.log(`[Seed] Created default admin account: ${defaultEmail}`);
    } else {
      console.log(`[Seed] Admin account ${defaultEmail} already exists.`);
    }

    // 2. Seed Projects
    await Project.deleteMany({});
    await Project.insertMany(realProjects);
    console.log(`[Seed] Inserted ${realProjects.length} real projects into database.`);

    // 3. Seed Services
    await Service.deleteMany({});
    await Service.insertMany(realServices);
    console.log(`[Seed] Inserted ${realServices.length} agency services.`);

    // 4. Seed FAQs
    await FAQ.deleteMany({});
    await FAQ.insertMany(initialFAQs);
    console.log(`[Seed] Inserted ${initialFAQs.length} FAQs.`);

    // 5. Seed Website Settings
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      await WebsiteSettings.create({});
      console.log('[Seed] Created default website settings.');
    }

    console.log('[Seed] Database seeding completed successfully!');
  } catch (error) {
    console.error('[Seed Error]', error);
  } finally {
    await mongoose.disconnect();
    console.log('[Seed] Disconnected from MongoDB.');
  }
};

if (process.argv[1].endsWith('seed.js')) {
  seedDatabase();
}

