import React from 'react';
import profileImg from '../assets/about.jpg'; 
import cvFile from '../assets/CV.pdf'; 

function About() {
  const skills = [
    "HTML",
    "CSS / Tailwind",
    "JavaScript",
    "React",
    "Git & Github",
    "Responsive Design",
    "Figma",
    "Photoshop",
    "Canva"
  ];

  
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = cvFile;
    link.download = 'NarendraCV.pdf'; 
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className="min-h-screen py-20 px-6 bg-gray-950 relative overflow-hidden">
    
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
      
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"></div>
        </div>

      
        <div className="flex flex-col md:flex-row items-center gap-12 mb-12">
       
          <div className="flex-1 md:flex hidden justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur-xl opacity-30"></div>
              <img
                src={profileImg}
                alt="About Narendra Chapagain"
                className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-gray-800 shadow-2xl"
              />
            </div>
          </div>
        
          <div className="flex-1 space-y-6">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-300">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                I'm <span className="text-cyan-400">Narendra Chapagain</span>
              </h3>
              
              <p className="text-gray-400 leading-relaxed mb-4">
                A passionate <strong className="text-gray-300">frontend developer</strong> and a final-year Computer Science student. 
                I love crafting smooth, responsive, and modern web interfaces using <strong className="text-gray-300">React, JavaScript, 
                Tailwind CSS,</strong> and other frontend technologies.
              </p>
              
              <p className="text-gray-400 leading-relaxed">
                My background in UI/UX tools like <strong className="text-gray-300">Figma, Photoshop and Canva</strong> helps me combine design 
                thinking with clean code. I enjoy transforming ideas into real projects that look great and work flawlessly.
              </p>
            </div>

         
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-cyan-500/30 transition-all duration-300">
              <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                Education
              </h3>
              <p className="text-gray-400 leading-relaxed">
                <span className="text-gray-300 font-semibold">Bachelor of Science in Computer Science and Information Technology (BSc. CSIT)</span>
                <br />
                <span className="text-gray-500">Tribhuvan University</span>
                <br />
                <span className="text-cyan-400">2021 - Present</span>
              </p>
            </div>
          </div>
        </div>

      
        <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-cyan-500/30 transition-all duration-300">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Skills & Technologies</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-cyan-500/10 to-purple-600/10 border border-cyan-500/20 
                          px-4 py-3 rounded-xl text-center text-gray-300 font-medium
                          hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 
                          transform hover:-translate-y-1 transition-all duration-300"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-5 justify-center mt-12">
          <button
            onClick={handleDownloadCV}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl 
                       shadow-lg hover:shadow-cyan-500/30 transform hover:-translate-y-1 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download CV
          </button>

          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-gray-700 text-gray-300 font-bold rounded-xl 
                       hover:bg-gray-800 hover:text-white hover:border-cyan-500/50 transition-all duration-300"
          >
            Let's Work Together
          </a>
        </div>
      </div>
    </section>
  );
}

export default About;