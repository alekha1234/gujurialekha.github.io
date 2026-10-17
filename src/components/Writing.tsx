'use client';

import React, { useEffect, useState } from 'react';
import { FEED_URL, parseFeed, type BlogPost } from '@/lib/blogFeed';
import { ArrowUpRight, Calendar, Tag } from 'lucide-react';

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
    <section id="writing" aria-labelledby="writing-heading" className="relative z-10 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="font-mono text-xs text-lab-accent tracking-widest">[06 // TECHNICAL DISCOURSE]</span>
              <div className="h-[1px] bg-lab-border flex-1 max-w-xs" aria-hidden="true" />
            </div>
            <h2 id="writing-heading" className="font-display font-bold text-2xl sm:text-3xl text-lab-text-primary tracking-tight">
              Technical Writing & Tutorials
            </h2>
            <p className="text-xs sm:text-sm text-lab-text-muted font-mono max-w-2xl">
              Hands-on Python notebooks on time series, statistics, and machine learning.
            </p>
          </div>

          <a
            href="https://alekha1234.github.io/blog/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 font-mono text-xs text-lab-accent hover:text-blue-300 font-semibold self-start md:self-auto focus-ring rounded p-1"
            aria-label="Visit Complete Blog Platform (opens in new tab)"
          >
            <span>Visit Complete Blog Platform</span>
            <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

        {/* Blog Cards Grid */}
        <div className={`grid grid-cols-1 gap-6 ${posts.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          {posts.map((post) => (
            <a
              key={post.url}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-xl p-6 flex flex-col justify-between hover:glass-glow transition-all duration-300 group focus-ring"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between font-mono text-[11px]">
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
      </div>
    </section>
  );
}
