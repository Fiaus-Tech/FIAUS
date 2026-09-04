import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Globe, Target, Rocket, Users, ArrowUpRight, ExternalLink } from 'lucide-react';
import { fetchTeamMembers } from '../services/api';

const DEFAULT_TEAM = [
  {
    _id: '1',
    name: 'Fahad Hossain',
    nameAr: 'فهد حسين',
    position: 'Founder & CEO',
    positionAr: 'المؤسس والرئيس التنفيذي',
    bio: 'Professional Full-Stack Web Developer and Technical Architect specializing in modern React, Node.js ecosystems, cloud solutions, and structured digital product delivery.',
    bioAr: 'مطور ويب متكامل ومهندس معماري تقني متخصص في منظومة React و Node.js والحلول السحابية وتطوير المنتجات الرقمية الحديثة.',
    photo: 'https://res.cloudinary.com/n5yq0whs/image/upload/v1788520752/FIAUS/team/founder_fahad_hossain.jpg',
    socialLinks: {
      portfolio: 'https://fahaddev0.vercel.app/'
    },
    displayOrder: 1,
    status: 'active'
  },
  {
    _id: '2',
    name: 'Toufiq Hasan Kiron',
    nameAr: 'توفيق حسن كيرون',
    position: 'Co-Founder',
    positionAr: 'الشريك المؤسس',
    bio: 'Frontend-focused Full-Stack Developer specializing in modern JavaScript, TypeScript, React, Next.js web applications, performance engineering, and scalable interface design.',
    bioAr: 'مطور متكامل متخصص في هندسة الواجهات الأمامية الحديثة باستخدام JavaScript و TypeScript و React و Next.js وتحسين الأداء الرقمي.',
    photo: 'https://res.cloudinary.com/n5yq0whs/image/upload/v1788520753/FIAUS/team/cofounder_toufiq_hasan_kiron.jpg',
    socialLinks: {
      portfolio: 'https://kiron.dev'
    },
    displayOrder: 2,
    status: 'active'
  },
  {
    _id: '3',
    name: 'Nahid Hassan Bulbul',
    nameAr: 'ناهد حسن بلبل',
    position: 'Director',
    positionAr: 'المدير',
    bio: 'Professional Full-Stack Developer focused on robust backend architectures, application engineering, system scalability, and client project execution.',
    bioAr: 'مطور متكامل متخصص في البنى التحتية الخلفية وهندسة التطبيقات وقابلية توسع الأنظمة وتنفيذ مشاريع العملاء.',
    photo: 'https://res.cloudinary.com/n5yq0whs/image/upload/v1788520776/FIAUS/team/director_nahid_hassan_bulbul.png',
    socialLinks: {
      portfolio: ''
    },
    displayOrder: 3,
    status: 'active'
  }
];

export default function AboutPage({ onOpenStartProject }) {
  const { t, isRTL, language } = useLanguage();
  const [team, setTeam] = useState(DEFAULT_TEAM);

  useEffect(() => {
    let isMounted = true;
    fetchTeamMembers()
      .then((res) => {
        if (isMounted && res.data?.data && res.data.data.length > 0) {
          setTeam(res.data.data);
        }
      })
      .catch(() => {
        // Keeps DEFAULT_TEAM safely
      });
    return () => {
      isMounted = false;
    };
  }, []);

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
          <div className="rounded-3xl bg-slate-50/80 dark:bg-navy-850/80 border border-slate-200/90 dark:border-slate-800/80 p-8 sm:p-10 shadow-xs">
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

          <div className="rounded-3xl bg-slate-50/80 dark:bg-navy-850/80 border border-slate-200/90 dark:border-slate-800/80 p-8 sm:p-10 shadow-xs">
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
        <div className="rounded-3xl bg-slate-900 dark:bg-navy-950 p-8 sm:p-12 text-white border border-slate-800 mb-20 shadow-xl">
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

        {/* --- DEDICATED TEAM SECTION (Compact, Balanced Avatar Presentation) --- */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300">
              <Users className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'فريق القيادة' : 'LEADERSHIP & ENGINEERING'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {language === 'ar' ? 'فريق فياوس تك' : 'Meet the Core Leadership Team'}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              {language === 'ar'
                ? 'نخبة من المهندسين والمطورين الملتزمين ببناء حلول رقمية وأنظمة أتمتة بمعايير عالمية.'
                : 'Senior technical architects and software engineers dedicated to high-impact digital delivery and intelligent systems.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => {
              const name = language === 'ar' && member.nameAr ? member.nameAr : member.name;
              const position = language === 'ar' && member.positionAr ? member.positionAr : member.position;
              const bio = language === 'ar' && member.bioAr ? member.bioAr : member.bio;
              const portfolioUrl = member.socialLinks?.portfolio;

              return (
                <div
                  key={member._id || member.name}
                  className="rounded-3xl bg-slate-50/80 dark:bg-navy-850/80 border border-slate-200/90 dark:border-slate-800/80 p-6 sm:p-8 flex flex-col justify-between hover:border-brand-500/50 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="space-y-5">
                    {/* Compact, Balanced Profile Photo */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl overflow-hidden border-2 border-brand-500/30 dark:border-brand-400/20 bg-slate-200 dark:bg-navy-800 shadow-md group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={member.photo}
                          alt={name}
                          className="w-full h-full object-cover object-top"
                          onError={(e) => {
                            // Fallback to local image asset if network or Cloudinary is unreachable
                            if (member.name.includes('Fahad')) e.target.src = '/assets/team/founder.jpeg';
                            else if (member.name.includes('Toufiq') || member.name.includes('Kiron')) e.target.src = '/assets/team/co-founder.jpeg';
                            else e.target.src = '/assets/team/director.png';
                          }}
                        />
                      </div>
                      <div className="space-y-1 text-start">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                          {name}
                        </h3>
                        <div className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-600 dark:text-brand-300 border border-brand-500/20">
                          {position}
                        </div>
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed text-start">
                      {bio}
                    </p>
                  </div>

                  {/* Portfolio Link Button (If available) */}
                  <div className="pt-6 mt-4 border-t border-slate-200/70 dark:border-slate-800/70 flex items-center justify-between">
                    {portfolioUrl ? (
                      <a
                        href={portfolioUrl.startsWith('http') ? portfolioUrl : `https://${portfolioUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 group/link transition-colors"
                      >
                        <span>{language === 'ar' ? 'زيارة المعرض الشخصي' : 'View Portfolio'}</span>
                        <ExternalLink className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''} group-hover/link:translate-x-0.5 transition-transform`} />
                      </a>
                    ) : (
                      <span className="text-xs text-slate-400 dark:text-slate-500 italic">
                        {language === 'ar' ? 'فياوس تك للحلول الرقمية' : 'FIAUS Tech Team'}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-8 text-center">
            <button
              onClick={onOpenStartProject}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shadow-lg hover:shadow-glow transition-all duration-200"
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
