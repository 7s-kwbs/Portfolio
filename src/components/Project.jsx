import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// ─── GlowCard Component (Inline) ─────────────────────────────────────────────

const glowColorMap = {
  cyan:   { base: 190, spread: 200 },
  blue:   { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green:  { base: 120, spread: 200 },
  red:    { base: 0,   spread: 200 },
  orange: { base: 30,  spread: 200 },
};

const beforeAfterStyles = `
  [data-glow]::before,
  [data-glow]::after {
    pointer-events: none;
    content: "";
    position: absolute;
    inset: calc(var(--border-size) * -1);
    border: var(--border-size) solid transparent;
    border-radius: calc(var(--radius) * 1px);
    background-attachment: fixed;
    background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
    background-repeat: no-repeat;
    background-position: 50% 50%;
    mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
    mask-clip: padding-box, border-box;
    mask-composite: intersect;
  }
  [data-glow]::before {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
      calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)), transparent 100%
    );
    filter: brightness(2);
  }
  [data-glow]::after {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
      calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
      hsl(0 100% 100% / var(--border-light-opacity, 1)), transparent 100%
    );
  }
  [data-glow] [data-glow] {
    position: absolute;
    inset: 0;
    will-change: filter;
    opacity: var(--outer, 1);
    border-radius: calc(var(--radius) * 1px);
    border-width: calc(var(--border-size) * 20);
    filter: blur(calc(var(--border-size) * 10));
    background: none;
    pointer-events: none;
    border: none;
  }
  [data-glow] > [data-glow]::before {
    inset: -10px;
    border-width: 10px;
  }
`;

const GlowCard = ({ children, className = '', glowColor = 'cyan' }) => {
  const cardRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const syncPointer = (e) => {
      const { clientX: x, clientY: y } = e;
      if (cardRef.current) {
        cardRef.current.style.setProperty('--x', x.toFixed(2));
        cardRef.current.style.setProperty('--xp', (x / window.innerWidth).toFixed(2));
        cardRef.current.style.setProperty('--y', y.toFixed(2));
        cardRef.current.style.setProperty('--yp', (y / window.innerHeight).toFixed(2));
      }
    };
    document.addEventListener('pointermove', syncPointer);
    return () => document.removeEventListener('pointermove', syncPointer);
  }, []);

  const { base, spread } = glowColorMap[glowColor] || glowColorMap.cyan;

  const inlineStyles = {
    '--base': base,
    '--spread': spread,
    '--radius': '16',
    '--border': '2',
    '--backdrop': 'hsl(0 0% 8% / 0.85)',
    '--backup-border': 'hsl(0 0% 20% / 0.5)',
    '--size': '250',
    '--outer': '1',
    '--border-size': 'calc(var(--border, 2) * 1px)',
    '--spotlight-size': 'calc(var(--size, 150) * 1px)',
    '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
    backgroundImage: `radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.08)), transparent
    )`,
    backgroundColor: 'var(--backdrop, transparent)',
    backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
    backgroundPosition: '50% 50%',
    backgroundAttachment: 'fixed',
    border: 'var(--border-size) solid var(--backup-border)',
    position: 'relative',
    touchAction: 'none',
  };

  return (
    <div
      ref={cardRef}
      data-glow
      style={inlineStyles}
      className={`rounded-2xl relative shadow-[0_1rem_2rem_-1rem_black] backdrop-blur-sm overflow-hidden flex flex-col h-full ${className}`}
    >
      <div ref={innerRef} data-glow />
      {children}
    </div>
  );
};

// ─── Projects Component ───────────────────────────────────────────────────────

function Projects() {
  const projects = [
    {
      title: "AssetTrack",
      desc: "Enterprise-level tangible fixed asset tracking system with real-time updates and role-based access control.",
      tech: ["React", "Tailwind CSS", ".NET Core", "SQL Server"],
      live: "https://asset-track-hg7ueyg0z-chapagainnarendra99-3061s-projects.vercel.app/",
      github: "https://github.com/7s-kwbs/Asset-Track",
      image: "/p1.png",
      glowColor: "cyan",
    },
     {
      title: "Qatar Holidays",
      desc: "Qatar Holidays DMC is a travel website that showcases curated tour packages and luxury experiences in Qatar, featuring an intuitive UI for browsing, filtering, and exploring tours with a responsive and user-friendly design.",
      tech: ["laravel", "Alpine Js", "AOS", "Tailwind CSS"],
      live: "https://qatarholidaysdmc.com/",
      github: "",
      image: "/Qatar.png",
      glowColor: "blue",
    },
    {
      title: "Bike Rental",
      desc: "Full-featured bike rental platform with booking system, real-time availability and admin dashboard.",
      tech: ["React", "Framer Motion", "Tailwind CSS", "Supabase"],
      live: "https://kwbsbike-rental.vercel.app/",
      github: "https://github.com/7s-kwbs/Bike-Rental",
      image: "/bike.png",
      glowColor: "purple",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.14, delayChildren: 0.4 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.92 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />

      <section id="projects" className="py-16 sm:py-20 bg-gray-950 relative overflow-hidden">

        {/* Background orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-20 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-600/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.28, 0.12] }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
            className="absolute bottom-10 right-10 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-purple-600/10 rounded-full blur-3xl"
          />
        </div>

        {/* ── Same container as NavBar ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              My{' '}
              <span className="bg-linear-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <div className="w-20 sm:w-24 h-1 bg-linear-to-r from-cyan-400 to-purple-600 mx-auto rounded-full mb-4 sm:mb-5" />
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto px-4">
              A selection of my recent work — built with modern tools, clean code, smooth animations and responsive design.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 xl:gap-8"
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.02, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
                whileTap={{ scale: 0.97 }}
                className="group h-full"
              >
                <GlowCard glowColor={project.glowColor} className="h-full">

                  {/* Image */}
                  <div className="relative h-44 sm:h-48 lg:h-52 xl:h-56 overflow-hidden rounded-xl mx-3 mt-3 shrink-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Top shine on hover */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-cyan-400/80 via-blue-500/60 to-purple-600/80 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700" />
                    {/* Bottom fade */}
                    <div className="absolute inset-0 bg-linear-to-t from-gray-950/60 via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-5 lg:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 flex-grow">
                      {project.desc}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-5">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-medium bg-cyan-950/40 text-cyan-300 rounded-lg border border-cyan-800/50 hover:bg-cyan-900/50 hover:border-cyan-400/60 transition-all"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-4 sm:gap-5 mt-auto">
                      {project.live && (
                        <motion.a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.08, x: 4 }}
                          whileTap={{ scale: 0.94 }}
                          className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-medium text-xs sm:text-sm transition-colors"
                        >
                          <span className="text-sm sm:text-base">↗</span> Live Demo
                        </motion.a>
                      )}

                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.15, rotate: 8 }}
                        whileTap={{ scale: 0.92 }}
                        className="text-gray-400 hover:text-white transition-colors ml-auto"
                      >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.8 24 17.303 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                      </motion.a>
                    </div>
                  </div>

                </GlowCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-14 sm:mt-16 lg:mt-20 text-center"
          >
            <motion.a
              href="https://github.com/7s-kwbs"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.07, y: -5, boxShadow: '0 25px 50px -12px rgba(6, 182, 212, 0.4)' }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold text-sm sm:text-base rounded-xl shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.776.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.8 24 17.303 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              View More Projects on GitHub
            </motion.a>
          </motion.div>

        </div>
      </section>
    </>
  );
}

export default Projects;