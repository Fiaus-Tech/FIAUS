import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { fetchBlogPosts } from '../services/api';
import { Sparkles, BookOpen, Clock, ArrowUpRight, Search, Calendar, User } from 'lucide-react';

const starterBlogPosts = [
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
    readTime: '5 min read',
    publishedAt: new Date(Date.now() - 3 * 86400000).toISOString()
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
    readTime: '6 min read',
    publishedAt: new Date(Date.now() - 7 * 86400000).toISOString()
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
    readTime: '5 min read',
    publishedAt: new Date(Date.now() - 12 * 86400000).toISOString()
  }
];

export default function BlogPage({ onOpenStartProject }) {
  const { t, isRTL, language } = useLanguage();
  const [blogs, setBlogs] = useState(starterBlogPosts);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const res = await fetchBlogPosts();
        if (res.success && res.data && res.data.length > 0) {
          setBlogs(res.data);
        }
      } catch (e) {
        console.error('Failed to load blog posts, using starter posts', e);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  const categories = [
    { id: 'All', labelEn: 'All Insights', labelAr: 'جميع المقالات' },
    { id: 'AI & Automation', labelEn: 'AI & Automation', labelAr: 'الذكاء الاصطناعي والأتمتة' },
    { id: 'Web Engineering', labelEn: 'Web Engineering', labelAr: 'هندسة الويب' },
    { id: 'Growth Strategy', labelEn: 'Growth Strategy', labelAr: 'استراتيجيات النمو' }
  ];

  const filteredBlogs = blogs.filter((b) => {
    const matchesCat = activeCategory === 'All' || b.category === activeCategory;
    const titleMatch = (b.title + ' ' + (b.titleAr || '') + ' ' + b.excerpt).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && titleMatch;
  });

  return (
    <div className="pt-28 pb-24 bg-white dark:bg-navy-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4 text-start">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'المقالات والأبحاث التقنية' : 'INSIGHTS & ENGINEERING'}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
            {language === 'ar' ? 'أحدث الرؤى حول الذكاء الاصطناعي والتحول الرقمي' : 'Technical Insights, AI Automation & Architecture'}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {language === 'ar'
              ? 'مقالات هندسية متخصصة ومحدثة باستمرار لمساعدة قادة الأعمال على الاستفادة من أحدث تقنيات الويب والأتمتة.'
              : 'Actionable perspectives on full-stack web engineering, custom AI copilot deployments, and high-conversion digital architectures.'}
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const label = language === 'ar' ? cat.labelAr : cat.labelEn;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                    isActive
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-navy-750'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'ar' ? 'بحث في المقالات...' : 'Search articles...'}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50"
            />
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {filteredBlogs.length === 0 ? (
            <div className="col-span-full py-16 text-center text-sm text-slate-500">
              {language === 'ar' ? 'لم يتم العثور على مقالات تطابق البحث.' : 'No articles found matching your criteria.'}
            </div>
          ) : (
            filteredBlogs.map((post) => {
              const title = language === 'ar' && post.titleAr ? post.titleAr : post.title;
              const excerpt = language === 'ar' && post.excerptAr ? post.excerptAr : post.excerpt;
              const category = language === 'ar' && post.categoryAr ? post.categoryAr : post.category;

              return (
                <article
                  key={post._id || post.slug}
                  className="rounded-3xl bg-slate-50/70 dark:bg-navy-850/70 border border-slate-200/90 dark:border-slate-800/80 overflow-hidden shadow-sm hover:shadow-luxury dark:hover:shadow-luxury-dark hover:border-brand-500/40 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Cover Image */}
                    <div className="aspect-[16/9] bg-slate-900 overflow-hidden relative">
                      <img
                        src={post.coverImage || '/assets/projects/p1/main.png'}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/90 dark:bg-navy-900/90 text-brand-700 dark:text-brand-300 shadow-sm backdrop-blur-xs">
                          {category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-7 space-y-3">
                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{post.readTime || '5 min read'}</span>
                        </span>
                        <span>•</span>
                        <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
                      </div>

                      <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                        {title}
                      </h2>

                      <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal line-clamp-3">
                        {excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 pt-0">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 group-hover:underline"
                    >
                      <span>{language === 'ar' ? 'قراءة المقال بالكامل' : 'Read Full Article'}</span>
                      <ArrowUpRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </Link>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* High-Contrast CTA Section */}
        <div className="relative rounded-3xl bg-slate-900 dark:bg-navy-950 p-8 sm:p-14 text-white border border-brand-800/60 shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-start z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'فياوس تك الهندسية' : 'Engineering Excellence'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {language === 'ar'
                ? 'هل تريد تطبيق هذه الحلول على منظومة أعمالك؟'
                : 'Want to implement custom web & AI architecture for your business?'}
            </h3>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {language === 'ar'
                ? 'تواصل مع فريقنا التقني اليوم لمناقشة أهدافك وبدء مرحلة التخطيط والتنفيذ المباشر.'
                : 'Connect with our technical consultants to evaluate your architecture and automate key processes.'}
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
          </div>
        </div>
      </div>
    </div>
  );
}
