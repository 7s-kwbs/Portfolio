/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from 'framer-motion';
import profileImg from '../assets/b.jpg';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  }
};

const MovingBorder = ({ children, duration = 2000, rx, ry, ...otherProps }) => {
  const pathRef = useRef(null);
  const progress = useMotionValue(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      progress.set((time * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).x);
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val).y);
  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect fill="none" width="100%" height="100%" rx={rx} ry={ry} ref={pathRef} />
      </svg>
      <motion.div style={{ position: 'absolute', top: 0, left: 0, display: 'inline-block', transform }}>
        {children}
      </motion.div>
    </>
  );
};

const MovingBorderButton = ({
  borderRadius = '0.5rem',
  children,
  containerClassName = '',
  borderClassName = '',
  duration = 2000,
  className = '',
  hoverShadow = '',
  onClick,
  ...otherProps
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`bg-transparent relative overflow-hidden p-[1px] transition-all duration-300 ${containerClassName}`}
      style={{
        borderRadius,
        boxShadow: hovered ? hoverShadow : 'none',
        transform: hovered ? 'translateY(-3px) scale(1.02)' : 'translateY(0px) scale(1)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      }}
      {...otherProps}
    >
      <div className="absolute inset-0" style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}>
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div className={`h-20 w-20 opacity-80 ${borderClassName}`} />
        </MovingBorder>
      </div>

      <div
        className={`relative flex items-center justify-center w-full h-full text-sm font-semibold antialiased backdrop-blur-xl ${className}`}
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {children}
      </div>
    </button>
  );
};

