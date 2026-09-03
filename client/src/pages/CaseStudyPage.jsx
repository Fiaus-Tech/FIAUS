import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProjectBySlug } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import ProjectModal from '../components/common/ProjectModal';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  Images
} from 'lucide-react';

export default function CaseStudyPage({ onOpenStartProject }) {
  const { slug } = useParams();
  const { t, isRTL, language } = useLanguage();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  useEffect(() => {
    const loadCaseStudy = async () => {
      setLoading(true);
      try {
        const res = await fetchProjectBySlug(slug);
        if (res.success && res.data) {
          setProject(res.data);
        }
      } catch (err) {
        console.error('Case study fetch error', err);
      } finally {
        setLoading(false);
      }
    };
    loadCaseStudy();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center pt-28">
        <div className="w-8 h-8 border-3 border-brand-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center pt-28 text-center px-4 space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {t('common.notFound')}
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          {t('common.notFoundDesc')}
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-600 text-white text-sm font-semibold shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('common.back')}</span>
        </Link>
      </div>
    );
  }

  const localizedTitle =
    language === 'ar' && project.titleAr ? project.titleAr : project.title;
  const localizedCategory =
    language === 'ar' && project.categoryAr ? project.categoryAr : project.category;
  const localizedFullDesc =
    language === 'ar' && project.fullDescriptionAr
      ? project.fullDescriptionAr
      : project.fullDescription;
  const localizedChallenge =
    language === 'ar' && project.challengeAr ? project.challengeAr : project.challenge;
  const localizedSolution =
    language === 'ar' && project.solutionAr ? project.solutionAr : project.solution;
  const localizedFeatures =
    language === 'ar' && project.featuresAr && project.featuresAr.length > 0
      ? project.featuresAr
      : project.features || [];

  const openGallery = (idx = 0) => {
    setModalIndex(idx);
    setModalOpen(true);
  };

  return (
    <div className="pt-28 pb-24 bg-white dark:bg-navy-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <div className="mb-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{t('common.back')}</span>
          </Link>
        </div>

        {/* Case Study Header */}
        <div className="max-w-4xl space-y-4 mb-12">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/80 border border-brand-200 dark:border-brand-800 text-brand-700 dark:text-brand-300">
              {localizedCategory}
            </span>
            <span className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 font-mono">
              PROJECT {String(project.displayOrder || 1).padStart(2, '0')}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
            {localizedTitle}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {localizedFullDesc}
          </p>
        </div>

        {/* Action Links Bar */}
        <div className="flex flex-wrap items-center gap-3 pb-10 border-b border-slate-200 dark:border-slate-800">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-800 rounded-xl shadow-md hover:shadow-glow transition-all"
            >
              <span>{t('projects.liveDemo')}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <div className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/80 rounded-xl">
              <Lock className="w-4 h-4" />
              <span>{t('projects.statusPrivate')}</span>
            </div>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 dark:hover:bg-navy-750 border border-slate-200 dark:border-slate-700 rounded-xl transition-all"
            >
              <Github className="w-4 h-4" />
              <span>{t('projects.viewCode')}</span>
            </a>
          )}

          <button
            onClick={() => openGallery(0)}
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-navy-900 border border-slate-200 dark:border-slate-800 hover:border-brand-500 rounded-xl transition-all"
          >
            <Images className="w-4 h-4 text-brand-600 dark:text-brand-400" />
            <span>{t('projects.viewGallery')}</span>
          </button>
        </div>

        {/* Featured Cover Showcase */}
        <div className="my-12 rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
          <div
            onClick={() => openGallery(0)}
            className="cursor-pointer relative aspect-[16/9] overflow-hidden group"
          >
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-brand-600 shadow-lg flex items-center gap-2">
                <Images className="w-4 h-4" />
                <span>{language === 'ar' ? 'تكبير واستعراض المعرض' : 'Click to Expand Gallery'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Technical Architecture Specs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          {/* Left Column: Challenge & Solution */}
          <div className="lg:col-span-8 space-y-8">
            {localizedChallenge && (
              <div className="rounded-3xl bg-slate-50/80 dark:bg-navy-850/80 border border-slate-200/90 dark:border-slate-800/80 p-8 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {language === 'ar' ? 'التحدي الهندسي ومتطلبات المشروع' : 'Engineering Challenge & Requirements'}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {localizedChallenge}
                </p>
              </div>
            )}

            {localizedSolution && (
              <div className="rounded-3xl bg-slate-50/80 dark:bg-navy-850/80 border border-slate-200/90 dark:border-slate-800/80 p-8 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                  {language === 'ar' ? 'الحل البرمجي والتنفيذ' : 'Technical Solution & Architecture'}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {localizedSolution}
                </p>
              </div>
            )}

            {/* Screenshots Strip Grid */}
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {language === 'ar' ? 'واجهات وشاشات النظام' : 'System Interfaces & Screenshots'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.screenshots.map((shot, idx) => (
                    <div
                      key={idx}
                      onClick={() => openGallery(idx)}
                      className="cursor-pointer group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={shot.url}
                          alt={shot.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3 bg-white dark:bg-navy-850 border-t border-slate-100 dark:border-slate-800/60 text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
                        {shot.title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Stack & Features Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Tech Stack */}
            <div className="rounded-3xl bg-slate-50/80 dark:bg-navy-850/80 border border-slate-200/90 dark:border-slate-800/80 p-6 shadow-sm">
              <h4 className="text-sm uppercase tracking-wider font-bold text-slate-900 dark:text-white mb-4">
                {t('projects.techStack')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white dark:bg-navy-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-2xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Core Features */}
            {localizedFeatures.length > 0 && (
              <div className="rounded-3xl bg-slate-50/80 dark:bg-navy-850/80 border border-slate-200/90 dark:border-slate-800/80 p-6 shadow-sm">
                <h4 className="text-sm uppercase tracking-wider font-bold text-slate-900 dark:text-white mb-4">
                  {t('projects.keyFeatures')}
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {localizedFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA Box */}
            <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white shadow-xl space-y-4">
              <h4 className="text-lg font-bold">
                {language === 'ar' ? 'هل تريد بناء منصة مماثلة؟' : 'Need a Similar Platform?'}
              </h4>
              <p className="text-xs text-brand-100 leading-relaxed">
                {language === 'ar'
                  ? 'يقوم فريقنا بهندسة حلول مخصصة تتماشى مع أهداف عملك بدقة وسرعة.'
                  : 'Our engineering team can build a tailored, high-converting digital system for your business.'}
              </p>
              <button
                onClick={onOpenStartProject}
                className="w-full py-2.5 text-xs font-bold text-brand-900 bg-white hover:bg-slate-100 rounded-xl shadow-sm transition-all"
              >
                {t('hero.ctaPrimary')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      <ProjectModal
        project={project}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialIndex={modalIndex}
      />
    </div>
  );
}
