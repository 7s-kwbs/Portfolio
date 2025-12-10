import React from 'react'

function Hero() {
  return (
  <section
  id="home"
  className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 px-6 md:px-20 pt-28">
    
    <div className='flex-1 space-y-4'>
      <h1 className='text-4xl md:text-6xl font-bold text-gray-800 leading-tight'>Hi, I'm 
           <span className='text-blue-600'> Narendra chapagain</span>
        </h1>
        <h2 className='text-2xl md:text-3xl text-gray-700 font-medium'>Frontend Developer</h2>
        <p className='text-gray-600 max-w-xl'>
          I design and build clean, responsive and modern websites using 
          <span className='text-gray-800 font-semibold'> React,Tailwind CSS, javaScript,</span>
          and other frontend technologies.
          I love creating smooth UI/UX and turning ideas into beautiful web interfaces.
        </p>
        <p className='text-gray-600 max-w-xl'>
          Currently improving my full-stack skills and working on
           exciting personal projects. I enjoy solving problems and
            constantly learning new things in web development
        </p>
        <div className='gap-4 flex py-4'>

              <a className='bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-2xl '
                    href="#Project">
                     View Projects
              </a>

              <a className='border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition'
               href="#contact">Contact Me</a>

         </div>
    </div>
    <div className='flex-1 flex justify-center'>
      <img src="src\assets\1687862063834.jpg" alt="profile" 
      className='w-64 h-64 md:w-80 md:h-80 rounded-full shadow-lg object-cover bg-gray-200 '/>
    </div>
  </section>
  )
}

export default Hero
