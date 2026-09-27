'use client';

import React, { useState } from 'react';
import { moreProjectsData, ArchivedProject } from '@/data/projects';
import { Github, ArrowUpRight, Search, FolderGit2 } from 'lucide-react';

export default function MoreProjects() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'Computer Vision', 'Predictive Modeling', 'Healthcare Analytics', 'Business Analytics'];

  const filteredProjects = moreProjectsData.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'ALL' ||
      project.category.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-20 border-t border-lab-border bg-lab-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs text-lab-cyan tracking-widest">[ARCHIVE // EXPLORATORY & BENCHMARKS]</span>
              <div className="h-[1px] bg-lab-border flex-1 max-w-xs" />
            </div>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded bg-lab-bg border border-lab-border text-xs font-mono text-lab-text-primary placeholder:text-lab-text-muted focus:outline-none focus:border-lab-accent transition-colors"
            />
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-lg border border-lab-border bg-lab-surface/60 p-5 flex flex-col justify-between hover:border-lab-border-subtle hover:bg-lab-surface transition-all duration-200 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-lab-cyan px-2 py-0.5 rounded bg-lab-bg border border-lab-border">
                    {project.category}
                  </span>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lab-text-muted hover:text-lab-accent transition-colors"
                    aria-label={`GitHub link for ${project.title}`}
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
                      className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-lab-elevated text-lab-text-muted"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 font-mono text-[11px] text-lab-accent hover:text-emerald-300 font-semibold transition-colors"
                >
                  <span>Code</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
