import React from 'react';

function Projects() {
  const projects = [
    {
      title: "AssetTrack",
      desc: "Enterprise-level intangible fixed asset tracking system with real-time updates and role-based access.",
      tech: ["React", "Tailwind CSS", ".NET Core", "SQL Server"],
      live: "https://assettrack.narendra.com",       
      github: "https://github.com/narukwbs/assettrack" 
    },
    {
      title: "Weather App",
      desc: "Beautiful real-time weather app with location detection & forecast support.",
      tech: ["React", "OpenWeather API", "Framer Motion"],
      live: "https://weather.narendra.dev",
      github: "https://github.com/narukwbs/weather-app"
    },
    {
      title: "Bike Rental",
      desc: "Feature-packed bike rental system with real-time updates and role-based access.", 
      tech: ["React", "Framer Motion", "Tailwind CSS"],
      live: " ", 
      github: "https://github.com/narukwbs/bike-rental" 
    }
  ];

  return (
    <section id="projects" className="min-h-screen py-20 px-6 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            My <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-700 transition-all duration-300 flex flex-col h-full"
            >
              <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 bg-gray-800/50 text-cyan-300 text-xs rounded-lg border border-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-6 text-sm mt-auto">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 font-medium transition-colors"
                  >
                    Live Demo
                  </a>
                )}

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;