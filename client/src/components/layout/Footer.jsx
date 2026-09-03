import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import {
  Mail,
  Phone,
  MessageCircle,
  Globe,
  ArrowUpRight,
  Send,
  Sparkles,
  Layers,
  Lock
} from 'lucide-react';

export default function Footer() {
  const { language, t, isRTL } = useLanguage();

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'Facebook', url: 'https://facebook.com/fiaustech', icon: 'FB' },
    { name: 'Instagram', url: 'https://instagram.com/fiaustech', icon: 'IG' },
    { name: 'X / Twitter', url: 'https://x.com/fiaus_tech', icon: 'X' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/fiaus-tech', icon: 'IN' },
    { name: 'GitHub', url: 'https://github.com/Fiaus-Tech', icon: 'GH' },
    { name: 'YouTube', url: 'https://youtube.com/@FiausTech', icon: 'YT' },
    { name: 'Telegram', url: 'https://t.me/fiaustech', icon: 'TG' },
    { name: 'TikTok', url: 'https://tiktok.com/@fiaustech', icon: 'TK' },
    { name: 'Snapchat', url: 'https://snapchat.com/add/fiaustech', icon: 'SC' }
  ];

  return (
    <footer className="relative bg-slate-50 dark:bg-navy-950 border-t border-slate-200 dark:border-slate-800/80 pt-16 pb-12 overflow-hidden transition-colors">
      {/* Background ambient accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl overflow-hidden shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 bg-white">
                <img
                  src="/assets/logo.jpeg"
                  alt="FIAUS Tech Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  FIAUS TECH
                </span>
                <p className="text-xs font-semibold text-brand-600 dark:text-brand-400">
                  {t('footer.descriptor')}
                </p>
              </div>
            </Link>

            <p className="text-sm italic font-medium text-slate-700 dark:text-slate-300">
              “{t('footer.tagline')}”
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              {t('footer.description')}
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300">
                <Globe className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                <span>Saudi Arabia • Bangladesh • Global Delivery</span>
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-900 dark:text-white mb-4">
              {t('footer.navigation')}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  {t('nav.services')}
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  {t('nav.work')}
                </Link>
              </li>
              <li>
                <Link to="/ai-solutions" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  {t('nav.aiSolutions')}
                </Link>
              </li>
              <li>
                <Link to="/process" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  {t('nav.process')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  {language === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                  {language === 'ar' ? 'المدونة والرؤى' : 'Blog & Insights'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Services Focus */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-900 dark:text-white mb-4">
              {t('footer.services')}
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li>Web & Full-Stack Development</li>
              <li>AI Solutions & Copilots</li>
              <li>Intelligent Workflow Automation</li>
              <li>WhatsApp Cloud API & Chatbots</li>
              <li>Google & Meta Performance Ads</li>
              <li>Luxury UI/UX & Brand Systems</li>
            </ul>
          </div>

          {/* Col 4: Direct Channels */}
          <div>
            <h3 className="text-xs uppercase tracking-wider font-bold text-slate-900 dark:text-white mb-4">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:fiaustech@hotmail.com"
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0" />
                  <span>fiaustech@hotmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/966511269264"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span dir="ltr">+966 51 126 9264</span>
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/fiaustech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <Send className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>Telegram: @fiaustech</span>
                </a>
              </li>
              <li className="pt-2">
                <Link
                  to="/admin/login"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  <Lock className="w-3 h-3" />
                  <span>{t('nav.admin')}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Channels Strip */}
        <div className="pt-8 pb-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
              {t('footer.social')}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-md text-xs font-semibold bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 hover:border-brand-500 transition-all shadow-xs"
                  title={s.name}
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-6 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {currentYear} FIAUS Tech. {t('footer.rights')}</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
              {t('footer.privacy')}
            </Link>
            <Link to="/terms" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
              {t('footer.terms')}
            </Link>
            <a href="https://fiaus.tech" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium">
              fiaus.tech
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

