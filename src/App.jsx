import React from 'react'
import NavBar from "./components/NavBar"
import Hero from "./components/Hero"
import About from './components/About'
import Project from './components/Project'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { useEffect } from 'react';
import AOS from 'aos';
import "aos/dist/aos.css"

function App() {
  useEffect(()=>{
    AOS.init({
      duration:1000,
      once:true,
      offset:80,
      easing:"ease-in-out"
    })
  },[]);
  return (
    <>
    <NavBar />
    <Hero />
    <About />
    <Project />
    <Contact />
    <Footer />
    </>
  )
}

export default App
