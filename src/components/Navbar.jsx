import React, { useContext } from 'react'
import { Authcontext } from '../Authcontext/Authconfig'

export default function Navbar() {
  const {currentuser}  = useContext(Authcontext)
  
  return (
    <div>
      <div className='flex items-center gap-2 mt-2'>
        <img src={currentuser.photoURL} className='w-6 h-6 rounded-full' alt="" />
        {currentuser.displayName}
      </div>
    </div>
  )
}
