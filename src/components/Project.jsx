import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ExternalLink,
  Github,
  Sparkles,
  Smartphone,
  Eye,
  Images,
} from 'lucide-react';
import ProjectModal from './ProjectModal';


const projects = [

  {
    title: 'Forward ',
    category: 'Mobile Apps',
    projectType: 'mobile',
    badge: 'HR & Sales Management',
    status: 'Internal Enterprise App',
    desc: 'A complete HR and sales management app for managers, sales executives, customers, and employees, bringing sales operations and workforce management into one place.',
    tech: ['Flutter', 'Dart', 'REST API', 'Sales Management', 'HR Management'],
    image: '/projects/forward-app/home.png',
    featured: true,
    live: null,
    github: null,
    features: [
      'Manage sales visits, orders, stock, collections, leads, and client relationships',
      'Handle leave, attendance, invoicing, payments, expenses, and employee tasks',
      'Manage products, production, customer visits, and announcements',
      'Centralize sales data and lead sources to support organized operations and customer relationships',
    ],
    screenshots: [
      {
        title: 'Forward Home',
        src: '/projects/forward-app/home.png',
        desc: 'Forward, a complete HR and sales management app.',
      },
      {
        title: 'Management Modules',
        src: '/projects/forward-app/drawer.png',
        desc: 'Access sales, customer relationship, HR, finance, production, and task management.',
      },
      {
        title: 'Sign In',
        src: '/projects/forward-app/login.png',
        desc: 'Sign in to the Forward management app.',
      },
    ],
  },

  // ==========================================================================
  // 2. TASKIFY PRODUCTIVITY APP (PROJECT 2)
  // ==========================================================================
  {
    title: 'Taskify',
    category: 'Mobile Apps',
    projectType: 'mobile',
    badge: 'Productivity app',
    status: 'Personal Project',
    desc: 'Flutter productivity app for managing projects, independent tasks, labels, schedules, and progress, with Firebase authentication and offline-capable Firestore sync.',
    tech: ['Flutter', 'Dart', 'Firebase Auth', 'Cloud Firestore', 'GetX', 'flutter_slidable', 'intl'],
    image: '/projects/Taskify/login.png',
    featured: true,
    live: null,
    github: null,
    features: [
      'Manage projects and independent tasks with priorities, labels, deadlines, and status tracking',
      'Move tasks between Todo, Doing, and Done with swipe actions',
      'Schedule tasks with calendar views and review progress in reports',
      'Firebase authentication and offline Firestore persistence with pending-write sync',
    ],
    screenshots: [
      {
        title: 'Taskify Dashboard',
        src: '/projects/Taskify/home.png',
        desc: 'Project progress overview, independent task counts, and quick navigation.',
      },
      {
        title: 'Calendar',
        src: '/projects/Taskify/calendar.png',
        desc: 'Monthly calendar for browsing scheduled independent tasks.',
      },
      {
        title: 'Reports',
        src: '/projects/Taskify/reports.png',
        desc: 'Task totals, completion percentage, and status and priority breakdowns.',
      },
      {
        title: 'Login',
        src: '/projects/Taskify/login.png',
        desc: 'Email and password authentication.',
      },
    ],
  },

  // --- 2. ASSETTRACK ---
  {
    title: 'AssetTrack',
    category: 'React & Full-Stack',
    projectType: 'web',
    desc: 'Enterprise-level tangible fixed asset tracking system with real-time inventory updates, asset lifecycle management, and role-based access control.',
    tech: ['React', 'Tailwind CSS', '.NET Core', 'SQL Server'],
    live: 'https://asset-track-hg7ueyg0z-chapagainnarendra99-3061s-projects.vercel.app/',
    github: 'https://github.com/7s-kwbs/Asset-Track',
    image: '/asset_track.png',
    featured: true,
    screenshots: [
      {
        title: 'AssetTrack Web System',
        src: '/asset_track.png',
        desc: 'Real-time asset tracking and lifecycle dashboard.',
      },
    ],
  },

  // --- 3. QATAR HOLIDAYS ---
  {
    title: 'Qatar Holidays',
    category: 'Client & CMS',
    projectType: 'web',
    desc: 'Qatar Holidays DMC is an international travel platform showcasing curated tour packages and luxury experiences in Qatar, featuring fast tour filtering and responsive booking inquiry UI.',
    tech: ['Laravel', 'Alpine Js', 'Tailwind CSS', 'Responsive UI'],
    live: 'https://qatarholidaysdmc.com/',
    image: '/Qatar.png',
    featured: false,
    screenshots: [
      {
        title: 'Qatar Holidays Tour Platform',
        src: '/Qatar.png',
        desc: 'Luxury tour packages and fast booking inquiry UI.',
      },
    ],
  },

  // --- 4. BIKE RENTAL ---
  {
    title: 'Bike Rental',
    category: 'React & Full-Stack',
    projectType: 'web',
    desc: 'Full-featured bike rental and fleet management platform featuring dynamic booking workflow, real-time vehicle availability, and comprehensive admin dashboard.',
    tech: ['React', 'Framer Motion', 'Tailwind CSS', 'Supabase'],
    live: 'https://kwbsbike-rental.vercel.app/',
    github: 'https://github.com/7s-kwbs/Bike-Rental',
    image: '/bike.png',
    featured: true,
    screenshots: [
      {
        title: 'Bike Rental Platform',
        src: '/bike.png',
        desc: 'Dynamic booking workflow and fleet availability dashboard.',
      },
    ],
  },
];

