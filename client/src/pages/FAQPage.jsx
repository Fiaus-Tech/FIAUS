import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { fetchFAQs } from '../services/api';
import {
  HelpCircle,
  ChevronDown,
  Sparkles,
  Search,
  MessageCircle,
  ArrowUpRight
} from 'lucide-react';

const starterFAQs = [
  {
    _id: 'faq_1',
    question: 'What core services does FIAUS Tech provide?',
    questionAr: 'ما هي الخدمات والحلول الأساسية التي تقدمها فياوس تك؟',
    answer: 'FIAUS Tech is a full-service Digital & AI Agency. Our core capabilities span Full-Stack Web & App Engineering (React, Next.js, Node.js), Custom AI Solutions & LLM Copilots, Business Process & Workflow Automation, WhatsApp Cloud API Chatbots, Google & Meta Performance Ads, and Luxury UI/UX Design.',
    answerAr: 'فياوس تك هي وكالة رقمية وحلول ذكاء اصطناعي متكاملة. تشمل خدماتنا هندسة الويب والتطبيقات (React, Next.js, Node.js)، حلول ووكلاء الذكاء الاصطناعي، أتمتة العمليات ومسارات العمل، روبوتات واتساب السحابية، إعلانات جوجل وميتا، وتصميم واجهات وتجربة المستخدم.',
    category: 'Services',
    categoryAr: 'الخدمات'
  },
  {
    _id: 'faq_2',
    question: 'How do you structure client projects and milestones?',
    questionAr: 'كيف يتم هيكلة خطط العمل ومراحل التسليم مع العملاء؟',
    answer: 'We follow a structured 9-phase framework. Every project is broken down into clear milestones (Discovery, UI/UX Prototyping, Core Development, AI/Automation Integration, QA Testing, and Cloud Launch). Payments are tied directly to verified deliverables at each phase.',
    answerAr: 'نعتمد إطار عمل منظم من 9 مراحل. يتم تقسيم كل مشروع إلى مراحل إنجاز واضحة (الاستكشاف، اعتماد التصاميم، البرمجة، دمج الذكاء الاصطناعي، اختبارات الجودة، والإطلاق السحابي) مع ربط الدفعات بكل مرحلة منجزة.',
    category: 'Process',
    categoryAr: 'منهجية العمل'
  },
  {
    _id: 'faq_3',
    question: 'What regions do you actively serve, and how do you handle international collaboration?',
    questionAr: 'ما هي المناطق التي تخدمونها وكيف يتم التنسيق مع العملاء دولياً؟',
    answer: 'We serve forward-thinking enterprises in Saudi Arabia, Bangladesh, the GCC, and worldwide. Our systems are built bilingual (English and native Arabic RTL), and our engineering team coordinates across time zones via scheduled weekly video checkpoints, dedicated WhatsApp groups, and Telegram.',
    answerAr: 'نخدم الشركات الرائدة في المملكة العربية السعودية، بنغلاديش، دول الخليج، وحول العالم. منصاتنا مبنية بدعم ثنائي اللغة (العربية والإنجليزية)، ويتواصل فريقنا عبر مجموعات عمل مخصصة على واتساب وتيليجرام واجتماعات أسبوعية منتظمة.',
    category: 'International',
    categoryAr: 'النطاق الدولي'
  },
  {
    _id: 'faq_4',
    question: 'Can you integrate AI automation into our existing systems without a complete rebuild?',
    questionAr: 'هل يمكنكم دمج الأتمتة والذكاء الاصطناعي في أنظمتنا الحالية دون إعادة بنائها من الصفر؟',
    answer: 'Yes. We build custom API connectors, webhooks, and AI copilots that integrate directly on top of your existing CRM (Salesforce, HubSpot, custom DBs), accounting software, or customer communication channels with zero disruption.',
    answerAr: 'نعم بالتأكيد. نقوم ببناء مسارات Webhooks ووكلاء ذكاء اصطناعي ترتبط مباشرة مع قواعد بياناتكم الحالية أو أنظمة إدارة العملاء (CRM) وبرامج المحاسبة دون الحاجة لإعادة بناء منصتكم بالكامل.',
    category: 'AI & Automation',
    categoryAr: 'الذكاء الاصطناعي والأتمتة'
  },
  {
    _id: 'faq_5',
    question: 'What is the typical timeframe for project delivery?',
    questionAr: 'ما هو الوقت المتوقع لإنجاز وتسليم المشاريع؟',
    answer: 'A high-impact web portal or MVP is typically engineered within 2–4 weeks. Comprehensive full-stack platforms, custom AI knowledge architectures, or enterprise automation systems range from 4–8 weeks with weekly live demo previews.',
    answerAr: 'المنصات التعريفية والتطبيقات الأولية تستغرق عادة من 2 إلى 4 أسابيع، بينما المنصات المعقدة ومسارات الأتمتة والذكاء الاصطناعي الشاملة تتراوح بين 4 إلى 8 أسابيع مع استعراض أسبوعي لمراحل التقدم.',
    category: 'Timelines',
    categoryAr: 'المواعيد والجدول الزمني'
  },
  {
    _id: 'faq_6',
    question: 'Do we own the full source code and intellectual property upon completion?',
    questionAr: 'هل نمتلك كامل الأكواد والملكية الفكرية للمشروع بعد التسليم؟',
    answer: 'Yes. Once final delivery is approved and milestone payments are settled, complete intellectual property, source repositories, and deployment configurations are 100% transferred to your organization.',
    answerAr: 'نعم بالكامل. فور اعتماد التسليم النهائي واستكمال الدفعات، تنتقل كامل حقوق الملكية الفكرية والأكواد المصدرية وإعدادات الاستضافة إلى مؤسستكم بنسبة 100%.',
    category: 'Legal & IP',
    categoryAr: 'الملكية الفكرية والتعاقد'
  }
];

