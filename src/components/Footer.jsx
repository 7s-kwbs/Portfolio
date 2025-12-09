import React from 'react'

function Footer() {
  return (
   <footer className='w-full py-4 text-center bg-gray-100 mt-10'>
    <p className='text-sm text-gray-500'> © 2025 Narendra Chapagain. All rights reserved.</p>
    <div className='flex justify-center gap-4 text-gray-500 text-sm mt-2'>
      <a
          href="https://github.com/7s-kwbs"
          target="_blank"
          className="hover:text-black"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/narendra-chapagain"
          target="_blank"
          className="hover:text-black"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="mailto:hunterkwbs@gmail.com "
          target="_blank"
          className="hover:text-black"
          rel="noopener noreferrer"
        >
          Email
        </a>
    </div>
   </footer>
  )
}

export default Footer
