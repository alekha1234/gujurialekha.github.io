import React from 'react';
import { getLatestPosts } from '@/lib/blogFeed';
import Navigation from '@/components/Navigation';
import LabBackground from '@/components/lab/LabBackground';
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

// Section order matches STATIONS in components/lab/layout.ts: scrolling a section into view
// flies the camera to its station.
export default async function Home() {
  const posts = await getLatestPosts();
  return (
    <>
      <LabBackground />
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
