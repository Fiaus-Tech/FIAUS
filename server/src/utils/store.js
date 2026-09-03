import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, '../../../data');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export const initialProjects = [
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
    fullDescription: 'ACC EST required a top-tier digital transformation to represent their enterprise footprint across the region. We engineered an ultra-fast, responsive web portal with bilingual capabilities (English & Arabic RTL), interactive corporate project timelines, and high-concurrency client touchpoints.',
    fullDescriptionAr: 'تطلبت مؤسسة إيه سي سي تحولاً رقمياً شاملاً يعكس مكانتها المؤسسية. قمنا بهندسة منصة فائقة السرعة ومتجاوبة بالكامل تدعم اللغتين مع معارض تفاعلية وبوابة تواصل للعملاء.',
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Node.js'],
    features: [
      'Dynamic Project Showcase',
      'Bilingual Architecture (LTR/RTL)',
      'Interactive Corporate Timeline',
      'Client Engagement Portal',
      'Optimized Core Web Vitals'
    ],
    featuresAr: [
      'عرض تفاعلي للمشاريع',
      'بنية ثنائية اللغة (عربي/إنجليزي)',
      'جدول زمني تفاعلي للمؤسسة',
      'بوابة تفاعل العملاء',
      'أداء وسرعة قياسية'
    ],
    challenge: 'Transition legacy presentation into a modern, lightning-fast digital asset that instills institutional credibility.',
    solution: 'Engineered a modern component-driven React architecture with custom Tailwind tokens and smooth page transitions.',
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
    status: 'published',
    createdAt: new Date().toISOString()
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
    fullDescription: 'Rabiora represents an advanced modern e-commerce deployment featuring dual theme systems (Light/Dark), high-throughput shopping carts, dynamic product filtering, and an integrated subscriber relationship management suite.',
    fullDescriptionAr: 'يمثل متجر رابيورا بنية تجارة إلكترونية متقدمة تدعم الوضعين الفاتح والداكن، وسلة شراء سريعة، وإدارة شاملة للمشتركين والطلبات.',
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
    challenge: 'Deliver zero-lag catalog rendering alongside administrative content controls in a unified stack.',
    solution: 'Built modular Express REST APIs backed by MongoDB with a responsive Tailwind React client.',
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
    status: 'published',
    createdAt: new Date().toISOString()
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
    fullDescription: 'TECH-GURD empowers internet users with client-side ad-blocking, live malicious tracker interception, and interactive real-time blocking telemetry. The platform includes a direct browser extension distribution pipeline and detailed privacy configuration rules.',
    fullDescriptionAr: 'يوفر نظام تيك جارد حماية شاملة للخصوصية وحجب التتبع والإعلانات مع لوحة تحكم حية ومركز لتثبيت ملحق المتصفح.',
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
    challenge: 'Visualizing thousands of real-time packet interceptions without browser performance degradation.',
    solution: 'Engineered lightweight WebSocket streams and optimized Canvas telemetry charts.',
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
    status: 'published',
    createdAt: new Date().toISOString()
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
    fullDescription: 'Current Ache BD serves as an essential national utility monitor, tracking load-shedding schedules, active grid status across all districts of Bangladesh, and historical power disruption trends with high-throughput caching.',
    fullDescriptionAr: 'منصة وطنية خدمية لمتابعة حالة شبكة الكهرباء القومية وجداول تخفيف الأحمال عبر جميع مناطق بنغلاديش مع إحصاءات تاريخية دقيقة.',
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
    challenge: 'Handling massive spike traffic during regional power fluctuations while keeping telemetry real-time.',
    solution: 'Designed an aggressive edge-caching layer and memory-optimized state management.',
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
    status: 'published',
    createdAt: new Date().toISOString()
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
    status: 'published',
    createdAt: new Date().toISOString()
  }
];

