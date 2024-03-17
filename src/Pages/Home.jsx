
import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

export default function Home() {
  return (
  <div className='bg-[#F5F7F8]'>
      <div className=' h-screen flex justify-center items-center'>
      <div className='flex  h-[25rem] w-[40rem]'>
      <Sidebar/>
      <Chat/>
    </div>
    </div>
  </div>
  )
}
