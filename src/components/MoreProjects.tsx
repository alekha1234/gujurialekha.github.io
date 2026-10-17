'use client';

import React, { useState } from 'react';
import { moreProjectsData, ArchivedProject } from '@/data/projects';
import { Github, ArrowUpRight, Search, FolderGit2 } from 'lucide-react';
import { LabTag } from '@/components/ui';

export default function MoreProjects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAll, setShowAll] = useState(false);

  const q = searchQuery.toLowerCase();
  const filteredProjects = moreProjectsData.filter(
    (project) =>
      project.title.toLowerCase().includes(q) ||
      project.description.toLowerCase().includes(q) ||
      project.technologies.some((t) => t.toLowerCase().includes(q))
  );

  // An active search always shows every match; otherwise only the first row until expanded.
  const searching = searchQuery.trim() !== '';
  const visibleProjects = searching || showAll ? filteredProjects : filteredProjects.slice(0, 4);

  return (
    <section id="more-projects" className="relative z-10 py-16 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-2">
            <LabTag>07.b // Archive</LabTag>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-lab-text-primary tracking-tight">
              More Projects & Experimental Repositories
            </h3>
            <p className="text-xs sm:text-sm text-lab-text-muted font-mono">
              Additional machine learning models, computer vision Capstones, and statistical notebooks.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-lab-text-muted" />
            <input
              type="text"
              placeholder="Filter by keyword or stack..."
              aria-label="Filter archived projects by keyword or stack"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded glass border border-lab-border text-xs font-mono text-lab-text-primary placeholder:text-lab-text-muted focus:outline-none focus:border-lab-accent transition-colors"
            />
          </div>
        </div>

        {/* Project Grid */}
        <div id="more-projects-grid" className="rail grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {visibleProjects.map((project) => (
            <div
              key={project.id}
              className="glass rounded-xl p-5 flex flex-col justify-between hover:glass-glow transition-all duration-200 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-lab-cyan px-2 py-0.5 rounded bg-lab-bg border border-lab-border">
                    {project.category}
                  </span>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lab-text-muted hover:text-lab-accent transition-colors"
                    aria-label={`GitHub link for ${project.title} (opens in new tab)`}
                  >
                    <FolderGit2 className="w-4 h-4" />
                  </a>
                </div>

                <h4 className="font-display font-bold text-base text-lab-text-primary group-hover:text-lab-accent transition-colors">
                  {project.title}
                </h4>

                <p className="text-xs text-lab-text-secondary leading-relaxed font-sans line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="pt-4 mt-3 border-t border-lab-border/40 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[11px] px-1.5 py-0.5 rounded bg-lab-elevated text-lab-text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 font-mono text-xs text-lab-accent hover:text-blue-300 font-semibold transition-colors"
                >
                  <span>Code<span className="sr-only">: {project.title} (opens in new tab)</span></span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {!searching && filteredProjects.length > 4 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              aria-controls="more-projects-grid"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-md glass font-mono text-xs font-semibold tracking-wider text-lab-text-primary hover:glass-glow transition-shadow focus-ring"
            >
              {showAll ? 'Show fewer' : `View all ${filteredProjects.length} projects`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