export const initialFAQs = [
  {
    _id: 'faq_1',
    question: 'What core services does FIAUS Tech provide?',
    questionAr: 'ما هي الخدمات والحلول الأساسية التي تقدمها فياوس تك؟',
    answer: 'FIAUS Tech is a full-service Digital & AI Agency. Our core capabilities span Full-Stack Web & App Engineering (React, Next.js, Node.js), Custom AI Solutions & LLM Copilots, Business Process & Workflow Automation, WhatsApp Cloud API Chatbots, Google & Meta Performance Ads, and Luxury UI/UX Design.',
    answerAr: 'فياوس تك هي وكالة رقمية وحلول ذكاء اصطناعي متكاملة. تشمل خدماتنا هندسة الويب والتطبيقات (React, Next.js, Node.js)، حلول ووكلاء الذكاء الاصطناعي، أتمتة العمليات ومسارات العمل، روبوتات واتساب السحابية، إعلانات جوجل وميتا، وتصميم واجهات وتجربة المستخدم.',
    category: 'Services',
    categoryAr: 'الخدمات',
    displayOrder: 1,
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'faq_2',
    question: 'How do you structure client projects and milestones?',
    questionAr: 'كيف يتم هيكلة خطط العمل ومراحل التسليم مع العملاء؟',
    answer: 'We follow a structured 9-phase framework. Every project is broken down into clear milestones (Discovery, UI/UX Prototyping, Core Development, AI/Automation Integration, QA Testing, and Cloud Launch). Payments are tied directly to verified deliverables at each phase.',
    answerAr: 'نعتمد إطار عمل منظم من 9 مراحل. يتم تقسيم كل مشروع إلى مراحل إنجاز واضحة (الاستكشاف، اعتماد التصاميم، البرمجة، دمج الذكاء الاصطناعي، اختبارات الجودة، والإطلاق السحابي) مع ربط الدفعات بكل مرحلة منجزة.',
    category: 'Process',
    categoryAr: 'منهجية العمل',
    displayOrder: 2,
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'faq_3',
    question: 'What regions do you actively serve, and how do you handle international collaboration?',
    questionAr: 'ما هي المناطق التي تخدمونها وكيف يتم التنسيق مع العملاء دولياً؟',
    answer: 'We serve forward-thinking enterprises in Saudi Arabia, Bangladesh, the GCC, and worldwide. Our systems are built bilingual (English and native Arabic RTL), and our engineering team coordinates across time zones via scheduled weekly video checkpoints, dedicated WhatsApp groups, and Telegram.',
    answerAr: 'نخدم الشركات الرائدة في المملكة العربية السعودية، بنغلاديش، دول الخليج، وحول العالم. منصاتنا مبنية بدعم ثنائي اللغة (العربية والإنجليزية)، ويتواصل فريقنا عبر مجموعات عمل مخصصة على واتساب وتيليجرام واجتماعات أسبوعية منتظمة.',
    category: 'International',
    categoryAr: 'النطاق الدولي',
    displayOrder: 3,
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'faq_4',
    question: 'Can you integrate AI automation into our existing systems without a complete rebuild?',
    questionAr: 'هل يمكنكم دمج الأتمتة والذكاء الاصطناعي في أنظمتنا الحالية دون إعادة بنائها من الصفر؟',
    answer: 'Yes. We build custom API connectors, webhooks, and AI copilots that integrate directly on top of your existing CRM (Salesforce, HubSpot, custom DBs), accounting software, or customer communication channels with zero disruption.',
    answerAr: 'نعم بالتأكيد. نقوم ببناء مسارات Webhooks ووكلاء ذكاء اصطناعي ترتبط مباشرة مع قواعد بياناتكم الحالية أو أنظمة إدارة العملاء (CRM) وبرامج المحاسبة دون الحاجة لإعادة بناء منصتكم بالكامل.',
    category: 'AI & Automation',
    categoryAr: 'الذكاء الاصطناعي والأتمتة',
    displayOrder: 4,
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'faq_5',
    question: 'What is the typical timeframe for project delivery?',
    questionAr: 'ما هو الوقت المتوقع لإنجاز وتسليم المشاريع؟',
    answer: 'A high-impact web portal or MVP is typically engineered within 2–4 weeks. Comprehensive full-stack platforms, custom AI knowledge architectures, or enterprise automation systems range from 4–8 weeks with weekly live demo previews.',
    answerAr: 'المنصات التعريفية والتطبيقات الأولية تستغرق عادة من 2 إلى 4 أسابيع، بينما المنصات المعقدة ومسارات الأتمتة والذكاء الاصطناعي الشاملة تتراوح بين 4 إلى 8 أسابيع مع استعراض أسبوعي لمراحل التقدم.',
    category: 'Timelines',
    categoryAr: 'المواعيد والجدول الزمني',
    displayOrder: 5,
    active: true,
    createdAt: new Date().toISOString()
  },
  {
    _id: 'faq_6',
    question: 'Do we own the full source code and intellectual property upon completion?',
    questionAr: 'هل نمتلك كامل الأكواد والملكية الفكرية للمشروع بعد التسليم؟',
    answer: 'Yes. Once final delivery is approved and milestone payments are settled, complete intellectual property, source repositories, and deployment configurations are 100% transferred to your organization.',
    answerAr: 'نعم بالكامل. فور اعتماد التسليم النهائي واستكمال الدفعات، تنتقل كامل حقوق الملكية الفكرية والأكواد المصدرية وإعدادات الاستضافة إلى مؤسستكم بنسبة 100%.',
    category: 'Legal & IP',
    categoryAr: 'الملكية الفكرية والتعاقد',
    displayOrder: 6,
    active: true,
    createdAt: new Date().toISOString()
  }
];