const Typewriter = ({ texts, typingSpeed = 70, deletingSpeed = 40, pauseDuration = 1800 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    let timer;
    const currentText = texts[loopNum % texts.length];
    if (!isDeleting && charIndex < currentText.length) {
      timer = setTimeout(() => {
        setDisplayText(currentText.substring(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
      timer = setTimeout(() => {
        setDisplayText(currentText.substring(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, deletingSpeed);
    } else if (!isDeleting && charIndex === currentText.length) {
      timer = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setLoopNum((prev) => prev + 1);
    }
    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, loopNum, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// Pure SVG Icon components (No external dependencies)
const ReactIcon = () => (
  <svg className="w-5 h-5 text-sky-400" viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
    <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
    <g stroke="#61dafb" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const FlutterIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <path d="M14.314 0L2.3 12 6.07 15.772 21.857 0h-7.543z" fill="#38BDF8" />
    <path d="M14.286 11.457l-6.143 6.143 3.771 3.829 2.372-2.372 7.571-7.6h-7.571z" fill="#0284C7" />
    <path d="M8.143 17.6l3.771 3.829 2.515-2.515-3.772-3.8-2.514 2.486z" fill="#0369A1" />
  </svg>
);

const TailwindIcon = () => (
  <svg className="w-5 h-5 text-teal-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
  </svg>
);

const TypeScriptIcon = () => (
  <svg className="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.5 0h21l1.5 1.5v21l-1.5 1.5h-21L0 22.5v-21L1.5 0zm10.74 14.37h-3.3v7.45H5.81v-7.45H2.52v-2.73h9.72v2.73zm10.14 1.74c-.16-.92-.61-1.65-1.35-2.2-.74-.54-1.74-.82-2.99-.82-.77 0-1.44.11-2.01.32-.57.22-1 .51-1.3.88l1.77 2.06c.36-.35.83-.53 1.41-.53.51 0 .93.11 1.25.32.32.21.48.51.48.9 0 .28-.11.51-.33.68-.22.18-.62.33-1.21.47l-1.32.32c-1.32.32-2.27.8-2.84 1.44-.57.64-.86 1.48-.86 2.51 0 1.21.43 2.19 1.29 2.92.86.74 2.02 1.11 3.48 1.11 1.09 0 2.02-.19 2.79-.58.77-.39 1.34-.95 1.71-1.69l-1.92-1.77c-.42.6-.99.9-1.71.9-.45 0-.82-.1-1.12-.29-.29-.2-.44-.48-.44-.84 0-.27.1-.49.31-.66.21-.17.6-.33 1.17-.46l1.32-.31c1.39-.33 2.37-.83 2.94-1.51.57-.67.86-1.57.86-2.69z" />
  </svg>
);

const NodeIcon = () => (
  <svg className="w-5 h-5 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0l10.392 6v12L12 24 1.608 18V6L12 0zm0 2.309L3.608 7.155v9.69L12 21.691l8.392-4.846v-9.69L12 2.309zM12 5.5l5.5 3.175v6.35L12 18.2l-5.5-3.175v-6.35L12 5.5z" />
  </svg>
);

const MongoIcon = () => (
  <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.193 9.555c-1.264-5.29-4.81-8.583-4.908-8.673L12 0l-.285.882c-.098.09-3.644 3.383-4.908 8.673-1.42 5.946.84 10.384 4.542 13.568.216.185.45.367.651.558.201-.191.435-.373.651-.558 3.702-3.184 5.962-7.622 4.542-13.568zM12 19.98c-2.456-2.316-4.084-5.568-3.09-9.728.847-3.543 3.09-6.075 3.09-6.075s2.243 2.532 3.09 6.075c.994 4.16-.634 7.412-3.09 9.728z" />
  </svg>
);

const ExpressIcon = () => (
  <svg className="w-5 h-5 text-slate-200" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 18.571h-4.428l-2.73-4.32-2.756 4.32H9.658l4.98-7.51-4.708-7.061h4.428l2.551 4.093 2.525-4.093H24l-4.786 7.234L24 18.571zM4.686 18.571C2.097 18.571 0 16.474 0 13.885c0-2.589 2.097-4.686 4.686-4.686 2.378 0 4.335 1.764 4.636 4.062h-2.18c-.267-1.144-1.282-1.99-2.456-1.99-1.405 0-2.544 1.139-2.544 2.614 0 1.475 1.139 2.614 2.544 2.614 1.174 0 2.189-.846 2.456-1.99h2.18c-.301 2.298-2.258 4.062-4.636 4.062z" />
  </svg>
);

const techBadges = [
  { Component: ReactIcon, label: 'React', pos: '-top-3 left-6', delay: '0s' },
  { Component: FlutterIcon, label: 'Flutter', pos: 'top-2 -right-2 sm:-right-4', delay: '1s' },
  { Component: TypeScriptIcon, label: 'TypeScript', pos: 'top-1/3 -left-6 sm:-left-8', delay: '1.5s' },
  { Component: TailwindIcon, label: 'Tailwind CSS', pos: 'top-1/2 -right-6 sm:-right-8', delay: '2s' },
  { Component: NodeIcon, label: 'Node.js', pos: 'bottom-16 -left-4', delay: '2.5s' },
  { Component: MongoIcon, label: 'MongoDB', pos: 'bottom-10 -right-2 sm:-right-4', delay: '3s' },
  { Component: ExpressIcon, label: 'Express', pos: '-bottom-4 left-1/3', delay: '3.5s' },
];

const Hero = () => {
  const roles = [
    'Frontend & Mobile Developer',
    'React & Flutter Specialist',
    'Full-Stack Learner'
  ];

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-16px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50%       { transform: translateY(-8px) scale(1.05); }
        }
        @keyframes blob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50%       { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        .animate-blob  { animation: blob 8s ease-in-out infinite; }
      `}</style>

      <section
        id="home"
        className="min-h-screen flex items-center relative overflow-hidden bg-[#0a0a0f]"
      >
        {/* Background ambient lighting */}
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-violet-600/15 rounded-full blur-3xl animate-blob pointer-events-none" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-600/10 rounded-full blur-3xl animate-blob pointer-events-none"
          style={{ animationDelay: '3s' }}
        />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-24 md:py-0 md:min-h-screen md:flex md:items-center">
          <div className="w-full flex flex-col-reverse md:flex-row items-center gap-10 lg:gap-16 xl:gap-20">

            {/* ── LEFT: Content ── */}
            <motion.div
              className="flex-1 text-center md:text-left"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* Availability status badge */}
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Available for new opportunities
                </span>
              </motion.div>

              {/* Name */}
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 leading-tight tracking-tight"
              >
                Narendra Chapagain
              </motion.h1>

              {/* Roles Typewriter */}
              <motion.h2
                variants={fadeInUp}
                className="text-xl sm:text-2xl lg:text-3xl font-semibold text-violet-400 mb-5 h-10"
              >
                <Typewriter texts={roles} />
              </motion.h2>

              {/* Human Bio */}
              <motion.p
                variants={fadeInUp}
                className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed mb-6"
              >
                Software developer focused on frontend and mobile development. Over the last two years,
                I've built end-to-end applications, turning wireframes and designs into fast, reliable
                software across web and mobile using React and Flutter—while actively expanding into full-stack backend systems with Node.js and MongoDB.
              </motion.p>

              {/* Original SVG Social Icons */}
              <motion.div variants={fadeInUp} className="flex gap-4 justify-center md:justify-start mb-8">
                <a
                  href="https://github.com/7s-kwbs"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="text-slate-400 hover:text-white transition-colors duration-200 hover:scale-110 transform"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="text-slate-400 hover:text-white transition-colors duration-200 hover:scale-110 transform"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </motion.div>

              {/* Moving Border CTA Buttons */}
              <motion.div variants={fadeInUp} className="flex gap-4 justify-center md:justify-start flex-wrap">
                <MovingBorderButton
                  duration={2500}
                  borderRadius="0.5rem"
                  containerClassName="w-44 h-12"
                  borderClassName="bg-[radial-gradient(#8b5cf6_40%,transparent_60%)]"
                  className="bg-slate-900/90 border border-slate-700 text-white font-medium"
                  hoverShadow="0 8px 30px rgba(139, 92, 246, 0.45), 0 0 0 1px rgba(139,92,246,0.3)"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View My Work
                </MovingBorderButton>

                <MovingBorderButton
                  duration={3000}
                  borderRadius="0.5rem"
                  containerClassName="w-44 h-12"
                  borderClassName="bg-[radial-gradient(#38bdf8_40%,transparent_60%)]"
                  className="bg-slate-950/60 border border-slate-700/80 text-slate-300 font-medium hover:text-white"
                  hoverShadow="0 8px 30px rgba(56, 189, 248, 0.35), 0 0 0 1px rgba(56, 189, 248, 0.3)"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get In Touch
                </MovingBorderButton>
              </motion.div>
            </motion.div>

            {/* ── RIGHT: Profile Image with Floating Pure-SVG Orbit Badges ── */}
            <motion.div
              className="flex-shrink-0 flex justify-center items-center py-6 sm:py-8"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            >
              <div className="relative animate-float">
                {/* Glow layer */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-500 via-sky-500 to-indigo-500 blur-2xl opacity-35 scale-110 pointer-events-none" />

                {/* Avatar with gradient ring */}
                <div className="relative rounded-full p-[3px] bg-gradient-to-tr from-violet-500 via-sky-400 to-indigo-500 shadow-2xl">
                  <img
                    src={profileImg}
                    alt="Narendra Chapagain"
                    className="
                      w-52 h-52
                      sm:w-64 sm:h-64
                      md:w-72 md:h-72
                      lg:w-80 lg:h-80
                      xl:w-96 xl:h-96
                      rounded-full object-cover block
                    "
                  />
                </div>

                {/* Dashed concentric rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-4 sm:-inset-6 rounded-full border border-dashed border-violet-500/20 pointer-events-none"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-8 sm:-inset-12 rounded-full border border-dashed border-sky-500/10 pointer-events-none"
                />

                {/* Floating Orbit Tech Badges */}
                {techBadges.map((badge, idx) => {
                  const Icon = badge.Component;
                  return (
                    <div
                      key={idx}
                      className={`absolute ${badge.pos} z-20 animate-float-slow`}
                      style={{ animationDelay: badge.delay }}
                    >
                      <div className="group relative flex items-center justify-center p-2.5 sm:p-3 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/70 shadow-lg shadow-black/50 hover:border-violet-500/60 hover:scale-110 transition-all duration-200 cursor-default">
                        <Icon />
                        {/* Hover Tooltip */}
                        <span className="absolute -top-7 scale-0 group-hover:scale-100 transition-all duration-150 text-[10px] font-mono bg-slate-800 text-slate-200 px-2 py-0.5 rounded border border-slate-700 pointer-events-none whitespace-nowrap">
                          {badge.label}
                        </span>
                      </div>
                    </div>
                  );
                })}

              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;