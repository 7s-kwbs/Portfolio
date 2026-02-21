import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, Mail } from 'lucide-react';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: "Home",     link: "#home",     id: "home",     icon: Home },
    { name: "About",    link: "#about",    id: "about",    icon: User },
    { name: "Projects", link: "#projects", id: "projects", icon: Briefcase },
    { name: "Contact",  link: "#contact",  id: "contact",  icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      let current = 'home';

      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section) {
          const top = section.offsetTop;
          const height = section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
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
  });

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <motion.a
            href="#"
            className="text-3xl font-extrabold tracking-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-violet-500 bg-clip-text text-transparent">
              Narendra
            </span>
            <span className="text-cyan-400 animate-pulse">.</span>
          </motion.a>

          {/* Desktop Nav — Tubelight Style */}
          <div className="hidden md:flex items-center gap-1 bg-gray-900/50 border border-white/10 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
            {navItems.map((item, i) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;

              return (
                <motion.a
                  key={item.name}
                  href={item.link}
                  onClick={() => setActiveSection(item.id)}
                  className={`relative cursor-pointer px-5 py-2 rounded-full text-sm font-semibold transition-colors ${
                    isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                  }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 + 0.4, duration: 0.7, ease: 'easeOut' }}
                  whileHover={{ scale: 1.05 }}
                >
                  {/* Desktop: text only */}
                  <span className="hidden md:inline">{item.name}</span>

                  {/* Mobile inside desktop row: icon */}
                  <span className="md:hidden">
                    <Icon size={18} strokeWidth={2.5} />
                  </span>

                  {/* Tubelight active glow */}
                  {isActive && (
                    <motion.div
                      layoutId="tubelight"
                      className="absolute inset-0 w-full rounded-full -z-10"
                      style={{
                        background: 'linear-gradient(to right, rgba(34,211,238,0.15), rgba(139,92,246,0.15))',
                      }}
                      initial={false}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    >
                      {/* Tube light strip on top */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-cyan-400 rounded-t-full">
                        {/* Outer wide glow */}
                        <div className="absolute w-16 h-6 bg-cyan-400/20 rounded-full blur-md -top-2 -left-3" />
                        {/* Mid glow */}
                        <div className="absolute w-10 h-5 bg-cyan-400/25 rounded-full blur-md -top-1" />
                        {/* Core bright spot */}
                        <div className="absolute w-5 h-4 bg-cyan-300/40 rounded-full blur-sm top-0 left-2.5" />
                      </div>

                      {/* Bottom border glow */}
                      <div className="absolute inset-0 rounded-full border border-cyan-400/30 shadow-[0_0_20px_rgba(34,211,238,0.25)]" />
                    </motion.div>
                  )}
                </motion.a>
              );
            })}
          </div>

          {/* Mobile Hamburger */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-gray-900/70 border border-gray-700/60 flex items-center justify-center"
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
                className="absolute top-1/2 left-0 w-full h-0.5 bg-cyan-300 rounded-full origin-center"
                animate={isOpen ? { opacity: 0, scaleX: 0.3 } : { opacity: 1, scaleX: 1 }}
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden bg-gray-950/95 backdrop-blur-2xl border-b border-cyan-500/10 overflow-hidden"
            initial={{ opacity: 0, maxHeight: 0 }}
            animate={{ opacity: 1, maxHeight: '600px' }}
            exit={{ opacity: 0, maxHeight: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="px-5 py-6 flex flex-col gap-3">
              {navItems.map((item, i) => {
                const isActive = activeSection === item.id;
                const Icon = item.icon;

                return (
                  <motion.a
                    key={item.name}
                    href={item.link}
                    onClick={() => setTimeout(() => setIsOpen(false), 100)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 + 0.15, duration: 0.5 }}
                    className={`relative flex items-center gap-3 px-5 py-3.5 rounded-xl text-base font-medium transition-all overflow-hidden ${
                      isActive
                        ? 'text-cyan-300 border border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.15)]'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                    style={
                      isActive
                        ? { background: 'linear-gradient(to right, rgba(34,211,238,0.1), rgba(139,92,246,0.1))' }
                        : {}
                    }
                  >
                    {/* Tubelight strip on left side for mobile */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-400 rounded-r-full">
                        <div className="absolute w-4 h-8 bg-cyan-400/20 rounded-full blur-md -left-1 -top-1" />
                      </div>
                    )}
                    <Icon size={18} strokeWidth={2.5} />
                    {item.name}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default NavBar;