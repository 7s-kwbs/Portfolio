import React, { useEffect, useRef, useState } from 'react'
import NavBar from "./components/NavBar"
import Hero from "./components/Hero"
import About from './components/About'
import Project from './components/Project'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AOS from 'aos';
import "aos/dist/aos.css"

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const pendingNavigation = useRef(null);
  useEffect(()=>{
    AOS.init({
      duration:1000,
      once:true,
      offset:80,
      easing:"ease-in-out"
    })
  },[]);

  const navigateToSection = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    const headerOffset = window.innerWidth >= 768 ? 80 : 64;
    pendingNavigation.current = {
      id,
      direction: target.getBoundingClientRect().top >= headerOffset ? 'down' : 'up',
    };
    setActiveSection(id);
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const sectionIds = ['home', 'about', 'projects', 'contact'];
    const updateActiveSection = () => {
      const headerOffset = window.innerWidth >= 768 ? 80 : 64;
      const pending = pendingNavigation.current;
      if (pending) {
        const target = document.getElementById(pending.id);
        const targetRect = target?.getBoundingClientRect();
        const reachedTarget = pending.direction === 'down'
          ? targetRect && targetRect.top <= headerOffset + 8
          : targetRect && targetRect.bottom >= headerOffset + 8;
        if (!reachedTarget) return;
        pendingNavigation.current = null;
      }

      const active = sectionIds
        .map((id) => document.getElementById(id))
        .filter((section) => section && section.getBoundingClientRect().top <= headerOffset + 24)
        .at(-1);
      if (active) setActiveSection((current) => current === active.id ? current : active.id);
    };

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    updateActiveSection();
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);
  return (
    <>
    <NavBar activeSection={activeSection} onNavigate={navigateToSection} />
    <main className="min-h-screen pt-16 md:pt-20">
      <Hero onNavigate={navigateToSection} />
      <About />
      <Project />
      <Contact />
      <Footer />
    </main>
    </>
  )
}

export default App
