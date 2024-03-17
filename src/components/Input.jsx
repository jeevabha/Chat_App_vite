import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { MdAddPhotoAlternate } from "react-icons/md";
import { db, storage } from '../Firebase/Firebaseconfig';
import { v4 } from "uuid";
import { Authcontext } from '../Authcontext/Authconfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Chatcontext } from '../Authcontext/Chatcontext';

export default function Input() {
  const [text, settext] = useState('')
  const [image, setimage] = useState()
  const {currentuser} =  useContext(Authcontext)
  const {data} = useContext(Chatcontext)

   const handlesend = async()=>{
     if(image){
      const storageRef = ref(storage,v4());

      const uploadTask = uploadBytesResumable(storageRef, image);
  
       uploadTask.on(
        (error) => {
          console.log(error);
        }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
        await updateDoc(doc(db,"chats",data.chatId),{
          message:arrayUnion({
            id:v4(),
            image:downloadURL,
            text,
            senderId:currentuser.uid,
            date:Timestamp.now()
          })
        })
       
      });
    }
  );   
     }else{
      await updateDoc(doc(db,"chats",data.chatId),{
        message:arrayUnion({
          id:v4(),
          text,
          senderId:currentuser.uid,
          date:Timestamp.now()
        })
      })
     }
     await updateDoc(doc(db,"userChat",currentuser.uid),{
      [data.chatId+".lastMessage"]:{
        text
      },
      [data.chatId+".date"]:serverTimestamp()
     })
     await updateDoc(doc(db,"userChat",data.user.uid),{
      [data.chatId+".lastMessage"]:{
        text
      },
      [data.chatId+".date"]:serverTimestamp()
     })
     settext('')
     setimage(null)
   }

  return (
    <div className='flex  '>
         <div className='h-[2.2rem] w-[100%] rounded-3xl mx-4  px-3 bg-[#C7C8CC] shadow-sm flex items-center justify-between'>
            <div>
                <input type="text" 
                placeholder='Message...'
                value={text}
                onChange={e=>settext(e.target.value)}
                className=' bg-[#C7C8CC]  outline-none px-2' />
            </div>
            <div className='flex items-center'>
                <input type="file" id='photo'
                onChange={e=>setimage(e.target.files[0])}
                className='hidden'/>
                <label htmlFor="photo" className='cursor-pointer mr-1'>
                <MdAddPhotoAlternate size={20}/>
                </label>
                <button onClick={handlesend}>send</button>
            </div>
        </div>
    </div>
  )
}
