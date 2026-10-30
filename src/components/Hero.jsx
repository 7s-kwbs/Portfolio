import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

function HeroDoodles() {
  return (
    <div aria-hidden="true" className="hero-doodles pointer-events-none absolute inset-0 overflow-hidden text-cyan-500/50">
      <svg className="hero-doodle absolute left-[24%] top-[12%] h-32 w-24 text-cyan-400" viewBox="0 0 100 140" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5">
        <path d="M55 34c28 18 42 45 46 86M47 20l9-17M36 23l-15 1M58 24l13-2M39 39l-8 12" />
      </svg>
      <svg className="hero-doodle absolute right-[29%] top-[17%] h-16 w-16" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5">
        <path d="m15 5 38 10-7 32-22 12L5 36 12 7zM20 17l23 6-2 7-17-4-2 6 16 4-2 8-16 8-8-7" />
      </svg>
      <svg className="hero-doodle absolute left-[18%] top-[52%] h-20 w-16" viewBox="0 0 64 80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5">
        <path d="M18 8 29 70M38 25h20L43 41M18 49H5l9 10-9 9h17" />
      </svg>
      <svg className="hero-doodle absolute left-[30%] top-[57%] h-20 w-24 -rotate-12" viewBox="0 0 100 80" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
        <path d="m8 24 62-20 24 42-61 28L8 24z" /><path d="m35 39 13-5m-11 15 16-7m-11 15 16-7" />
      </svg>
      <svg className="hero-doodle absolute right-[19%] top-[55%] h-28 w-44" viewBox="0 0 176 112" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5">
        <path d="M88 88C45 99 15 75 20 45c4-27 38-39 67-32 26 6 38 30 28 49-7 13-21 19-35 26" />
        <circle cx="50" cy="39" r="9" fill="currentColor"/><circle cx="76" cy="27" r="9" fill="currentColor"/><circle cx="99" cy="29" r="9" fill="currentColor"/><circle cx="119" cy="45" r="8" fill="currentColor"/><circle cx="45" cy="63" r="7" fill="currentColor"/>
        <path d="M125 78c-8 5-9 17 0 20 8 3 14-7 11-14m-1-3 31-54c5-8 12-13 15-10 3 4-2 11-8 18l-43 45" />
      </svg>
      <svg className="hero-doodle absolute bottom-[7%] left-[4%] h-36 w-64 -rotate-6 sm:h-44 sm:w-80" viewBox="0 0 320 160" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5">
        <path d="M47 100C10 83 10 34 39 22c24-10 48 8 51 37 11-25 37-25 49-4 18-24 46-8 43 17 28-16 51 8 41 29 30-2 41 24 22 39-19 15-50 8-68-6-26 24-63 16-76-4-27 16-63-1-64-30-1 0-1 0 10 0z" />
        <text x="63" y="103" fill="currentColor" stroke="none" fontSize="34" fontWeight="700" letterSpacing="3">CODE</text>
      </svg>
      <svg className="hero-doodle absolute bottom-[8%] right-[8%] h-36 w-72 rotate-3 sm:h-44 sm:w-96" viewBox="0 0 390 150" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5">
        <path d="M26 105c-17-28 10-48 33-35-10-30 19-47 42-29 6-29 37-32 49-7 18-28 49-15 49 12 25-22 52-5 46 20 25-17 51 0 42 25 25-8 46 12 27 30-22 19-49 13-66 1-21 20-51 17-67-2-24 21-56 13-65-6-28 17-69 8-90-9z" />
        <text x="47" y="102" fill="currentColor" stroke="none" fontSize="40" fontWeight="700" letterSpacing="2">CREATE</text>
      </svg>
    </div>
  );
}

const Hero = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[760px] items-center justify-center overflow-hidden bg-[#000b20] px-4 pb-20 pt-28 text-center sm:min-h-screen sm:px-6"
    >
      <HeroDoodles />
      <motion.div
        className="relative z-10 mx-auto w-full max-w-4xl"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <p className="mb-5 text-lg font-medium text-white sm:text-xl">Hey, I'm Narendra.</p>
        <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.5rem]">
          I enjoy <span className="text-cyan-400">building</span> and<br className="hidden sm:block" />{' '}
          <span className="text-cyan-400">designing</span> for the web.
        </h1>
        <a
          href="#about"
          className="mt-10 inline-flex min-h-16 items-center justify-center rounded-full border-2 border-slate-200 px-10 py-4 text-lg font-bold text-white transition duration-200 hover:border-cyan-400 hover:bg-cyan-400 hover:text-slate-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
        >
          Tell me more
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;