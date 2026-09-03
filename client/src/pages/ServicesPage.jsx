import React from 'react';
import ServicesSection from '../components/home/ServicesSection';
import CTASection from '../components/home/CTASection';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles } from 'lucide-react';

export default function ServicesPage({ onOpenStartProject }) {
  const { language } = useLanguage();

  return (
    <div className="pt-24 min-h-screen bg-white dark:bg-navy-900 transition-colors">
      <ServicesSection onOpenStartProject={onOpenStartProject} />
      <CTASection onOpenStartProject={onOpenStartProject} />
    </div>
  );
}
