import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: '7a607e7a-8f07-4c6a-b770-605201d69ae0',
        name: formData.name,
        email: formData.email,
        message: formData.message,
      }),
    });

    const data = await res.json();

    if (data.success) {
      Swal.fire({
        title: 'Message Sent!',
        text: "Thanks for reaching out! I'll get back to you soon.",
        icon: 'success',
        background: '#111827',
        color: '#fff',
        confirmButtonColor: '#06b6d4',
      });
      setFormData({ name: '', email: '', message: '' });
    } else {
      Swal.fire({
        title: 'Something went wrong',
        text: 'Please try again later.',
        icon: 'error',
        background: '#111827',
        color: '#fff',
        confirmButtonColor: '#ef4444',
      });
    }
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.14, delayChildren: 0.25 }
    }
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="contact" className="min-h-screen py-16 sm:py-20 bg-gray-950 relative overflow-hidden">

      {/* Background blobs */}
      <motion.div
        className="absolute top-20 left-10 w-72 sm:w-96 h-72 sm:h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10"
        animate={{ scale: [1, 1.08, 1], x: [0, 15, 0], y: [0, -10, 0] }}
        transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-64 sm:w-80 h-64 sm:h-80 bg-purple-600/10 rounded-full blur-3xl -z-10"
        animate={{ scale: [1, 1.1, 1], x: [0, -12, 0], y: [0, 15, 0] }}
        transition={{ duration: 14, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 2 }}
      />

      {/* ── Same container as NavBar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">

        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.h2
            variants={itemFadeUp}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4"
          >
            Get In{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
              Touch
            </span>
          </motion.h2>
          <motion.p
            variants={itemFadeUp}
            className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-xl sm:max-w-2xl mx-auto px-4"
          >
            Have a project in mind? Looking to collaborate or just want to say hi? Feel free to drop a message.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 items-center">

          {/* Left — Image (hidden on mobile) */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="hidden md:flex justify-center items-center"
          >
            <img
              src="https://images.unsplash.com/photo-1555066931-bf19f8fd1085?auto=format&fit=crop&q=80"
              alt="Person coding on laptop - dark aesthetic"
              className="w-full max-w-sm lg:max-w-md xl:max-w-lg rounded-2xl shadow-2xl opacity-90 object-cover"
            />
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={container}
            className="w-full"
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-5 sm:space-y-6 bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-2xl p-5 sm:p-7 lg:p-8 xl:p-10"
            >
              {/* Name */}
              <motion.div variants={itemFadeUp}>
                <label className="block text-gray-300 text-sm sm:text-base font-medium mb-1.5 sm:mb-2">
                  Your Name
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-xl text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300"
                />
              </motion.div>

              {/* Email */}
              <motion.div variants={itemFadeUp}>
                <label className="block text-gray-300 text-sm sm:text-base font-medium mb-1.5 sm:mb-2">
                  Email Address
                </label>
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-xl text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300"
                />
              </motion.div>

              {/* Message */}
              <motion.div variants={itemFadeUp}>
                <label className="block text-gray-300 text-sm sm:text-base font-medium mb-1.5 sm:mb-2">
                  Message
                </label>
                <motion.textarea
                  whileFocus={{ scale: 1.01 }}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Enter your message..."
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-xl text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/20 transition-all duration-300 resize-none"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.button
                variants={itemFadeUp}
                whileHover={{ scale: 1.04, y: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                type="submit"
                className="w-full py-3 sm:py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-cyan-500/40 transform transition-all duration-300 mt-2"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Contact;