export default function FAQPage({ onOpenStartProject }) {
  const { t, isRTL, language } = useLanguage();
  const [faqs, setFaqs] = useState(starterFAQs);
  const [searchQuery, setSearchQuery] = useState('');
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        const res = await fetchFAQs();
        if (res.success && res.data && res.data.length > 0) {
          setFaqs(res.data);
        }
      } catch (e) {
        console.error('Failed to fetch FAQs, using starter content', e);
      }
    };
    loadFAQs();
  }, []);

  const filteredFAQs = faqs.filter((faq) => {
    const q = (faq.question + ' ' + (faq.questionAr || '') + ' ' + faq.answer + ' ' + (faq.answerAr || '')).toLowerCase();
    return q.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="pt-28 pb-24 bg-white dark:bg-navy-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-start mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'مركز الأسئلة الشائعة' : 'KNOWLEDGE BASE & FAQ'}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
            {language === 'ar' ? 'كل ما تود معرفته عن فياوس تك' : 'Frequently Asked Questions'}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {language === 'ar'
              ? 'إجابات واضحة ومباشرة حول خدماتنا، منهجية العمل، الأمان، وإجراءات التعاقد والتسليم.'
              : 'Detailed answers regarding our engineering standards, milestone billing, AI workflows, and international client collaboration.'}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-10">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'ar' ? 'ابحث في الأسئلة الشائعة...' : 'Search questions or topics...'}
            className="w-full pl-12 pr-4 py-3.5 text-sm rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-navy-850 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500/50 shadow-xs"
          />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 mb-20">
          {filteredFAQs.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 dark:bg-navy-850 p-8 text-center text-sm text-slate-500">
              {language === 'ar' ? 'لم يتم العثور على نتائج مطابقة للبحث.' : 'No matching questions found.'}
            </div>
          ) : (
            filteredFAQs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              const question = language === 'ar' && faq.questionAr ? faq.questionAr : faq.question;
              const answer = language === 'ar' && faq.answerAr ? faq.answerAr : faq.answer;
              const category = language === 'ar' && faq.categoryAr ? faq.categoryAr : faq.category;

              return (
                <div
                  key={faq._id || idx}
                  className="rounded-2xl bg-slate-50/80 dark:bg-navy-850/80 border border-slate-200/90 dark:border-slate-800/90 overflow-hidden shadow-xs transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-start font-bold text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                  >
                    <div className="space-y-1 pr-4">
                      {category && (
                        <span className="text-[10px] uppercase font-bold tracking-wider text-brand-600 dark:text-brand-400 block">
                          {category}
                        </span>
                      )}
                      <span className="text-base sm:text-lg">{question}</span>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full bg-slate-200/70 dark:bg-navy-800 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0 transform transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-brand-50 dark:bg-brand-950/80 text-brand-600' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-800/60">
                      {answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* High-Contrast CTA */}
        <div className="relative rounded-3xl bg-slate-900 dark:bg-navy-950 p-8 sm:p-14 text-white border border-brand-800/60 shadow-2xl overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-start z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'هل لديك سؤال مخصص؟' : 'Have a Specific Question?'}</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {language === 'ar'
                ? 'تحدث مباشرة مع فريقنا التقني اليوم'
                : 'Connect directly with our engineering architects'}
            </h3>
            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              {language === 'ar'
                ? 'فريقنا متاح للإجابة على استفساراتك ومناقشة تفاصيل مشروعك القادم عبر الواتساب أو البريد.'
                : 'Our senior technical team is ready to review your project brief and discuss customized execution.'}
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

