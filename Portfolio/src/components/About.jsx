import React from 'react'

function About() {
  return (
    <>
    <section id="about" className='min-h-screen px-6 md:px-20 pt-28 pb-16  flex flex-col justify-center'>
      <h1 className='text-4xl font-bold text-gray-800 text-center mb-15'>
        About <span className='text-blue-600'>Me</span>
      </h1>
        <div className='flex flex-col md:flex-row item-center gap-10'>
          <div className='flex flex-1 justify-center '>
            <img className='w-64 h-64 md:w-72 md:h-72  rounded-full object-cover shadow-xl  bg-gray-300'
             src="" alt="About image" />
          </div>
          <div className=' flex-1 space-y-4 items-center justify-center '>
            <h2 className='text-3xl font-semibold text-gray-800'> I'm 
              <span className='text-blue-600'> Narendra chapagain</span>
            </h2>
            <p className='text-gray-600 leading-relaxed'>
              A passionate <strong> frontend developer</strong> and a final-year Computer Science student.
               I love crafting smooth, responsive, and modern web interfaces using <strong> React, JavaScript,
                 Tailwind CSS,</strong> 
                 and other frontend technologies.
            </p>
            <p className='text-gray-600 leading-relaxed '>
              My background in UI/UX tools like <strong> Figma, Photoshop and Canva </strong> helps me combine design
               thinking with clean code. I enjoy transforming ideas into real projects that look great and work flawlessly.
            </p>
            <div className=''>
              <h3 className='text-xl font-semibold text-gray-800 mb-2 '>Skills</h3>

              <ul className=' grid grid-clos-2 md:grid-cols-3 gap-2 text-gray-700'>
                <li className='bg-blue-100 px-3 py-2 rounded-lg'> Html</li>
                <li className='bg-blue-100 px-3 py-2 rounded-lg'> CSS / Tailwind</li>
                <li className='bg-blue-100 px-3 py-2 rounded-lg'> JavaScript</li>
                <li className='bg-blue-100 px-3 py-2 rounded-lg'> React</li>
                <li className='bg-blue-100 px-3 py-2 rounded-lg'> Git & Github</li>
                <li className='bg-blue-100 px-3 py-2 rounded-lg'> Responsive Design</li>
              </ul>
            </div>
            <div>
              <h3 className='text-xl font-semibold text-gray-800 mt-4'>Education</h3>
              <p className='text-gray-600'>
                Bachelor of Science in Computer Science and Information Technology (BSc. CSIT) 
                <br /> Tribhuvan University 
                <br /> 2021-present
              </p>
            </div>
          </div>
        </div>
    </section>
    </>
  )
}

export default About
