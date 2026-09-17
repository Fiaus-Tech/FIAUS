import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { fetchFAQs } from '../../services/api';
import { ChevronDown, Sparkles, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const { t, language } = useLanguage();
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    let isMounted = true;
    const loadFAQs = async () => {
      try {
        const res = await fetchFAQs();
        if (isMounted && res.success && Array.isArray(res.data)) {
          setFaqs(res.data);
        }
      } catch (e) {
        console.error('Failed to load FAQs', e);
      }
    };
    loadFAQs();
    return () => {
      isMounted = false;
    };
  }, []);

  const toggleFAQ = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="relative py-24 sm:py-32 bg-slate-50/60 dark:bg-navy-950/60 border-t border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-start mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{t('faq.badge')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
            {t('faq.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const question =
              language === 'ar' && faq.questionAr ? faq.questionAr : faq.question;
            const answer =
              language === 'ar' && faq.answerAr ? faq.answerAr : faq.answer;

            return (
              <div
                key={idx}
                className="rounded-2xl bg-white dark:bg-navy-900 border border-slate-200/90 dark:border-slate-800/90 overflow-hidden shadow-xs transition-all duration-200"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-6 text-start font-bold text-slate-900 dark:text-white hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <span className="text-base sm:text-lg pr-4">{question}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-100 dark:bg-navy-800 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0 transform transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-brand-50 dark:bg-brand-950/80 text-brand-600' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60">
                    {answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

