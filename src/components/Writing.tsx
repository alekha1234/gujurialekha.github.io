'use client';

import React from 'react';
import { blogsData } from '@/data/blogs';
import { BookOpen, ArrowUpRight, Clock, Tag } from 'lucide-react';

export default function Writing() {
  return (
    <section id="writing" className="py-24 border-t border-lab-border bg-lab-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs text-lab-accent tracking-widest">[06 // TECHNICAL DISCOURSE]</span>
              <div className="h-[1px] bg-lab-border flex-1 max-w-xs" />
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-lab-text-primary tracking-tight">
              Technical Writing & Tutorials
            </h2>
            <p className="text-sm text-lab-text-muted font-mono max-w-2xl">
              Articles and engineering walkthroughs exploring machine learning lifecycles, data pipelines, and applied computer vision.
            </p>
          </div>

          <a
            href="https://alekhagujuri.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 font-mono text-xs text-lab-accent hover:text-emerald-300 font-semibold self-start md:self-auto"
          >
            <span>Visit Complete Blog Platform</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogsData.map((post, idx) => (
            <a
              key={idx}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-lab-border bg-lab-surface/70 p-6 flex flex-col justify-between hover:border-lab-accent/60 hover:bg-lab-surface transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-[11px]">
                  <span className="text-lab-cyan flex items-center space-x-1.5">
                    <Tag className="w-3 h-3" />
                    <span>{post.category}</span>
                  </span>
                  <span className="text-lab-text-muted flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-lab-text-primary group-hover:text-lab-accent transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-lab-text-secondary leading-relaxed font-sans">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-lab-border/40 flex items-center justify-between font-mono text-xs text-lab-accent">
                <span>Read Full Article</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
