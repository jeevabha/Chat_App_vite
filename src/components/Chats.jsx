import { doc, onSnapshot } from 'firebase/firestore'
import React, { useContext, useEffect, useState } from 'react'
import { db } from '../Firebase/Firebaseconfig'
import { Authcontext } from '../Authcontext/Authconfig'
import { Chatcontext } from '../Authcontext/Chatcontext'

export default function Chats() {
     const [chats, setchats] = useState([])
     const {currentuser} = useContext(Authcontext)

     const {dispatch} = useContext(Chatcontext)

     const handleselect = (u)=>{
      dispatch({type:"CHANGE_USER" , payload:u})
     }
     useEffect(() => {
      function getchat() {
        const unsub = onSnapshot(doc(db, "userChat", currentuser.uid), (val) => {
          setchats(val.data())
        
          return()=>{
          unsub()}
        
    });
     }
     currentuser.uid && getchat()
      }, [currentuser.uid])
      
      return (
        <div className=''>
            {Object.entries(chats)?.map((chat)=>(
              
               <div className='mt-2 flex gap-1 cursor-pointer 
               hover:bg-[#0099FF] rounded-full ' key={chat[0]} 
               onClick={()=>handleselect(chat[1].userInfo)}
               >   
  
           <div className=' w-[11rem] mx-2 px-3 py-1 overflow-auto'>
           <span className='  cursor-pointer overflow-hidden'>{chat[1].userInfo.displayName}</span>
           <p className='text-[0.6rem] ml-2 overflow-hidden'>{chat[1].lastMessage?.text}</p>
           </div>
    
          </div>)
          )}
        </div>
      )
}
