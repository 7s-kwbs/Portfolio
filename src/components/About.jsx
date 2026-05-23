import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import profileImg from "../assets/about.jpg";
import cvFile from "../assets/CV.pdf";

function About() {
  const skills = [
    "HTML",
    "CSS / Tailwind",
    "JavaScript",
    "React",
    "Flutter",
    "Git & Github",
    "Responsive Design",
    "Figma",
  ];

  const handleDownloadCV = () => {
    const link = document.createElement("a");
    link.href = cvFile;
    link.download = "NarendraCV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      className="min-h-screen py-16 sm:py-20 bg-gray-950 relative overflow-hidden"
    >
      {/* Animated background blobs */}
      <motion.div
        animate={{ y: [0, 30, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, -30, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        {/* Section Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2
            variants={itemFadeUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            About{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Me
            </span>
          </motion.h2>
          <motion.div
            variants={scaleIn}
            className="w-20 sm:w-24 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto rounded-full"
          />
        </motion.div>

        {/* About Content - Image & Text */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="flex flex-col md:flex-row items-center gap-8 lg:gap-12 xl:gap-16 mb-10 sm:mb-12"
        >
          {/* Profile Image — visible on md+ */}
          <motion.div
            variants={slideInLeft}
            className="flex-1 hidden md:flex justify-center"
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur-xl opacity-30"
              />
              <motion.img
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, delay: 0.4 }}
                whileHover={{ scale: 1.08, rotate: 3 }}
                viewport={{ once: true }}
                src={profileImg}
                alt="About Narendra Chapagain"
                className="relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 xl:w-80 xl:h-80 rounded-full object-cover border-4 border-gray-800 shadow-2xl cursor-pointer"
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-cyan-500/20"
              />
            </div>
          </motion.div>

          {/* About Text */}
          <motion.div
            variants={container}
            className="flex-1 w-full space-y-5 sm:space-y-6"
          >
            {/* Mobile profile image */}
            <div className="flex justify-center md:hidden mb-2">
              <div className="relative">
                <motion.div
                  animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur-xl opacity-30"
                />
                <img
                  src={profileImg}
                  alt="Narendra Chapagain"
                  className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-gray-800 shadow-2xl"
                />
              </div>
            </div>

            {/* Main About Card */}
            <motion.div
              variants={slideInRight}
              whileHover={{
                borderColor: "rgba(34, 211, 238, 0.5)",
                boxShadow: "0 0 30px rgba(34, 211, 238, 0.1)",
              }}
              transition={{ duration: 0.3 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 sm:p-6 lg:p-8 hover:border-cyan-500/30 transition-all duration-300"
            >
              <motion.h3
                variants={itemFadeUp}
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-4 sm:mb-5"
              >
                I'm{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Narendra Chapagain
                </span>
              </motion.h3>

              {/* Paragraph 1 */}
              <motion.p
                variants={itemFadeUp}
                className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4"
              >
                A{" "}
                <span className="text-cyan-400 font-semibold">
                  BSc.CSIT graduate
                </span>{" "}
                who moves fast across stacks — React on the web, Flutter on
                mobile. I don't wait to learn —{" "}
                <span className="text-white font-medium">I build to learn.</span>
              </motion.p>

              {/* Paragraph 2 */}
              <motion.p
                variants={itemFadeUp}
                className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4"
              >
                I've shipped real products — asset management systems, company
                websites, and mobile apps — while still in college. My sweet
                spot is turning designs into clean, functional interfaces that
                users actually enjoy.
              </motion.p>

              {/* Paragraph 3 */}
              <motion.p
                variants={itemFadeUp}
                className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4"
              >
                I work directly from{" "}
                <span className="text-cyan-400 font-semibold">Figma</span> — no
                back-and-forth, just pixel-perfect output. Whether it's a web
                app or a mobile screen, I care about the details that make the
                difference.
              </motion.p>

              {/* Paragraph 4 — CTA */}
              <motion.p
                variants={itemFadeUp}
                className="text-white font-semibold text-sm sm:text-base"
              >
                Open to frontend roles & freelance projects — if you need
                someone hungry, adaptable, and fast,{" "}
                <span className="text-cyan-400">let's talk.</span>
              </motion.p>
            </motion.div>

            {/* Education Card */}
            <motion.div
              variants={itemFadeUp}
              whileHover={{
                borderColor: "rgba(34, 211, 238, 0.5)",
                boxShadow: "0 0 30px rgba(34, 211, 238, 0.1)",
                y: -5,
              }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-4 sm:p-5 lg:p-6 hover:border-cyan-500/30 transition-all duration-300"
            >
              <motion.h3
                variants={itemFadeUp}
                className="text-base sm:text-lg lg:text-xl font-bold text-white mb-3 flex items-center gap-2"
              >
                <motion.svg
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </motion.svg>
                Education
              </motion.h3>

              <motion.p
                variants={itemFadeUp}
                className="text-gray-400 text-sm sm:text-base leading-relaxed"
              >
                <span className="text-gray-300 font-semibold">
                  Bachelor of Science in Computer Science and Information
                  Technology (BSc. CSIT)
                </span>
                <br />
                <span className="text-gray-500">Tribhuvan University</span>
                <br />
                {/* <motion.span
                  animate={{ color: ["#22d3ee", "#06b6d4", "#22d3ee"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-cyan-400 font-semibold"
                >
                  2021 - Present
                </motion.span> */}
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 sm:p-6 lg:p-8 hover:border-cyan-500/30 transition-all duration-300 mb-10 sm:mb-12"
        >
          <motion.h3
            variants={itemFadeUp}
            className="text-xl sm:text-2xl font-bold text-white mb-5 sm:mb-6 text-center"
          >
            Skills &{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Technologies
            </span>
          </motion.h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{
                  scale: 1.08,
                  y: -6,
                  boxShadow: "0 20px 25px -5px rgba(34, 211, 238, 0.3)",
                }}
                className="bg-gradient-to-br from-cyan-500/10 to-purple-600/10 border border-cyan-500/20
                           px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-center text-gray-300
                           text-xs sm:text-sm font-medium
                           hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20
                           transition-all duration-300 cursor-pointer relative overflow-hidden group"
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={container}
          className="flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center"
        >
          {/* Download CV */}
          <motion.button
            variants={itemFadeUp}
            whileHover={{
              scale: 1.06,
              y: -5,
              boxShadow: "0 20px 25px -5px rgba(34, 211, 238, 0.4)",
            }}
            whileTap={{ scale: 0.94 }}
            onClick={handleDownloadCV}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5
                       bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-xl
                       shadow-lg cursor-pointer group relative overflow-hidden text-sm sm:text-base"
          >
            <motion.svg
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </motion.svg>
            <span className="group-hover:translate-x-0.5 transition-transform">
              Download CV
            </span>
          </motion.button>

          {/* Let's Work Together */}
          <motion.a
            href="#contact"
            variants={itemFadeUp}
            whileHover={{
              scale: 1.06,
              y: -5,
              borderColor: "rgba(34, 211, 238, 0.8)",
              boxShadow: "0 20px 25px -5px rgba(34, 211, 238, 0.2)",
            }}
            whileTap={{ scale: 0.94 }}
            className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5
                       border border-gray-700 text-gray-300 font-bold rounded-xl text-sm sm:text-base
                       hover:bg-gray-800 hover:text-white hover:border-cyan-500/50 transition-all cursor-pointer group"
          >
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨
            </motion.span>
            Let's Work Together
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}

export default About;
