import React, { useContext, useEffect, useState } from 'react'

import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../Firebase/Firebaseconfig'
import { Chatcontext } from '../Authcontext/Chatcontext'
import { Authcontext } from '../Authcontext/Authconfig'


export default function Messages() {
  const {currentuser} =  useContext(Authcontext)
  const {data} = useContext(Chatcontext)
  const [messages, setmessages] = useState([])
  

  
  useEffect(() => {
    const get  =()=>{
      const unsub = onSnapshot(doc(db,"chats",data.chatId),
    (doc)=>{
      doc.exists() && setmessages(doc.data().message) 
    })
    return()=>{
      unsub()
    }
    }
    data.chatId && get()
  }, [data.chatId])
  
  return (
    <div>
      
   {messages.map((m)=>{
     return(
       
       <div className='mr-3 flex flex-row-reverse gap-2 mt-6 ' >
         <div  className='flex'>
          <img className='w-5 h-5 rounded-full' src={m.senderId === currentuser.uid ? currentuser.photoURL : data.user.photoURL} alt="" />
         </div>
         <div className='w-auto  px-2 rounded-md bg-slate-100'>{m.text}</div>
         <div>
          {m.image && <img src={m.image} alt=''/>}
         </div>
      </div>
     )
    
         })} 
       
    </div>
  )
}
