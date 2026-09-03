import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ExternalLink, Github, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function ProjectModal({ project, isOpen, onClose, initialIndex = 0 }) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const { isRTL, language } = useLanguage();

  useEffect(() => {
    setActiveIndex(initialIndex);
  }, [initialIndex, project]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, project]);

  if (!isOpen || !project) return null;

  const screenshots = project.screenshots && project.screenshots.length > 0
    ? project.screenshots
    : [{ title: project.title, url: project.coverImage }];

  const currentScreenshot = screenshots[activeIndex] || screenshots[0];

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % screenshots.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white dark:bg-navy-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-navy-850/80">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-brand-600 dark:text-brand-400">
              {project.category}
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {language === 'ar' && project.titleAr ? project.titleAr : project.title}
            </h3>
          </div>

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800 rounded-lg hover:bg-brand-100 transition-colors"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-navy-800 hover:bg-slate-200 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Screenshot Display */}
        <div className="relative flex-1 bg-slate-900/90 flex items-center justify-center p-3 sm:p-6 overflow-hidden min-h-[320px] sm:min-h-[440px]">
          <img
            src={currentScreenshot.url}
            alt={currentScreenshot.title || project.title}
            className="max-h-[60vh] max-w-full object-contain rounded-lg shadow-lg border border-slate-800"
          />

          {/* Navigation Arrows */}
          {screenshots.length > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-all shadow-md"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-all shadow-md"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Image Caption & Counter */}
          <div className="absolute bottom-4 inset-x-0 flex items-center justify-center px-4 pointer-events-none">
            <div className="px-4 py-1.5 rounded-full text-xs font-semibold bg-black/75 backdrop-blur-md text-white border border-white/10 shadow-lg">
              {currentScreenshot.title} ({activeIndex + 1} / {screenshots.length})
            </div>
          </div>
        </div>

        {/* Thumbnails Navigation Strip */}
        {screenshots.length > 1 && (
          <div className="p-3 bg-slate-50 dark:bg-navy-950 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2.5 overflow-x-auto">
            {screenshots.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  activeIndex === idx
                    ? 'border-brand-500 ring-2 ring-brand-500/40 scale-105'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

