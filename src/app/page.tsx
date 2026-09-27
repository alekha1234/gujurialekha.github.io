import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import FeaturedProjects from '@/components/FeaturedProjects';
import MoreProjects from '@/components/MoreProjects';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Writing from '@/components/Writing';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-lab-bg text-lab-text-primary selection:bg-lab-accent selection:text-lab-bg">
      {/* Precision Top Navigation */}
      <Navigation />

      {/* Hero Section */}
      <Hero />

      {/* About & What I Do */}
      <About />

      {/* Experience & Production Impact */}
      <Experience />

      {/* Featured Projects with 7-Step Case Study Schema */}
      <FeaturedProjects />

      {/* More Projects Archive */}
      <MoreProjects />

      {/* Technical Skills & Tooling Matrix */}
      <Skills />

      {/* Education & Certifications */}
      <Education />

      {/* Technical Writing & Tutorials */}
      <Writing />

      {/* Contact & Transmission Channel */}
      <Contact />

      {/* Telemetry Footer */}
      <Footer />
    </main>
  );
}
