import React from 'react'
import { useState } from 'react'

function NavBar() {
  const navItems=[
    {name:"Home",link:"#home"},
    {name:"About",link:"#about"},
    {name:"Project",link:"#Project"},
    {name:"Contact",link:"#contact"}
  ]
  const [Open, setOpen] = useState(false)
  return (
    <>
    <nav className='bg-blue-300 w-full shadow-md fixed top-0 left-0 '>
        <div className=' flex justify-between p-4'>
            <h1 className=' font-bold text-2xl text-gray-800'>Narendra chapagain</h1>
            <div className='hidden md:flex space-x-6 text-gray font-medium'>
              {navItems.map((item)=>{
                return(
                <a key={item.name} href={item.link} className='mx-3 text-gray-600 hover:text-blue-600'>
                  {item.name}
                </a>)
              })}
            </div>
            <button className='md:hidden text-gray-700 border px-2 py-1 rounded'
            onClick={()=>setOpen(!Open)}>
              {Open?"Close":"Menu"}
            </button >
        </div>
            {Open &&(
              <div className=' bg-blue-100 py-4 px-5 space-y-4 text-gray-800 text-lg flex flex-col'>
                  {navItems.map((item)=>(
                   <a key={item.name} href={item.link}>{item.name}</a> 
                  ))}
              </div>
            )}
        
    </nav>
    </>
  )
}

export default NavBar
