'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { featuredProjects, ProjectItem } from '@/data/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  RotateCw,
  Sparkles,
} from 'lucide-react';

export default function FeaturedProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

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

  // Derive the 3 visible projects for desktop layout
  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  const prevProject = featuredProjects[prevIndex];
  const currentProject = featuredProjects[currentIndex];
  const nextProject = featuredProjects[nextIndex];

  return (
    <section id="case-studies" className="py-24 border-t border-lab-border bg-lab-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs text-lab-accent tracking-widest">[03 // APPLIED ML ROTATING SHOWCASE]</span>
              <div className="h-[1px] bg-lab-border flex-1 max-w-xs" />
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-lab-text-primary tracking-tight">
              Featured Project Case Studies
            </h2>
            <p className="text-sm text-lab-text-muted font-mono max-w-2xl">
              Curated 3-stage smart city pipelines, MLOps platforms, and vision models. The middle project is active—hovering pauses auto-rotation.
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start md:self-auto">
            {/* Auto status badge */}
            <div className="font-mono text-xs text-lab-text-muted flex items-center space-x-2 bg-lab-surface px-3 py-1.5 rounded-lg border border-lab-border">
              <RotateCw className={`w-3.5 h-3.5 text-lab-accent ${!isPaused ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
              <span className="text-[11px] text-lab-text-secondary">
                {isPaused ? 'ROTATION: PAUSED' : 'ROTATION: ACTIVE'}
              </span>
            </div>

            {/* Quick Play/Pause button */}
            <button
              type="button"
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 rounded-lg border border-lab-border bg-lab-surface text-lab-text-secondary hover:text-lab-accent hover:border-lab-accent transition-colors"
              title={isPaused ? 'Resume Auto-Rotation' : 'Pause Auto-Rotation'}
              aria-label={isPaused ? 'Resume Auto-Rotation' : 'Pause Auto-Rotation'}
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-lab-accent" /> : <Pause className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* 3-in-a-Row Auto-Slider Container */}
        <div
          className="relative py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Card: Previous Project (Desktop) */}
            <div className="hidden lg:block lg:col-span-3 transition-all duration-500">
              <div className="relative group">
                <div className="absolute -top-3 left-2 font-mono text-[10px] text-lab-text-muted bg-lab-bg px-2 py-0.5 rounded border border-lab-border z-30">
                  PREVIOUS [{(prevIndex + 1).toString().padStart(2, '0')}]
                </div>
                <ProjectCard
                  project={prevProject}
                  isFocused={false}
                  onOpenCaseStudy={(proj) => setActiveModalProject(proj)}
                  onClick={handlePrev}
                />
              </div>
            </div>

            {/* Middle Card: Focused Active Project (Elevated) */}
            <div className="lg:col-span-6 col-span-1 transition-all duration-500 z-20">
              <div className="relative">
                <div className="absolute -top-3.5 left-4 font-mono text-[11px] font-bold text-lab-accent bg-lab-bg px-3 py-0.5 rounded-full border border-lab-accent/50 z-30 shadow-lab-glow flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-lab-accent animate-ping" />
                  <span>FOCUSED CASE STUDY [{(currentIndex + 1).toString().padStart(2, '0')} / {total.toString().padStart(2, '0')}]</span>
                </div>
                <ProjectCard
                  project={currentProject}
                  isFocused={true}
                  onOpenCaseStudy={(proj) => setActiveModalProject(proj)}
                />
              </div>
            </div>

            {/* Right Card: Next Project (Desktop) */}
            <div className="hidden lg:block lg:col-span-3 transition-all duration-500">
              <div className="relative group">
                <div className="absolute -top-3 right-2 font-mono text-[10px] text-lab-text-muted bg-lab-bg px-2 py-0.5 rounded border border-lab-border z-30">
                  NEXT [{(nextIndex + 1).toString().padStart(2, '0')}]
                </div>
                <ProjectCard
                  project={nextProject}
                  isFocused={false}
                  onOpenCaseStudy={(proj) => setActiveModalProject(proj)}
                  onClick={handleNext}
                />
              </div>
            </div>
          </div>

          {/* Navigation Controls & Direct Pagination Dots */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-lab-border/60">
            {/* Project Title Telemetry Ticker */}
            <div className="font-mono text-xs text-lab-text-muted flex items-center space-x-2">
              <span className="text-lab-accent font-bold">[{currentProject.category}]</span>
              <span className="hidden sm:inline text-lab-border">•</span>
              <span className="text-lab-text-secondary truncate max-w-xs">{currentProject.title}</span>
            </div>

            {/* Center: Interactive Indicator Dots */}
            <div className="flex items-center space-x-2">
              {featuredProjects.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? 'w-8 bg-lab-accent shadow-lab-glow'
                      : 'w-2 bg-lab-border hover:bg-lab-text-muted'
                  }`}
                  aria-label={`Jump to project ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrow Buttons */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handlePrev}
                className="p-2.5 rounded-lg border border-lab-border bg-lab-surface text-lab-text-secondary hover:text-lab-accent hover:border-lab-accent transition-colors flex items-center space-x-1"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="font-mono text-xs hidden sm:inline">Prev</span>
              </button>

              <button
                type="button"
                onClick={handleNext}
                className="p-2.5 rounded-lg border border-lab-border bg-lab-surface text-lab-text-secondary hover:text-lab-accent hover:border-lab-accent transition-colors flex items-center space-x-1"
                aria-label="Next project"
              >
                <span className="font-mono text-xs hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
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