export const initialBlogPosts = [
  {
    _id: 'blog_1',
    title: 'AI Automation for Modern Businesses: Transforming Operations with Autonomous Agents',
    titleAr: 'أتمتة الذكاء الاصطناعي للشركات الحديثة: تحويل العمليات باستخدام الوكلاء المستقلين',
    slug: 'ai-automation-modern-business',
    category: 'AI & Automation',
    categoryAr: 'الذكاء الاصطناعي والأتمتة',
    tags: ['AI Agents', 'Automation', 'Productivity', 'Enterprise'],
    coverImage: '/assets/projects/p3/main.png',
    author: {
      name: 'FIAUS Tech AI Lab',
      role: 'Applied AI & Automation Engineers'
    },
    excerpt: 'How modern businesses in Saudi Arabia and global markets are replacing manual back-office tasks with resilient, domain-tailored AI workflow agents.',
    excerptAr: 'كيف تستبدل الشركات الحديثة في المملكة العربية السعودية والأسواق العالمية المهام اليدوية بوكلاء أذكياء ومسارات أتمتة دقيقة.',
    content: `## The Shift from Manual Workflows to Autonomous AI Systems

In today's high-velocity digital economy, businesses spend hundreds of engineering and operational hours on repetitive data transcription, manual lead qualification, and cross-platform synchronization.

### 1. What are Domain-Specific AI Agents?
Unlike generic chatbots, domain-tailored AI agents are connected directly to enterprise databases, webhooks, and communication APIs. They understand the organizational context and execute actions automatically.

### 2. Practical Enterprise Use Cases:
- **Instant Lead Enrichment**: Qualifying customer briefs submitted via WhatsApp or web forms in seconds.
- **Automated ERP & CRM Sync**: Eliminating manual data entry between storefronts and accounting books.
- **Intelligent Triage**: Routing technical customer support requests directly to the right engineering teams with complete context.

### Conclusion
Implementing AI automation is not about replacing human creativity—it is about empowering your core team to focus entirely on high-leverage strategic growth while algorithms handle repetitive execution.`,
    contentAr: `## الانتقال من الإجراءات اليدوية إلى المنظومات الذكية المؤتمتة

في الاقتصاد الرقمي المتسارع اليوم، تستهلك الشركات مئات الساعات في نقل البيانات يدوياً، تأهيل العملاء، ومزامنة الأنظمة المتعددة.

### 1. ما هو وكيل الذكاء الاصطناعي المخصص للمؤسسات؟
على عكس روبوتات المحادثة العامة، يرتبط الوكيل الذكي بقواعد بيانات الشركة ومسارات الـ APIs مباشرة لتنفيذ المهام ومساعدة العملاء بدقة متناهية.

### 2. حالات استخدام واقعية:
- **تأهيل فوري للعملاء**: معالجة طلبات المشاريع الواردة عبر واتساب في ثوانٍ.
- **مزامنة الأنظمة والـ CRM**: القضاء على الإدخال اليدوي المكرر للفواتير والطلبات.
- **فرز الدعم الفني الذكي**: توجيه التذاكر للمهندس المختص مع ملخص المشكلة وسجل العميل.`,
    status: 'published',
    readTime: '5 min read',
    publishedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    createdAt: new Date().toISOString(),
    seo: {
      title: 'AI Automation for Modern Businesses | FIAUS Tech Insights',
      description: 'Explore how custom AI agents and workflow automations eliminate manual bottlenecks for growing enterprises.'
    }
  },
  {
    _id: 'blog_2',
    title: 'Why Modern Businesses Need Bespoke Web Architecture Over Generic Themes',
    titleAr: 'لماذا تحتاج الشركات الحديثة إلى بنية برمجية مخصصة بدلاً من القوالب الجاهزة',
    slug: 'bespoke-web-architecture-vs-templates',
    category: 'Web Engineering',
    categoryAr: 'هندسة الويب والتطبيقات',
    tags: ['React', 'Next.js', 'Core Web Vitals', 'Performance'],
    coverImage: '/assets/projects/p1/main.png',
    author: {
      name: 'FIAUS Tech Engineering',
      role: 'Full-Stack Technical Architects'
    },
    excerpt: 'Why off-the-shelf website templates fail high-growth companies in security, speed, conversion rates, and international SEO ranking.',
    excerptAr: 'لماذا تفشل القوالب الجاهزة في تلبية طموحات الشركات سريعة النمو من حيث الأمان والسرعة وتصدر محركات البحث العالمية.',
    content: `## The True Cost of Generic Website Templates

Many businesses initially consider off-the-shelf templates or generic site builders to reduce initial setup time. However, as business requirements evolve, the technical debt of generic themes becomes a major growth barrier.

### 1. Bloated Code vs Clean Component Architecture
Pre-built themes load hundreds of unused scripts, CSS libraries, and plugin wrappers. A bespoke React/Next.js application only bundles the code that is actually executed, achieving sub-second load times and 95+ Google Lighthouse scores.

### 2. Internationalization & Native Arabic RTL
Generic templates treat Arabic as an afterthought with broken CSS alignments. Handcrafted engineering ensures authentic RTL typography, mirrored navigation hierarchies, and optimal user experiences across all regions.

### 3. Security & Scalability
Custom full-stack architectures enforce strict CORS headers, input sanitization, and isolated database credentials—protecting your client records and enterprise reputation.`,
    contentAr: `## التكلفة الحقيقية للقوالب والمواقع الجاهزة

تلجأ بعض الشركات في البداية إلى القوالب الجاهزة، ولكن مع نمو الأعمال تتضح العيوب الهيكلية التي تعيق التوسع وتؤثر على سرعة التصفح.

### 1. الأكواد المتضخمة مقابل البنية البرمجية النظيفة
تحمل القوالب مئات الإضافات غير الضرورية التي تبطئ الموقع. بينما البنية المخصصة في React تقدم سرعة فائقة ونتائج 95+ في مؤشرات Google Lighthouse.

### 2. دعم اللغة العربية وتجربة المستخدم RTL
القوالب الجاهزة تعاني من تشوهات بصرية عند تحويلها للغة العربية. بينما التصميم المخصص يبني واجهة عربية أصيلة متناسقة مع الخطوط الرسمية وتدفق القراءة الطبيعي.`,
    status: 'published',
    readTime: '6 min read',
    publishedAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    createdAt: new Date().toISOString(),
    seo: {
      title: 'Bespoke Web Architecture vs Generic Themes | FIAUS Tech',
      description: 'Understand how custom full-stack web engineering powers higher conversions, security, and search performance.'
    }
  },
  {
    _id: 'blog_3',
    title: 'WhatsApp Business Cloud API & AI: Automating Client Acquisition',
    titleAr: 'واجهة واتساب السحابية للأعمال والذكاء الاصطناعي: أتمتة اكتساب العملاء',
    slug: 'whatsapp-cloud-api-ai-chatbots',
    category: 'AI & Automation',
    categoryAr: 'الذكاء الاصطناعي والأتمتة',
    tags: ['WhatsApp API', 'Chatbots', 'Meta Cloud API', 'Conversion'],
    coverImage: '/assets/projects/p2/main.png',
    author: {
      name: 'FIAUS Tech Digital Strategy',
      role: 'Growth & Automation Consultants'
    },
    excerpt: 'Transforming WhatsApp into an automated sales and onboarding pipeline using official Meta Cloud APIs and conversational AI.',
    excerptAr: 'تحويل تطبيق واتساب إلى قناة مبيعات وتواصل مؤتمتة على مدار الساعة باستخدام واجهة Meta السحابية والذكاء الاصطناعي.',
    content: `## WhatsApp as the Primary Business Channel in Saudi Arabia & GCC

In Saudi Arabia and international emerging markets, WhatsApp is the dominant communication channel for business transactions, customer support, and commercial negotiations.

### 1. Moving Beyond Unofficial Personal WhatsApp Tools
Using personal WhatsApp numbers or unofficial scraping scripts leads to phone number bans and lost customer records. The official Meta WhatsApp Cloud API guarantees enterprise reliability, verified business badges, and webhook scalability.

### 2. How Automated WhatsApp Copilots Work:
- **Instant Response to Ad Leads**: When a user clicks a Meta or Google Ad, the AI greets them immediately on WhatsApp.
- **Interactive Requirement Collection**: Gathering project details, budget, and contact details conversational style.
- **Instant CRM Insertion**: The lead is formatted and posted straight to your admin dashboard without manual copy-pasting.`,
    contentAr: `## واتساب كقناة رئيسية لنمو الأعمال في السعودية والخليج

يعد تطبيق واتساب القناة المفضلة والأكثر تفاعلاً لإتمام الصفقات التجارية وخدمة العملاء في المملكة والمنطقة.

### 1. الانتقال من الحسابات الفردية إلى واجهة Meta السحابية
تضمن واجهة WhatsApp Cloud API الرسمية حماية حسابات الشركة وتوثيق العلامة التجارية مع إمكانية إرسال واستقبال آلاف المحادثات في الوقت الفعلي.

### 2. آلية عمل روبوتات واتساب الذكية:
- **الرد الفوري على إعلانات التواصل**: استقبال العميل في ثوانٍ فور ضغطه على الإعلان.
- **جمع المتطلبات آلياً**: استعراض الخدمات وجمع تفاصيل المشروع والميزانية.
- **المزامنة مع لوحة التحكم**: تسجيل بيانات العميل المحتمل تلقائياً في CRM الشركة.`,
    status: 'published',
    readTime: '5 min read',
    publishedAt: new Date(Date.now() - 12 * 86400000).toISOString(),
    createdAt: new Date().toISOString(),
    seo: {
      title: 'WhatsApp Business Cloud API & AI Automation | FIAUS Tech',
      description: 'Learn how to leverage official Meta WhatsApp Cloud API and AI chatbots to scale client acquisition.'
    }
  }
];

