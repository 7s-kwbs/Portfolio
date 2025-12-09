import React, { useState } from 'react';

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", link: "#home" },
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Contact", link: "#contact" }
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-cyan-500/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">

            <a href="#" className="text-2xl lg:text-3xl font-black tracking-tight group">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent 
                drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] group-hover:drop-shadow-[0_0_25px_rgba(34,211,238,0.8)] transition-all duration-300">
                Narendra
              </span>
              <span className="text-cyan-400 animate-pulse">.</span>
            </a>

            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.link}
                  className="relative px-5 py-2 text-gray-400 font-medium group overflow-hidden rounded-lg transition-colors hover:text-white"
                >
                  <span className="relative z-10">{item.name}</span>
                  
             
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></span>
                </a>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative w-12 h-12 rounded-xl bg-gray-900 border border-gray-800 
                flex items-center justify-center group hover:border-cyan-500/50 transition-all duration-300"
            >
              <div className="relative w-6 h-5 flex flex-col justify-between">
                <span className={`block w-full h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee] transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2.5' : ''}`}></span>
                <span className={`block w-full h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee] transition-all duration-300 ${isOpen ? 'opacity-0 translate-x-3' : ''}`}></span>
                <span className={`block w-full h-0.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee] transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

     
        <div className={`md:hidden absolute w-full bg-gray-950/95 backdrop-blur-2xl border-b border-cyan-500/20 transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className="px-6 py-8 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                onClick={() => setIsOpen(false)}
                className="block text-xl font-bold text-gray-300 hover:text-cyan-400 transition-colors pl-2 border-l-2 border-transparent hover:border-cyan-400"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;