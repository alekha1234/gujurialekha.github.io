'use client';

import React, { useState } from 'react';
import { featuredProjects, ProjectItem } from '@/data/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { Sparkles, Terminal } from 'lucide-react';

export default function FeaturedProjects() {
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  return (
    <section id="case-studies" className="py-24 border-t border-lab-border bg-lab-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs text-lab-accent tracking-widest">[03 // CURATED MACHINE LEARNING]</span>
              <div className="h-[1px] bg-lab-border flex-1 max-w-xs" />
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-lab-text-primary tracking-tight">
              Featured Project Case Studies
            </h2>
            <p className="text-sm text-lab-text-muted font-mono max-w-2xl">
              Curated implementations presented through the 7-step engineering framework:
              Problem → Data → Approach → Model → Evaluation → Results → Impact.
            </p>
          </div>

          <div className="font-mono text-xs text-lab-text-muted flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-lab-accent animate-pulse" />
            <span>6 PRODUCTION CASE STUDIES</span>
          </div>
        </div>

        {/* 6 Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenCaseStudy={(proj) => setActiveModalProject(proj)}
            />
          ))}
        </div>

        {/* Modal Inspector for Deep Dives */}
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      </div>
    </section>
  );
}
