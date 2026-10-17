'use client';

import React, { useEffect, useState } from 'react';
import { FEED_URL, parseFeed, type BlogPost } from '@/lib/blogFeed';
import { ArrowUpRight, Calendar, Tag } from 'lucide-react';
import { LabTag } from '@/components/ui';

// Posts baked in at build time (for crawlers), then refreshed from the live feed so new posts show up without a redeploy.
export default function Writing({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [posts, setPosts] = useState(initialPosts);

  useEffect(() => {
    fetch(FEED_URL, { cache: 'no-store' })
      .then((r) => (r.ok ? r.text() : ''))
      .then((xml) => {
        const latest = parseFeed(xml);
        if (latest.length) setPosts(latest);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="writing" aria-labelledby="writing-heading" className="relative z-10 py-16 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="space-y-2">
            <LabTag>09 // Writing</LabTag>
            <h2 id="writing-heading" className="font-display font-bold text-2xl sm:text-3xl text-lab-text-primary tracking-tight">
              Technical Writing & Tutorials
            </h2>
            <p className="text-xs sm:text-sm text-lab-text-muted font-mono max-w-2xl">
              Hands-on Python notebooks on time series, statistics, and machine learning.
            </p>
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="rail grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl p-6 flex flex-col justify-between hover:glass-glow transition-all duration-300 group focus-ring"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-lab-cyan flex items-center space-x-1.5">
                    <Tag className="w-3 h-3" aria-hidden="true" />
                    <span>{post.category}</span>
                  </span>
                  {post.date && (
                    <span className="text-lab-text-muted flex items-center space-x-1">
                      <Calendar className="w-3 h-3" aria-hidden="true" />
                      <span>{post.date}</span>
                    </span>
                  )}
                </div>

                <h3 className="font-display font-bold text-base sm:text-lg text-lab-text-primary group-hover:text-lab-accent transition-colors leading-snug">
                  {post.title}
                </h3>

                {post.excerpt && (
                  <p className="text-xs text-lab-text-secondary leading-relaxed font-sans line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
              </div>

              <div className="pt-6 mt-4 border-t border-lab-border/40 flex items-center justify-between font-mono text-xs text-lab-accent">
                <span>
                  Read Full Article<span className="sr-only"> (opens in new tab)</span>
                </span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="https://alekha1234.github.io/blog/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-md glass font-mono text-xs font-semibold tracking-wider text-lab-text-primary hover:glass-glow transition-shadow focus-ring"
          >
            Visit the blog<span className="sr-only"> (opens in new tab)</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