const initialSettings = {
  companyName: 'FIAUS Tech',
  descriptor: 'Digital & AI Agency',
  descriptorAr: 'وكالة رقمية وحلول الذكاء الاصطناعي',
  tagline: 'Innovate. Automate. Grow.',
  taglineAr: 'ابتكر. أتمت. انمو.',
  email: 'fiaustech@hotmail.com',
  phone: '+966 51 126 9264',
  whatsapp: '+966511269264',
  telegram: 'https://t.me/fiaustech',
  websiteUrl: 'https://fiaus.tech',
  socialLinks: {
    facebook: 'https://facebook.com/fiaustech',
    instagram: 'https://instagram.com/fiaustech',
    x: 'https://x.com/fiaus_tech',
    linkedin: 'https://www.linkedin.com/in/fiaus-tech',
    github: 'https://github.com/Fiaus-Tech',
    youtube: 'https://youtube.com/@FiausTech',
    tiktok: 'https://tiktok.com/@fiaustech',
    snapchat: 'https://snapchat.com/add/fiaustech'
  },
  analytics: {
    googleAnalyticsId: 'G-XXXXXXXXXX',
    metaPixelId: '',
    clarityId: ''
  }
};

class JSONStore {
  constructor() {
    this.projectsFile = path.join(dataDir, 'projects.json');
    this.leadsFile = path.join(dataDir, 'leads.json');
    this.servicesFile = path.join(dataDir, 'services.json');
    this.faqsFile = path.join(dataDir, 'faqs.json');
    this.messagesFile = path.join(dataDir, 'messages.json');
    this.settingsFile = path.join(dataDir, 'settings.json');
    this.teamFile = path.join(dataDir, 'team.json');
    this.testimonialsFile = path.join(dataDir, 'testimonials.json');
    this.blogsFile = path.join(dataDir, 'blogs.json');
    this.init();
  }

