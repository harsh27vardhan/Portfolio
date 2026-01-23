import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

const App = () => {
  useEffect(() => {
    // --- Lenis Smooth Scrolling ---
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // --- Scroll Reveal Animation ---
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, observerOptions);

    // Observe elements
    // setTimeout to ensure elements are mounted and rendered
    setTimeout(() => {
      const fadeElements = document.querySelectorAll('.fade-in-up');
      fadeElements.forEach(el => observer.observe(el));
    }, 100);

    // --- Anchor Link Smooth Scrolling (Delegation) ---
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          // Use Lenis for scrolling if we can, otherwise fallback
          // Here we use Lenis since we initialized it
          lenis.scrollTo(targetElement, { offset: -70 });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.destroy();
      observer.disconnect();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div>
      <Navbar />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;
