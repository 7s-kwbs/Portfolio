import React from 'react'

function Contact() {
  return (
    <section id="contact"
    className='min-h-screen px-6 md:px-20 pt-28 pb-16 flex flex-col items-center'>
      <h1 className='text-4xl font-bold text-gray-800 text-center mb-8'>
        Contact <span className='text-blue-600'> Me</span>
      </h1>
      <p className='text-gray-600 text-center max-w-xl mb-10'>
        Feel free to reach out for collaborations, Projects or just to say hi!
      </p>
      <form  className='w-full max-w-lg bg-white p-6 rounded-lg shadow space-y-4'>
       <div>
         <label className='block text-gray-700 font-medium'>Your Name</label>
         <input className='w-full border px-4 py-2 rounded mt-1 focus:outline-none focus:border-blue-500' 
         placeholder='Enter your Name' type="text" />
       </div>
       <div>
         <label className='block text-gray-700 font-medium'>Email</label>
         <input className='w-full border px-4 py-2 rounded mt-1 focus:outline-none focus:border-blue-500' 
         placeholder='Enter your email' type="Email" />
       </div>
       <div>
        <label className='block text-gray-700 font-medium'>Message</label>
        <textarea
        className='w-full border px-4 py-2 rounded mt-1 focus:outline-none focus:border-blue-500'
        placeholder='Write your message...'>
        </textarea>
       </div>
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition">
          Send Message
        </button>
      </form>
      <div>
        <p className='text-gray-700 mt-2'>Email:
          <a className='text-blue-600 pl-2' 
          href="https://mail.google.com/"
          target='-blank'
          rel="noopener noreferrer">hunterkwbs@gmail.com</a>
        </p>
        <p className='text-gray-700 mt-2'>Github:
          <a className='text-blue-600 pl-2' 
          href="https://github.com/7s-kwbs"
          target='-blank'
          rel="noopener noreferrer"
          >github.com/7s-kwbs</a>
        </p>
        <p>LinkedIn
          <a className='text-blue-600 pl-2'
           href="https://www.linkedin.com/in/narendra-chapagain-5b138b25a/"
           target='-blank'
           rel="noopener noreferrer">linkedin.com/in/narendra-chapagain</a>
        </p>
      </div>
    </section>
  )
}

export default Contact
