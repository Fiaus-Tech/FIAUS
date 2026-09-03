import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ProjectsShowcase from '../components/home/ProjectsShowcase';
import ServicesSection from '../components/home/ServicesSection';
import AISection from '../components/home/AISection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import ProcessSection from '../components/home/ProcessSection';
import FAQSection from '../components/home/FAQSection';
import CTASection from '../components/home/CTASection';

export default function HomePage({ onOpenStartProject }) {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection onOpenStartProject={onOpenStartProject} />
      <ProjectsShowcase />
      <ServicesSection onOpenStartProject={onOpenStartProject} />
      <AISection onOpenStartProject={onOpenStartProject} />
      <WhyChooseUs />
      <ProcessSection />
      <FAQSection />
      <CTASection onOpenStartProject={onOpenStartProject} />
    </div>
  );
}