const categories = ['All', 'React & Full-Stack', 'Mobile Apps', 'Client & CMS'];

function ProjectCard({ project, index, total, onSelectProject }) {
  const isMobile = project.projectType === 'mobile';

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{
        layout: { type: 'spring', stiffness: 150, damping: 24, mass: 0.9 },
        opacity: { duration: 0.28, ease: 'easeOut', delay: index * 0.035 },
        y: { type: 'spring', stiffness: 150, damping: 24, delay: index * 0.035 },
      }}
      whileHover={{ y: -3, transition: { duration: 0.22, ease: 'easeOut' } }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-slate-950/40"
    >
      {/* IDE Window Title Bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-slate-950/70 px-4 py-3 relative z-20">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </span>
          <span className="truncate font-mono text-[11px] text-slate-400 ml-1">
            ~/{isMobile ? 'mobile' : 'projects'}/{project.title.toLowerCase().replaceAll(' ', '-')}
          </span>
        </div>

        {isMobile ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-purple-300 border border-purple-500/20">
            <Smartphone size={10} className="text-purple-400" /> App Showcase
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-emerald-400 border border-emerald-500/20">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
          </span>
        )}
      </div>

      {/* Preview Section */}
      {isMobile ? (
        /* Mobile Device Showcase in landscape card container */
        <div
          onClick={() => onSelectProject(project)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onSelectProject(project)}
          className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-3 cursor-pointer group/mobile select-none"
        >
          {/* Subtle radial glow */}
          <div className="absolute inset-0 bg-radial from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

          {/* Left background screen for 3D depth */}
          {project.screenshots && project.screenshots[1] && (
            <div className="absolute left-6 h-[85%] aspect-[9/19] rounded-xl overflow-hidden border border-slate-700/40 opacity-30 blur-[0.6px] -rotate-6 scale-90 pointer-events-none hidden sm:block">
              <img
                src={project.screenshots[1].src}
                alt=""
                className="h-full w-full object-cover object-top"
              />
            </div>
          )}

          {/* Right background screen for 3D depth */}
          {project.screenshots && project.screenshots[2] && (
            <div className="absolute right-6 h-[85%] aspect-[9/19] rounded-xl overflow-hidden border border-slate-700/40 opacity-30 blur-[0.6px] rotate-6 scale-90 pointer-events-none hidden sm:block">
              <img
                src={project.screenshots[2].src}
                alt=""
                className="h-full w-full object-cover object-top"
              />
            </div>
          )}

          {/* Centered phone showcase */}
          <div className="relative z-10 h-[92%] aspect-[9/19] rounded-2xl overflow-hidden border-2 border-slate-700/90 shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover/mobile:scale-105 group-hover/mobile:border-cyan-400/60">
            <img
              src={project.image}
              alt={`${project.title} mobile preview`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top"
            />
          </div>

          {/* Hover CTA Overlay */}
          <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[2px] opacity-0 group-hover/mobile:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/50 bg-slate-900/90 px-4 py-1.5 font-mono text-xs font-semibold text-cyan-300 shadow-xl shadow-cyan-950/60">
              <Eye size={14} /> View Screenshots & Details
            </span>
          </div>

          {/* Badge */}
          <span className="absolute bottom-3 left-3 rounded-md border border-white/15 bg-slate-950/85 px-2 py-0.5 font-mono text-[9px] text-cyan-300 backdrop-blur-md flex items-center gap-1 z-20">
            <Smartphone size={10} /> {project.screenshots?.length || 1} SCREENS
          </span>
        </div>
      ) : (
        /* Web App Landscape Preview */
        <div
          onClick={() => onSelectProject(project)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onSelectProject(project)}
          className="relative aspect-[16/10] overflow-hidden bg-slate-950 cursor-pointer group/web"
        >
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.035]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent" />
          <span className="absolute bottom-3 left-3 rounded-md border border-white/15 bg-slate-950/80 px-2 py-0.5 font-mono text-[9px] text-slate-300 backdrop-blur-md">
            PREVIEW // 0{index + 1}
          </span>
        </div>
      )}

      {/* Card Content */}
      <div className="relative z-20 flex flex-1 flex-col p-4 sm:p-6">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3
            onClick={() => onSelectProject(project)}
            className="cursor-pointer text-lg font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-cyan-200 sm:text-xl"
          >
            {project.title}
          </h3>
          <span className="shrink-0 font-mono text-xs text-slate-500">
            0{index + 1} / 0{total}
          </span>
        </div>

        <p className="mb-5 flex-grow text-xs leading-5 text-slate-300 sm:text-sm sm:leading-6">
          {project.desc}
        </p>

        {/* Tech Stack Pills */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/10 bg-slate-950/60 px-2.5 py-1 font-mono text-[10px] text-cyan-200/90"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Card Footer with Actions */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <span className="font-mono text-[10px] text-slate-500 truncate max-w-[120px]">
            {project.tech[0]} <span aria-hidden="true">/</span> {isMobile ? 'mobile' : 'production'}
          </span>

          <div className="flex items-center gap-2.5">
            {isMobile ? (
              /* Mobile Showcase Button */
              <button
                type="button"
                onClick={() => onSelectProject(project)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500/10 px-3 py-1.5 font-mono text-xs font-semibold text-cyan-300 border border-cyan-500/20 transition-all hover:bg-cyan-500 hover:text-slate-950 hover:shadow-lg hover:shadow-cyan-500/20 cursor-pointer"
              >
                <Images size={13} /> View App UI
              </button>
            ) : (
              /* Web App Live Button */
              project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500/10 px-3 py-1.5 font-mono text-xs font-semibold text-cyan-300 border border-cyan-500/20 transition-all hover:bg-cyan-500 hover:text-slate-950 hover:shadow-lg hover:shadow-cyan-500/20"
                >
                  Live <ExternalLink size={12} />
                </a>
              )
            )}

            {/* GitHub Button if link exists */}
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source code on GitHub`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 font-mono text-xs text-slate-300 transition-colors hover:border-white/30 hover:text-white"
              >
                Code <Github size={12} />
              </a>
            ) : isMobile ? (
              <span className="rounded border border-white/10 bg-slate-950/60 px-2 py-1 font-mono text-[10px] text-slate-400">
                Enterprise
              </span>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative overflow-hidden bg-gray-950 py-20 sm:py-24">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-20 left-10 h-80 w-80 rounded-full bg-cyan-600/10 blur-[120px] sm:h-96 sm:w-96" />
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-purple-600/10 blur-[130px] sm:h-[450px] sm:w-[450px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center sm:mb-16"
        >
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
            Selected Work
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Featured{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600" />
          <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-400 sm:text-base">
            Real-world web and mobile applications engineered for real users — featuring clean architecture, production-ready code, and thoughtful UX.
          </p>
        </motion.header>

        {/* Category Filter Tabs */}
        <div className="mb-10 -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const count = cat === 'All'
              ? projects.length
              : projects.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                aria-pressed={isActive}
                className={`relative shrink-0 whitespace-nowrap px-4 py-2 rounded-full font-mono text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-tab-bg"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-600/20 border border-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.2)] -z-10"
                    transition={{ type: 'spring', stiffness: 240, damping: 28 }}
                  />
                )}
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Project Grid */}
        <p className="sr-only" role="status" aria-live="polite">
          Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
          {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}.
        </p>
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                total={filteredProjects.length}
                onSelectProject={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* GitHub Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-14 text-center sm:mt-16"
        >
          <a
            href="https://github.com/7s-kwbs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-cyan-950/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-500/25 sm:px-8 sm:py-4 sm:text-base"
          >
            <Github size={18} />
            <span>Explore More on GitHub</span>
            <span aria-hidden="true">&#8599;</span>
          </a>
        </motion.div>
      </div>

      {/* Interactive Case Study & Screenshot Modal */}
      <ProjectModal
        key={selectedProject?.title}
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}

export default Projects;