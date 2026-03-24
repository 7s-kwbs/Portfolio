/* eslint-disable react-hooks/set-state-in-effect */
import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from 'framer-motion';
import profileImg from '../assets/b.jpg';


const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 }
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
        transform: hovered ? 'translateY(-3px) scale(1.03)' : 'translateY(0px) scale(1)',
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
      timer = setTimeout(() => { setDisplayText(currentText.substring(0, charIndex + 1)); setCharIndex(c => c + 1); }, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
      timer = setTimeout(() => { setDisplayText(currentText.substring(0, charIndex - 1)); setCharIndex(c => c - 1); }, deletingSpeed);
    } else if (!isDeleting && charIndex === currentText.length) {
      timer = setTimeout(() => setIsDeleting(true), pauseDuration);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setLoopNum(prev => prev + 1);
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


const TypewriterName = ({ text, typingSpeed = 70 }) => {
  const [displayText, setDisplayText] = useState('');
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (charIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(text.substring(0, charIndex + 1));
        setCharIndex(c => c + 1);
      }, typingSpeed);
      return () => clearTimeout(timer);
    }
  }, [charIndex, text, typingSpeed]);

  return <span>{displayText}</span>;
};


const Hero = () => {
  const roles = ['Frontend Developer', 'UI/UX Designer'];

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-18px); }
        }
        @keyframes blob {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50%       { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-blob  { animation: blob  8s ease-in-out infinite; }
      `}</style>

      <section
        id="home"
        className="min-h-screen flex items-center relative overflow-hidden bg-[#0a0a0f]"
      >
        {/* Blob backgrounds */}
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-600/15 rounded-full blur-3xl animate-blob" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: '5s' }} />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-24 md:py-0 md:min-h-screen md:flex md:items-center">
          <div className="w-full flex flex-col-reverse md:flex-row items-center gap-10 lg:gap-16 xl:gap-20">

            {/* ── LEFT – Text Content ── */}
            <motion.div
              className="flex-1 text-center md:text-left"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* Greeting badge */}
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 mb-4">
                <span className="text-slate-400 text-base sm:text-lg tracking-wide">👋 Hello, I'm</span>
              </motion.div>

              {/* Name */}
              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-3 leading-tight"
              >
                <TypewriterName text="Narendra Chapagain" typingSpeed={75} />
              </motion.h1>

            
              <motion.h2
                variants={fadeInUp}
                className="text-xl sm:text-2xl lg:text-3xl font-semibold text-violet-400 mb-5 h-10"
              >
                <Typewriter texts={roles} />
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={fadeInUp}
                className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-lg leading-relaxed mb-8"
              >
                I craft visually stunning and high-performance web experiences using React,
                Tailwind CSS, and modern tech stacks. Designing elegant solutions for complex problems.
              </motion.p>

              {/* Social Icons */}
              <motion.div variants={fadeInUp} className="flex gap-4 justify-center md:justify-start mb-8">
                <a href="https://github.com/7s-kwbs" target="_blank" rel="noreferrer"
                  className="text-slate-400 hover:text-white transition-colors duration-200 hover:scale-110 transform">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer"
                  className="text-slate-400 hover:text-white transition-colors duration-200 hover:scale-110 transform">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </motion.div>

              
              <motion.div variants={fadeInUp} className="flex gap-4 justify-center md:justify-start flex-wrap">

                {/* View My Work */}
                <MovingBorderButton
                  duration={2500}
                  borderRadius="0.5rem"
                  containerClassName="w-44 h-12"
                  borderClassName="bg-[radial-gradient(#8b5cf6_40%,transparent_60%)]"
                  className="bg-slate-900/80 border border-slate-700 text-white"
                  hoverShadow="0 8px 30px rgba(139, 92, 246, 0.55), 0 0 0 1px rgba(139,92,246,0.3)"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  View My Work
                </MovingBorderButton>

                {/* Get In Touch */}
                <MovingBorderButton
                  duration={3000}
                  borderRadius="0.5rem"
                  containerClassName="w-44 h-12"
                  borderClassName="bg-[radial-gradient(#38bdf8_40%,transparent_60%)]"
                  className="bg-transparent border border-slate-600 text-white"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get In Touch
                </MovingBorderButton>

              </motion.div>
            </motion.div>

           
            <motion.div
              className="flex-shrink-0 flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            >
              <div className="relative animate-float">
              
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-500 via-sky-500 to-indigo-500 blur-2xl opacity-35 scale-110" />
               
                <div className="relative rounded-full p-[3px] bg-gradient-to-tr from-violet-500 via-sky-400 to-indigo-500 shadow-2xl">
                  <img
                    src={profileImg}
                    alt="Narendra Chapagain"
                    className="
                      w-56 h-56
                      sm:w-64 sm:h-64
                      md:w-72 md:h-72
                      lg:w-80 lg:h-80
                      xl:w-96 xl:h-96
                      rounded-full object-cover block
                    "
                  />
                </div>

              
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-3 rounded-full border border-dashed border-violet-500/20 pointer-events-none"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-6 rounded-full border border-dashed border-sky-500/10 pointer-events-none"
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;