import React from 'react'
import Navbar from './Navbar'
import Search from './Search'
import Chats from './Chats'

export default function Sidebar() {
  return (
    <div className='flex w-[15rem]  px-3 rounded-l-xl py-1  bg-[#EEEEEE]'>
        <div className=''>
            <Navbar/>
            <Search/>
            <Chats/>  
        </div>
    </div>
  )
}
