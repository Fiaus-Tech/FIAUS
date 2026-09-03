import React from 'react';
import ProjectsShowcase from '../components/home/ProjectsShowcase';
import CTASection from '../components/home/CTASection';

export default function ProjectsPage({ onOpenStartProject }) {
  return (
    <div className="pt-24 min-h-screen bg-white dark:bg-navy-900 transition-colors">
      <ProjectsShowcase />
      <CTASection onOpenStartProject={onOpenStartProject} />
    </div>
  );
}

