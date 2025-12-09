import React from 'react'

function Project() {
  const Projects=[
    {
      title:"AssetTrack",
      desc:"Intengible fixed asset tracking system ",
      tech:["React","Tailwind CSS",".Net"]
    },
    {
      title:"Weather App",
      desc:"A simple and clean weather application made with React and API integration",
      tech:["React","CSS","API"]
    },
    {
      title:"Todo App",
      desc:"A daily task management tool with local Storage support.",
      tech:["React","JavaScript","Tailwind CSS"]
    }
  ]
  return (
    <section id="projects"
    className='min-h-screen px-6 md:px-20 pt-28 pb-16'>
        <h1 className='text-gray-800 font-bold text-4xl text-center mb-10'>
          My <span className='text-blue-600'>Projects</span></h1>

          <div className='  grid md:grid-cols-3 gap-8'>

            {Projects.map((item,index)=>(
              <div key={index}
              className='p-6 bg-blue-50 shadow rounded-xl hover:translate-y-3 hover:shadow-lg transition'>
                  <h2 className='text-2xl font-semibold text-gray-800'>{item.title}</h2>
                  <p className='text-gray-600 mt-2'>{item.desc}</p>
                  <div className='flex flex-wrap gap-2 mt-4'>
                    {item.tech.map((t,i)=>(
                      <span key={i}
                      className='px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm'>
                        {t}
                      </span>
                    ))}
                  </div>
              </div>
            ))}
          </div>

    </section>
  )
}

export default Project
