import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Sparkles } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();

  return (
    <div className="pt-28 pb-24 bg-white dark:bg-navy-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/70 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300">
            <Shield className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'الشفافية والخصوصية' : 'LEGAL & TRUST'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">
            {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'ar' ? 'آخر تحديث: سبتمبر 2026' : 'Last updated: September 2026'}
          </p>
        </div>

        <div className="prose dark:prose-invert max-w-none space-y-8 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {language === 'ar' ? '1. الالتزام بالخصوصية' : '1. Overview & Commitment'}
            </h2>
            <p>
              {language === 'ar'
                ? 'تلتزم فياوس تك (FIAUS Tech) بحماية خصوصية عملائها وزوار موقعها الإلكتروني. توضح هذه السياسة كيفية تعاملنا مع البيانات المستلمة عبر استمارات التواصل وتفاصيل المشاريع.'
                : 'FIAUS Tech is committed to safeguarding client confidentiality and user data. This policy outlines how information received through project inquiry forms, direct channels, and analytics is collected and handled.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {language === 'ar' ? '2. البيانات التي نجمعها' : '2. Information We Collect'}
            </h2>
            <p>
              {language === 'ar'
                ? 'نقوم بجمع المعلومات الضرورية للتواصل وتقديم العروض الفنية، وتشمل: الاسم، البريد الإلكتروني، رقم الواتساب، الدولة، اسم المؤسسة، ونبذة المتطلبات التقنية للمشروع.'
                : 'We collect relevant project information provided voluntarily by prospective clients: full name, contact email, WhatsApp/phone number, country, company name, and project specifications.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {language === 'ar' ? '3. استخدام وحماية البيانات' : '3. Data Security & Usage'}
            </h2>
            <p>
              {language === 'ar'
                ? 'تُستخدم بيانات المشاريع حصرياً لإعداد التقييمات الفنية والتواصل المباشر. لا نقوم ببيع أو تأجير أو مشاركة أي بيانات مع أطراف ثالثة لأغراض تسويقية.'
                : 'Submitted data is strictly utilized for technical scoping, proposal generation, and direct communication. We never sell, lease, or distribute prospective client data to third parties.'}
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              {language === 'ar' ? '4. قنوات التواصل المباشرة' : '4. Contacting Us'}
            </h2>
            <p>
              {language === 'ar'
                ? 'لأي استفسار بخصوص سياسة الخصوصية، يمكنك التواصل معنا مباشرة عبر البريد الإلكتروني: fiaustech@hotmail.com أو عبر الواتساب: 9264 126 51 966+.'
                : 'For any privacy-related inquiries, contact our team directly at fiaustech@hotmail.com or via WhatsApp at +966 51 126 9264.'}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
