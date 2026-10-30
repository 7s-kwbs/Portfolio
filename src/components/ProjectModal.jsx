import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  CheckCircle2,
  Smartphone,
  ExternalLink,
  Github,
  Info,
  Layers,
  Sparkles,
} from 'lucide-react';

export default function ProjectModal({ project, isOpen, onClose }) {
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const screens = project?.screenshots || (project ? [
    {
      title: project.title,
      src: project.image,
      desc: project.desc,
    },
  ] : []);

  const totalScreens = screens.length;

  const handleNext = useCallback(() => {
    if (totalScreens > 0) {
      setActiveScreenIndex((prev) => (prev + 1) % totalScreens);
    }
  }, [totalScreens]);

  const handlePrev = useCallback(() => {
    if (totalScreens > 0) {
      setActiveScreenIndex((prev) => (prev - 1 + totalScreens) % totalScreens);
    }
  }, [totalScreens]);

  // Lock background scroll (including Lenis smooth scroll) when modal is open
  useEffect(() => {
    if (isOpen) {
      // Pause Lenis smooth scroll if present
      if (typeof window !== 'undefined' && window.__lenis) {
        window.__lenis.stop();
      }

      const originalBodyOverflow = document.body.style.overflow;
      const originalHtmlOverflow = document.documentElement.style.overflow;

      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalBodyOverflow;
        document.documentElement.style.overflow = originalHtmlOverflow;

        // Resume Lenis smooth scroll
        if (typeof window !== 'undefined' && window.__lenis) {
          window.__lenis.start();
        }
      };
    }
  }, [isOpen]);

  // Keyboard navigation (Esc to close, Arrow keys to navigate)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isZoomed) {
          setIsZoomed(false);
        } else {
          onClose();
        }
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isZoomed, handleNext, handlePrev, onClose]);

  if (!isOpen || !project) return null;

  const currentScreen = screens[activeScreenIndex] || screens[0];

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent="true"
        onWheel={(e) => e.stopPropagation()}
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-2 sm:p-5 md:p-6"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: 'easeOut' }}
          onClick={onClose}
          data-lenis-prevent="true"
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.985, y: 5 }}
          transition={{ type: 'spring', stiffness: 190, damping: 27, mass: 0.9 }}
          data-lenis-prevent="true"
          className="relative z-10 flex max-h-[94dvh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/95 shadow-2xl shadow-cyan-950/60 backdrop-blur-xl sm:max-h-[92vh]"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-slate-950/80 px-4 sm:px-6 py-3.5 shrink-0">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
              </span>
              <span className="truncate font-mono text-xs sm:text-sm text-slate-300">
                ~/projects/{project.title.toLowerCase().replaceAll(' ', '-')}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-cyan-500/10 px-2.5 py-0.5 font-mono text-[10px] text-cyan-300 border border-cyan-500/20">
                <Smartphone size={11} /> {project.badge || 'Mobile Project'}
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div
            data-lenis-prevent="true"
            className="min-h-0 space-y-5 overflow-y-auto overscroll-contain p-3 sm:space-y-6 sm:p-6 lg:grid lg:grid-cols-[300px_1fr] lg:space-y-0 lg:gap-8 lg:p-8 xl:grid-cols-[340px_1fr]"
          >
            {/* Left Column: Phone Mockup & Screenshot Gallery */}
            <div className="flex flex-col items-center">
              {/* Phone Device Frame */}
              <div className="relative h-[min(36dvh,22rem)] w-auto max-w-full aspect-[9/19] rounded-[2.2rem] border border-slate-700/60 bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 p-2 shadow-[0_0_35px_rgba(0,0,0,0.8)] sm:h-[min(52vh,34rem)] sm:rounded-[2.8rem] sm:p-2.5">
                {/* Dynamic Island / Notch */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 h-4 w-24 bg-slate-950 rounded-full z-20 flex items-center justify-end px-2 shadow-inner">
                  <div className="h-2 w-2 rounded-full bg-cyan-500/40" />
                </div>

                {/* Inner Phone Screen Display */}
                <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] bg-black group">
                  <motion.img
                    key={currentScreen.src}
                    src={currentScreen.src}
                    alt={currentScreen.title || `${project.title} screenshot`}
                    initial={{ opacity: 0.4, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.32, ease: 'easeOut' }}
                    className="h-full w-full object-cover object-top select-none"
                  />

                  {/* Expand / Zoom Button Overlay */}
                  <button
                    type="button"
                    onClick={() => setIsZoomed(true)}
                    title="Click to expand high-res screenshot"
                    aria-label="Expand screenshot"
                    className="absolute top-8 right-3.5 z-20 rounded-lg bg-slate-950/70 p-2 text-cyan-300 backdrop-blur-md border border-white/10 opacity-80 transition-opacity hover:opacity-100 hover:bg-cyan-500 hover:text-slate-950"
                  >
                    <Maximize2 size={14} />
                  </button>

                  {/* Left / Right Click overlay areas for mobile swiping */}
                  <div
                    onClick={handlePrev}
                    className="absolute inset-y-0 left-0 w-1/3 z-10 cursor-w-resize"
                    title="Previous screen"
                  />
                  <div
                    onClick={handleNext}
                    className="absolute inset-y-0 right-0 w-1/3 z-10 cursor-e-resize"
                    title="Next screen"
                  />
                </div>
              </div>

              {/* Screenshot Controls & Indicator */}
              <div className="mt-3 flex w-full max-w-[280px] items-center justify-between px-2 sm:mt-4 sm:max-w-[300px]">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous screenshot"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-slate-800 text-slate-300 transition-colors hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="text-center">
                  <p className="font-mono text-xs font-semibold text-white truncate max-w-[170px]">
                    {currentScreen.title}
                  </p>
                  <p className="font-mono text-[10px] text-slate-400">
                    Screen {activeScreenIndex + 1} of {screens.length}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next screenshot"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-slate-800 text-slate-300 transition-colors hover:border-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              {/* Thumbnails Strip */}
              {screens.length > 1 && (
                <div className="mt-3 flex w-full max-w-[280px] items-center justify-center gap-2 overflow-x-auto px-1 pb-1 sm:mt-3.5 sm:max-w-[320px]">
                  {screens.map((screen, idx) => {
                    const isActive = idx === activeScreenIndex;
                    return (
                      <button
                        key={screen.src}
                        type="button"
                        onClick={() => setActiveScreenIndex(idx)}
                        aria-label={`View ${screen.title || `screen ${idx + 1}`}`}
                        className={`relative h-12 w-8 shrink-0 overflow-hidden rounded-md border transition-all ${
                          isActive
                            ? 'border-cyan-400 ring-2 ring-cyan-400/40 scale-105'
                            : 'border-white/15 opacity-60 hover:opacity-100 hover:border-white/40'
                        }`}
                      >
                        <img
                          src={screen.src}
                          alt=""
                          className="h-full w-full object-cover object-top"
                        />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right Column: Project Details & Case Study Information */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                {/* Status Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 font-mono text-xs text-cyan-300 border border-cyan-500/20">
                    <Sparkles size={12} /> {project.category}
                  </span>
                  {project.status && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 px-3 py-1 font-mono text-xs text-purple-300 border border-purple-500/20">
                      {project.status}
                    </span>
                  )}
                </div>

                {/* Title and Short Description */}
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2.5 text-sm sm:text-base leading-relaxed text-slate-300">
                    {project.desc}
                  </p>
                </div>

                {/* Key Features List */}
                {project.features && project.features.length > 0 && (
                  <div className="rounded-xl border border-white/10 bg-slate-950/60 p-4 sm:p-5">
                    <h4 className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-3">
                      <Layers size={14} /> Key Modules & Capabilities
                    </h4>
                    <ul className="grid gap-2.5">
                      {project.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
                        >
                          <CheckCircle2
                            size={16}
                            className="text-cyan-400 shrink-0 mt-0.5"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack Pills */}
                <div>
                  <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2.5">
                    Technologies & Architecture
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-lg border border-cyan-500/20 bg-cyan-950/30 px-3 py-1 font-mono text-xs font-medium text-cyan-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Context Box: Explaining Enterprise / No Live Web Link */}
                {project.projectType === 'mobile' && (
                  <div className="flex items-start gap-3 rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-4 text-xs text-amber-200/90 sm:text-sm">
                  <Info size={18} className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold text-amber-300 mb-1">
                      Enterprise Mobile Deployment
                    </strong>
                    <p className="leading-relaxed text-amber-200/80">
                      This mobile app is deployed internally for enterprise operations and field workforce. Because it operates on private mobile builds with secure enterprise APIs rather than a public web portal, UI workflow and features are showcased via the interactive screenshots on the left.
                    </p>
                  </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 font-mono text-xs sm:text-sm font-semibold text-slate-950 transition-all hover:bg-cyan-400"
                  >
                    Visit Live App <ExternalLink size={14} />
                  </a>
                )}

                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 font-mono text-xs sm:text-sm font-medium text-white transition-colors hover:bg-white/10"
                  >
                    View Source <Github size={14} />
                  </a>
                )}

                <a
                  href="#contact"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-4 py-2.5 font-mono text-xs sm:text-sm font-bold text-white shadow-md shadow-cyan-950/40 transition-transform hover:-translate-y-0.5"
                >
                  Discuss Project
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="ml-auto rounded-xl border border-white/10 px-4 py-2.5 font-mono text-xs sm:text-sm text-slate-400 hover:text-white hover:border-white/20"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fullscreen High-Resolution Lightbox Zoom */}
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-lenis-prevent="true"
            onWheel={(e) => e.stopPropagation()}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl"
            onClick={() => setIsZoomed(false)}
          >
            <div className="relative max-h-full max-w-full flex flex-col items-center">
              <button
                type="button"
                onClick={() => setIsZoomed(false)}
                className="absolute top-2 right-2 sm:-top-10 sm:-right-10 rounded-full bg-slate-800/80 p-2 text-white hover:bg-slate-700"
                aria-label="Exit fullscreen"
              >
                <Minimize2 size={20} />
              </button>
              <img
                src={currentScreen.src}
                alt={currentScreen.title}
                className="max-h-[85vh] w-auto rounded-2xl shadow-2xl object-contain border border-white/15"
                onClick={(e) => e.stopPropagation()}
              />
              <p className="mt-3 font-mono text-xs text-slate-300">
                {currentScreen.title} ({activeScreenIndex + 1}/{screens.length})
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}