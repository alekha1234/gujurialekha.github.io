import React from 'react';
import { getLatestPosts } from '@/lib/blogFeed';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import AILab from '@/components/AILab';
import FeaturedProjects from '@/components/FeaturedProjects';
import MoreProjects from '@/components/MoreProjects';
import Timeline from '@/components/Timeline';
import Writing from '@/components/Writing';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default async function Home() {
  const posts = await getLatestPosts();
  return (
    <>
      <div aria-hidden="true" className="fixed inset-0 z-0 lab-backdrop pointer-events-none" />
      <main id="main-content" className="relative min-h-screen text-lab-text-primary selection:bg-lab-accent selection:text-white">
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <AILab />
        <FeaturedProjects />
        <MoreProjects />
        <Timeline />
        <Writing initialPosts={posts} />
        <Contact />
        <Footer />
      </main>
    </>
  );
}
