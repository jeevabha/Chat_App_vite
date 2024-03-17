import React, { useContext } from 'react'
import Messages from './Messages'
import Input from './Input'
import { BiLogOutCircle } from "react-icons/bi";
import { auth } from '../Firebase/Firebaseconfig';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Chatcontext } from '../Authcontext/Chatcontext';


export default function  Chat() {
  const {data} =  useContext(Chatcontext)
  console.log(data);
  
  const navigaet = useNavigate()
  const getout = ()=>{
    signOut(auth)
    navigaet('/login')
  }
  return (
    <div className=' flex  flex-col flex-1 bg-white rounded-r-xl

    '>
        <div className= ' h-[2.5rem] w-[100%] px-3  flex items-center justify-between'>
  
            <div>{data.user.displayName?data.user.displayName:"No Chat"}</div>
            <button onClick={getout}><BiLogOutCircle style={{ color: 'black' }} size={25}/></button>
        </div>
        <div className='flex justify-end mr-3   overflow-auto  w-[100%] h-[19.5rem]'>
          <Messages/>
        </div>
        <div className=''>
          <Input/>
        </div>
    </div>
  )
}
