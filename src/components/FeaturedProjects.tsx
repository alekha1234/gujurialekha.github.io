'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { featuredProjects, moreProjectsData, ProjectItem } from '@/data/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  RotateCw,
  FolderGit2,
  Search,
  ArrowUpRight,
  BarChart2,
  Sparkles,
} from 'lucide-react';

export default function FeaturedProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const total = featuredProjects.length;

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-rotation timer (every 4.5 seconds)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Combine all 19 projects (6 featured + 13 archived)
  const allProjects = useMemo(() => {
    const featuredMapped = featuredProjects.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      description: p.summary,
      technologies: p.technologies,
      githubUrl: p.githubUrl,
      isFeatured: true,
      originalProject: p,
    }));

    const moreMapped = moreProjectsData.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      description: p.description,
      technologies: p.technologies,
      githubUrl: p.githubUrl,
      isFeatured: false,
      originalProject: undefined,
    }));

    return [...featuredMapped, ...moreMapped];
  }, []);

  const categories = useMemo(() => {
    return ['ALL', 'Smart City & IoT', 'Computer Vision', 'MLOps', 'Healthcare Analytics', 'Predictive Modeling', 'NLP & Text Analytics', 'Business Analytics'];
  }, []);

  const filteredAllProjects = useMemo(() => {
    return allProjects.filter((project) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.category.toLowerCase().includes(q) ||
        project.technologies.some((t) => t.toLowerCase().includes(q));

      const matchesCat =
        selectedCategory === 'ALL' ||
        project.category.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCat;
    });
  }, [allProjects, searchQuery, selectedCategory]);

  // Derive the 5 visible projects in the rotating ring
  const farPrevIndex = (currentIndex - 2 + total) % total;
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;
  const farNextIndex = (currentIndex + 2) % total;

  const farPrevProject = featuredProjects[farPrevIndex];
  const prevProject = featuredProjects[prevIndex];
  const currentProject = featuredProjects[currentIndex];
  const nextProject = featuredProjects[nextIndex];
  const farNextProject = featuredProjects[farNextIndex];

  const toggleAllProjects = () => {
    const nextState = !showAllProjects;
    setShowAllProjects(nextState);
    if (nextState) {
      setTimeout(() => {
        document.getElementById('all-projects-catalog')?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    }
  };

  return (
    <section id="case-studies" aria-labelledby="case-studies-heading" className="py-8 sm:py-10 border-t border-lab-border bg-lab-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header — compact */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-[10px] text-lab-accent tracking-widest">[03 // APPLIED ML ROTATING SHOWCASE]</span>
              <div className="h-[1px] bg-lab-border flex-1 max-w-xs" aria-hidden="true" />
            </div>
            <h2 id="case-studies-heading" className="font-display font-bold text-xl sm:text-2xl text-lab-text-primary tracking-tight">
              Featured Project Case Studies
            </h2>
            <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
              <p className="text-[11px] text-lab-text-muted font-mono">
                5-model rotating deck. Click any card to focus.
              </p>
              <button
                type="button"
                onClick={toggleAllProjects}
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded font-mono text-[10px] font-semibold border border-lab-accent/60 bg-lab-accent/10 text-lab-accent hover:bg-lab-accent hover:text-lab-bg transition-all shadow-sm focus-ring"
                aria-expanded={showAllProjects}
                aria-controls="all-projects-catalog"
              >
                <FolderGit2 className="w-3 h-3" aria-hidden="true" />
                <span>{showAllProjects ? 'Hide All Projects' : 'More Projects (List All 19)'}</span>
                {showAllProjects ? <ChevronUp className="w-3 h-3" aria-hidden="true" /> : <ChevronDown className="w-3 h-3" aria-hidden="true" />}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2 self-start md:self-auto">
            {/* Auto status badge */}
            <div className="font-mono text-[10px] text-lab-text-muted flex items-center space-x-1.5 bg-lab-surface px-2 py-1 rounded border border-lab-border">
              <RotateCw className={`w-3 h-3 text-lab-accent ${!isPaused ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} aria-hidden="true" />
              <span className="text-[10px] text-lab-text-secondary">
                {isPaused ? 'PAUSED' : 'AUTO'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="p-1.5 rounded border border-lab-border bg-lab-surface text-lab-text-secondary hover:text-lab-accent hover:border-lab-accent transition-colors focus-ring"
              title={isPaused ? 'Resume' : 'Pause'}
              aria-label={isPaused ? 'Resume Auto-Rotation' : 'Pause Auto-Rotation'}
            >
              {isPaused ? <Play className="w-3 h-3 text-lab-accent" aria-hidden="true" /> : <Pause className="w-3 h-3" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* 5-in-a-Row Carousel */}
        <div
          className="relative py-1"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="flex items-center justify-center gap-2 sm:gap-2.5 xl:gap-3.5 w-full">
            {/* 1. Far Left: Outer Peek (Desktop lg+) */}
            <div className="hidden lg:block w-[130px] xl:w-[155px] shrink-0 transition-all duration-500">
              <div className="relative group">
                <div className="absolute -top-2 left-2 font-mono text-[8px] text-lab-text-muted bg-lab-bg px-1.5 py-0.5 rounded border border-lab-border z-30">
                  [{(farPrevIndex + 1).toString().padStart(2, '0')}]
                </div>
                <ProjectCard
                  project={farPrevProject}
                  variant="outer"
                  onOpenCaseStudy={(proj) => setActiveModalProject(proj)}
                  onClick={() => setCurrentIndex(farPrevIndex)}
                />
              </div>
            </div>

            {/* 2. Left: Adjacent (Tablet md+) */}
            <div className="hidden md:block w-[185px] lg:w-[195px] xl:w-[220px] shrink-0 transition-all duration-500">
              <div className="relative group">
                <div className="absolute -top-2 left-2 font-mono text-[9px] text-lab-text-muted bg-lab-bg px-1.5 py-0.5 rounded border border-lab-border z-30">
                  PREV [{(prevIndex + 1).toString().padStart(2, '0')}]
                </div>
                <ProjectCard
                  project={prevProject}
                  variant="adjacent"
                  onOpenCaseStudy={(proj) => setActiveModalProject(proj)}
                  onClick={handlePrev}
                />
              </div>
            </div>

            {/* 3. Center: Focused Active (All screens, primary) */}
            <div className="w-full max-w-[310px] sm:max-w-[335px] xl:max-w-[355px] shrink-0 transition-all duration-500 z-20">
              <div className="relative">
                <div className="absolute -top-3 left-3 font-mono text-[9.5px] font-bold text-lab-accent bg-lab-bg px-2 py-0.5 rounded-full border border-lab-accent/50 z-30 shadow-lab-glow flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-lab-accent animate-ping" aria-hidden="true" />
                  <span>ACTIVE [{(currentIndex + 1).toString().padStart(2, '0')} / {total.toString().padStart(2, '0')}]</span>
                </div>
                <ProjectCard
                  project={currentProject}
                  variant="focused"
                  onOpenCaseStudy={(proj) => setActiveModalProject(proj)}
                />
              </div>
            </div>

            {/* 4. Right: Adjacent (Tablet md+) */}
            <div className="hidden md:block w-[185px] lg:w-[195px] xl:w-[220px] shrink-0 transition-all duration-500">
              <div className="relative group">
                <div className="absolute -top-2 right-2 font-mono text-[9px] text-lab-text-muted bg-lab-bg px-1.5 py-0.5 rounded border border-lab-border z-30">
                  NEXT [{(nextIndex + 1).toString().padStart(2, '0')}]
                </div>
                <ProjectCard
                  project={nextProject}
                  variant="adjacent"
                  onOpenCaseStudy={(proj) => setActiveModalProject(proj)}
                  onClick={handleNext}
                />
              </div>
            </div>

            {/* 5. Far Right: Outer Peek (Desktop lg+) */}
            <div className="hidden lg:block w-[130px] xl:w-[155px] shrink-0 transition-all duration-500">
              <div className="relative group">
                <div className="absolute -top-2 right-2 font-mono text-[8px] text-lab-text-muted bg-lab-bg px-1.5 py-0.5 rounded border border-lab-border z-30">
                  [{(farNextIndex + 1).toString().padStart(2, '0')}]
                </div>
                <ProjectCard
                  project={farNextProject}
                  variant="outer"
                  onOpenCaseStudy={(proj) => setActiveModalProject(proj)}
                  onClick={() => setCurrentIndex(farNextIndex)}
                />
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-lab-border/60">
            {/* Ticker */}
            <div className="font-mono text-[10px] text-lab-text-muted flex items-center space-x-1.5">
              <span className="text-lab-accent font-bold">[{currentProject.category}]</span>
              <span className="hidden sm:inline text-lab-border" aria-hidden="true">•</span>
              <span className="text-lab-text-secondary truncate max-w-[200px]">{currentProject.title}</span>
            </div>

            {/* Indicator Dots */}
            <div className="flex items-center space-x-1.5" role="tablist" aria-label="Project slide selector">
              {featuredProjects.map((proj, idx) => (
                <button
                  key={idx}
                  type="button"
                  role="tab"
                  aria-selected={idx === currentIndex}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 focus-ring ${
                    idx === currentIndex
                      ? 'w-6 bg-lab-accent shadow-lab-glow'
                      : 'w-1.5 bg-lab-border hover:bg-lab-text-muted'
                  }`}
                  aria-label={`Jump to project ${idx + 1}: ${proj.title}`}
                />
              ))}
            </div>

            {/* Arrows + More Projects */}
            <div className="flex items-center space-x-1.5">
              <button
                type="button"
                onClick={handlePrev}
                className="p-2 rounded border border-lab-border bg-lab-surface text-lab-text-secondary hover:text-lab-accent hover:border-lab-accent transition-colors focus-ring"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-3.5 h-3.5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="p-2 rounded border border-lab-border bg-lab-surface text-lab-text-secondary hover:text-lab-accent hover:border-lab-accent transition-colors focus-ring"
                aria-label="Next project"
              >
                <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={toggleAllProjects}
                className="inline-flex items-center space-x-1 px-3 py-1.5 rounded font-mono text-[10px] font-semibold border border-lab-accent/60 bg-lab-accent/10 text-lab-accent hover:bg-lab-accent hover:text-lab-bg transition-all focus-ring"
                aria-expanded={showAllProjects}
                aria-controls="all-projects-catalog"
              >
                <span>{showAllProjects ? 'Hide All Projects' : 'More Projects (19)'}</span>
                {showAllProjects ? <ChevronUp className="w-3 h-3" aria-hidden="true" /> : <ChevronDown className="w-3 h-3" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>

        {/* Expandable All Projects Catalog (All 19 Projects) */}
        {showAllProjects && (
          <div
            id="all-projects-catalog"
            className="mt-8 pt-6 border-t border-lab-border animate-fadeIn"
          >
            {/* Catalog Subheader */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 gap-3">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-[9px] text-lab-cyan tracking-widest">[CATALOG // 19 VERIFIED REPOSITORIES & CASE STUDIES]</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-lab-cyan animate-pulse" aria-hidden="true" />
                </div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-lab-text-primary tracking-tight">
                  Complete Project & Repository Archive
                </h3>
                <p className="text-[11px] text-lab-text-muted font-mono">
                  Browse all machine learning pipelines, deep learning vision models, and analytical repositories.
                </p>
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-lab-text-muted" aria-hidden="true" />
                <label htmlFor="catalog-search" className="sr-only">Filter projects by keyword or stack</label>
                <input
                  id="catalog-search"
                  type="search"
                  placeholder="Filter by keyword or stack..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded bg-lab-surface border border-lab-border text-xs font-mono text-lab-text-primary placeholder:text-lab-text-muted focus-ring transition-colors"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 mb-5" role="toolbar" aria-label="Category filters">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  aria-pressed={selectedCategory === cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`font-mono text-[9px] px-2.5 py-1 rounded transition-colors focus-ring ${
                    selectedCategory === cat
                      ? 'bg-lab-accent text-lab-bg font-semibold shadow-lab-glow'
                      : 'bg-lab-surface text-lab-text-muted border border-lab-border hover:text-lab-text-primary hover:border-lab-border-subtle'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Compact Grid of Projects */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filteredAllProjects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-lg border border-lab-border bg-lab-surface/70 p-3.5 flex flex-col justify-between hover:border-lab-accent/50 hover:bg-lab-surface transition-all duration-200 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[8.5px] text-lab-cyan px-1.5 py-0.5 rounded bg-lab-bg border border-lab-border uppercase">
                        {project.category}
                      </span>
                      {project.isFeatured ? (
                        <span className="font-mono text-[8px] font-bold text-lab-accent bg-lab-accent/10 px-1.5 py-0.5 rounded border border-lab-accent/30 flex items-center space-x-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>CASE STUDY</span>
                        </span>
                      ) : (
                        <span className="font-mono text-[8px] text-lab-text-muted bg-lab-elevated px-1.5 py-0.5 rounded border border-lab-border">
                          REPO
                        </span>
                      )}
                    </div>

                    <h4 className="font-display font-bold text-xs text-lab-text-primary group-hover:text-lab-accent transition-colors line-clamp-1">
                      {project.title}
                    </h4>

                    <p className="text-[10.5px] text-lab-text-secondary leading-relaxed font-sans line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-2 mt-2 border-t border-lab-border/40 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="font-mono text-[8.5px] px-1 py-0.5 rounded bg-lab-elevated text-lab-text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2">
                      {project.isFeatured && project.originalProject ? (
                        <button
                          type="button"
                          onClick={() => setActiveModalProject(project.originalProject)}
                          className="inline-flex items-center space-x-1 font-mono text-[9.5px] text-lab-accent hover:text-emerald-300 font-semibold"
                        >
                          <BarChart2 className="w-3 h-3" />
                          <span>Case Study</span>
                        </button>
                      ) : null}

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-0.5 font-mono text-[9.5px] text-lab-text-secondary hover:text-lab-accent transition-colors"
                        title="GitHub"
                        aria-label="GitHub Repository"
                      >
                        <span>Code</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Collapse Button */}
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => {
                  setShowAllProjects(false);
                  document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded font-mono text-[10px] font-semibold border border-lab-border bg-lab-surface text-lab-text-secondary hover:text-lab-accent hover:border-lab-accent transition-all"
              >
                <span>Collapse Project Archive</span>
                <ChevronUp className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* Modal */}
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      </div>
    </section>
  );
}
