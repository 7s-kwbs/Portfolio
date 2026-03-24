import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Mail } from 'lucide-react';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { name: 'Home',     link: '/',     id: 'home',     icon: Home },
    { name: 'About',    link: '#about',    id: 'about',    icon: User },
    { name: 'Projects', link: '#projects', id: 'projects', icon: Briefcase },
    { name: 'Contact',  link: '#contact',  id: 'contact',  icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollPosition = window.scrollY + 140;
      let current = 'home';
      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section) {
          if (
            scrollPosition >= section.offsetTop &&
            scrollPosition < section.offsetTop + section.offsetHeight
          ) {
            current = item.id;
            break;
          }
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setIsOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      {/* ── Global keyframes for the persistent glow pulse ── */}
      <style>{`
        @keyframes tube-glow {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px 2px rgba(34,211,238,0.9), 0 0 20px 4px rgba(34,211,238,0.5); }
          50%       { opacity: 1; box-shadow: 0 0 12px 4px rgba(34,211,238,1),   0 0 30px 8px rgba(34,211,238,0.7); }
        }
        @keyframes tube-halo {
          0%, 100% { opacity: 0.7; }
          50%       { opacity: 1;   }
        }
        .tube-strip   { animation: tube-glow 2s ease-in-out infinite; }
        .tube-halo    { animation: tube-halo 2s ease-in-out infinite; }
      `}</style>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-gray-950/85 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-gray-950/50 backdrop-blur-xl  border-b border-white/5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16 md:h-18 lg:h-20">

            <motion.a
              href="#home"
              className="flex-shrink-0 text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              whileHover={{ scale: 1.04 }}
            >
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-500 bg-clip-text text-transparent">
                Narendra
              </span>
              <motion.span
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="text-cyan-400"
              >.</motion.span>
            </motion.a>

            {/* ── Desktop Nav ── */}
            <div className="hidden md:flex items-center">
          
              <div className="relative flex items-center bg-gray-900/70 border border-white/10 backdrop-blur-xl rounded-full shadow-xl py-1 px-1 gap-0.5 lg:gap-1">

                {navItems.map((item, i) => {
                  const isActive = activeSection === item.id;
                  const Icon = item.icon;

                  return (
                    <motion.a
                      key={item.name}
                      href={item.link}
                      onClick={() => setActiveSection(item.id)}
                      className={`
                        relative z-10 cursor-pointer rounded-full font-semibold select-none
                        transition-colors duration-200
                        px-3 py-1.5 text-[11px]
                        md:px-4 md:py-2 md:text-xs
                        lg:px-5 lg:py-2 lg:text-sm
                        xl:px-6 xl:py-2.5 xl:text-sm
                        ${isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'}
                      `}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 + 0.4, duration: 0.6 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {/* Sliding active background */}
                      {isActive && (
                        <motion.span
                          layoutId="pill-bg"
                          className="absolute inset-0 rounded-full -z-10"
                          style={{
                            background:
                              'linear-gradient(135deg, rgba(34,211,238,0.18) 0%, rgba(139,92,246,0.18) 100%)',
                            border: '1px solid rgba(34,211,238,0.30)',
                            boxShadow: '0 0 14px rgba(34,211,238,0.20)',
                          }}
                          transition={{
                            type: 'spring',
                            stiffness: 55,
                            damping: 17,
                            mass: 1.2,
                          }}
                        />
                      )}

                      {/* ── Tubelight strip */}
                      {isActive && (
                        <motion.span
                          layoutId="tube-strip"
                          className="tube-strip absolute left-1/2 -translate-x-1/2 -top-[5px] rounded-full pointer-events-none"
                          style={{
                            width: '60%',
                            height: '3px',
                            background: 'rgba(34,211,238,1)',
                            boxShadow:
                              '0 0 8px 2px rgba(34,211,238,0.9), 0 0 20px 5px rgba(34,211,238,0.55)',
                          }}
                          transition={{
                            type: 'spring',
                            stiffness: 55,
                            damping: 17,
                            mass: 1.2,
                          }}
                        />
                      )}

                    
                      {isActive && (
                        <motion.span
                          layoutId="tube-halo"
                          className="tube-halo absolute left-1/2 -translate-x-1/2 -top-1 rounded-full pointer-events-none"
                          style={{
                            width: '80%',
                            height: '18px',
                            background:
                              'radial-gradient(ellipse at top, rgba(34,211,238,0.35) 0%, transparent 70%)',
                            filter: 'blur(4px)',
                          }}
                          transition={{
                            type: 'spring',
                            stiffness: 55,
                            damping: 17,
                            mass: 1.2,
                          }}
                        />
                      )}

                      {/* Text / Icon */}
                      <span className="hidden lg:inline">{item.name}</span>
                      <span className="lg:hidden">
                        <Icon size={16} strokeWidth={2.5} />
                      </span>
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* ── Hamburger ── */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="md:hidden flex-shrink-0 w-9 h-9 rounded-full bg-gray-900/70 border border-gray-700/60 flex items-center justify-center"
              whileTap={{ scale: 0.88 }}
              whileHover={{ scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 500, damping: 18 }}
            >
              <div className="w-5 h-5 relative">
                <motion.span
                  className="absolute top-[3px] left-0 w-full h-0.5 bg-cyan-300 rounded-full"
                  animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
                <motion.span
                  className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-0.5 bg-cyan-300 rounded-full"
                  animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.25 }}
                />
                <motion.span
                  className="absolute bottom-[3px] left-0 w-full h-0.5 bg-cyan-300 rounded-full"
                  animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </div>
            </motion.button>

          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden bg-gray-950/97 backdrop-blur-2xl border-b border-cyan-500/10 overflow-hidden"
              initial={{ opacity: 0, maxHeight: 0 }}
              animate={{ opacity: 1, maxHeight: '400px' }}
              exit={{ opacity: 0, maxHeight: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="px-4 sm:px-6 py-5 flex flex-col gap-2">
                {navItems.map((item, i) => {
                  const isActive = activeSection === item.id;
                  const Icon = item.icon;

                  return (
                    <motion.a
                      key={item.name}
                      href={item.link}
                      onClick={() => setTimeout(() => setIsOpen(false), 120)}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07 + 0.1, duration: 0.4 }}
                      className={`relative flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-medium transition-all border ${
                        isActive
                          ? 'text-cyan-300 border-cyan-400/30'
                          : 'text-gray-400 hover:text-white border-transparent hover:bg-white/5'
                      }`}
                      style={
                        isActive
                          ? {
                              background:
                                'linear-gradient(to right, rgba(34,211,238,0.08), rgba(139,92,246,0.08))',
                              boxShadow: '0 0 12px rgba(34,211,238,0.1)',
                            }
                          : {}
                      }
                    >
                      {/* Mobile */}
                      {isActive && (
                        <motion.span
                          layoutId="mobile-tube"
                          className="absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full"
                          style={{
                            width: '3px',
                            height: '60%',
                            background: 'linear-gradient(to bottom, #22d3ee, #818cf8)',
                            boxShadow: '0 0 8px 2px rgba(34,211,238,0.7)',
                          }}
                          transition={{
                            type: 'spring',
                            stiffness: 55,
                            damping: 17,
                            mass: 1.2,
                          }}
                        />
                      )}

                      <Icon
                        size={17}
                        strokeWidth={2.5}
                        className={isActive ? 'text-cyan-400' : 'text-gray-500'}
                      />
                      {item.name}
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}

export default NavBar;