  read(file, defaultVal) {
    try {
      if (fs.existsSync(file)) {
        return JSON.parse(fs.readFileSync(file, 'utf8'));
      }
      this.write(file, defaultVal);
      return defaultVal;
    } catch (e) {
      return defaultVal;
    }
  }

  write(file, data) {
    try {
      fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    } catch (e) {
      console.error(`Failed to write store file: ${file}`, e);
    }
  }

  init() {
    this.read(this.projectsFile, initialProjects);
    this.read(this.leadsFile, []);
    this.read(this.servicesFile, []);
    this.read(this.faqsFile, initialFAQs);
    this.read(this.messagesFile, []);
    this.read(this.settingsFile, initialSettings);
    this.read(this.teamFile, []);
    this.read(this.testimonialsFile, []);
    this.read(this.blogsFile, initialBlogPosts);
  }

  getProjects() {
    const list = this.read(this.projectsFile, initialProjects);
    return list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }

  saveProjects(projects) {
    this.write(this.projectsFile, projects);
  }

  getLeads() {
    return this.read(this.leadsFile, []);
  }

  saveLeads(leads) {
    this.write(this.leadsFile, leads);
  }

  getServices() {
    return this.read(this.servicesFile, []);
  }

  saveServices(services) {
    this.write(this.servicesFile, services);
  }

  getFAQs() {
    const list = this.read(this.faqsFile, initialFAQs);
    return list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }

  saveFAQs(faqs) {
    this.write(this.faqsFile, faqs);
  }

  getMessages() {
    return this.read(this.messagesFile, []);
  }

  saveMessages(messages) {
    this.write(this.messagesFile, messages);
  }

  getTeam() {
    const list = this.read(this.teamFile, []);
    return list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }

  saveTeam(team) {
    this.write(this.teamFile, team);
  }

  getTestimonials() {
    const list = this.read(this.testimonialsFile, []);
    return list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }

  saveTestimonials(testimonials) {
    this.write(this.testimonialsFile, testimonials);
  }

  getBlogs() {
    const list = this.read(this.blogsFile, initialBlogPosts);
    return list.sort((a, b) => new Date(b.publishedAt || b.createdAt || 0) - new Date(a.publishedAt || a.createdAt || 0));
  }

  saveBlogs(blogs) {
    this.write(this.blogsFile, blogs);
  }

  getSettings() {
    return this.read(this.settingsFile, initialSettings);
  }

  saveSettings(settings) {
    this.write(this.settingsFile, settings);
  }
}

export const store = new JSONStore();
