import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { fetchBlogPostBySlug } from '../services/api';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  User,
  Share2,
  Sparkles,
  ArrowUpRight,
  BookOpen
} from 'lucide-react';

export default function BlogPostPage({ onOpenStartProject }) {
  const { slug } = useParams();
  const { t, isRTL, language } = useLanguage();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      try {
        const res = await fetchBlogPostBySlug(slug);
        if (res.success && res.data) {
          setPost(res.data);
        }
      } catch (e) {
        console.error('Failed to load blog post', e);
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex items-center justify-center bg-white dark:bg-navy-900">
        <div className="w-8 h-8 border-3 border-brand-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="pt-32 pb-24 min-h-screen text-center bg-white dark:bg-navy-900">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Article Not Found</h2>
        <Link to="/blog" className="text-brand-600 underline text-sm">
          Return to All Articles
        </Link>
      </div>
    );
  }

  const title = language === 'ar' && post.titleAr ? post.titleAr : post.title;
  const content = language === 'ar' && post.contentAr ? post.contentAr : post.content;
  const category = language === 'ar' && post.categoryAr ? post.categoryAr : post.category;

  return (
    <div className="pt-28 pb-24 bg-white dark:bg-navy-900 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{language === 'ar' ? 'العودة لجميع المقالات' : 'Back to All Articles'}</span>
          </Link>
        </div>

        {/* Article Header */}
        <header className="space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
            {category}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight leading-tight">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/80 dark:border-slate-800/80">
            <span className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-300">
              <User className="w-3.5 h-3.5 text-brand-600" />
              <span>{post.author?.name || 'FIAUS Tech Engineering'}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime || '5 min read'}</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</span>
            </span>
          </div>
        </header>

        {/* Featured Cover Image */}
        {post.coverImage && (
          <div className="mb-12 rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 aspect-[16/9] shadow-lg">
            <img src={post.coverImage} alt={title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Article Body */}
        <div className="prose prose-slate dark:prose-invert max-w-none mb-16 text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 text-sm sm:text-base whitespace-pre-line">
          {content}
        </div>

        {/* Post Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 mb-16 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase mr-2">Tags:</span>
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-navy-800 text-slate-600 dark:text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA Card */}
        <div className="relative rounded-3xl bg-slate-900 dark:bg-navy-950 p-8 sm:p-12 text-white border border-brand-800/60 shadow-2xl overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-start">
            <h3 className="text-xl font-bold">
              {language === 'ar' ? 'هل تريد استشارة متخصصة لمشروعك؟' : 'Ready to discuss your technical architecture?'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {language === 'ar' ? 'تواصل مع مهندسينا مباشرة عبر الواتساب أو البريد.' : 'Connect directly with senior engineers at FIAUS Tech.'}
            </p>
          </div>

          <button
            onClick={onOpenStartProject}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-xl shrink-0 shadow-md"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('hero.ctaPrimary')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

