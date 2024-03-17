import React, { useContext, useState } from 'react'
import { collection,doc,getDoc,getDocs,query,serverTimestamp,setDoc,updateDoc,where } from "firebase/firestore";
import { db } from '../Firebase/Firebaseconfig';
import { CiSearch } from "react-icons/ci";
import { Authcontext } from '../Authcontext/Authconfig';


export default function Search() {
  const [user, setuser] = useState(null)
  const [username, setusername] = useState()
  const {currentuser} = useContext(Authcontext)
  

  const handlesearch = async()=>{
    try {
      const q = query(collection(db, "users"), where("displayName", "==", username));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setuser(doc.data())
      })
    } catch (error) {
      console.log(error);
    }
  }
  
  const handleclick = ()=>{handlesearch()}


  const handleselect = async()=>{
    
    const combinedId =  currentuser.uid > user.uid ? currentuser.uid + user.uid : user.uid + currentuser.uid;
      try {
        const res =  await getDoc(doc(db,"chats",combinedId))
        if(!res.exists()){
          await setDoc(doc(db,"chats",combinedId),{message:[]})
          

          await updateDoc(doc(db,"userChat",currentuser.uid),{
            [combinedId+".userInfo"]:{
              uid:user.uid,
              displayName:user.displayName,
              photourl:user.photourl,
            },
            [combinedId+".date"]:serverTimestamp()
          })

          await updateDoc(doc(db,"userChat",user.uid),{
            [combinedId+".userInfo"]:{
              uid:currentuser.uid,
              displayName:currentuser.displayName,
              photoURL:currentuser.photoURL,
            },
            [combinedId+".date"]:serverTimestamp()
          })
        }
        setuser(null)
        setusername('')
      } catch (error) {
        console.log(error);
      }
  }
  

  return (
    <div>
       <div className='flex mx-3 mt-3 '>
       <div className=''>
            <input type="text" 
            placeholder='Search...'
            value={username}
            onChange={e=>setusername(e.target.value)}
            className='px-3 border rounded-full bg-[#C7C8CC]  py-1 w-[11rem]'  />
        </div>

        <div className='cursor-pointer mt-[8px] ml-1' >
        <CiSearch onClick={handleclick} size={20}/>
        </div>
        
       </div>
       {user &&  <div className='mt-4 flex gap-1 cursor-pointer 
       hover:bg-[#FF407D] rounded-full mx-1 px-2 py-1 ' >
        <img src={user.photourl}   alt="photo" className='flex mt-1 w-5 h-5 rounded-full ' />
         <div className='' onClick={handleselect}>{user.displayName}</div> 
        </div>}
    </div>
  )
}

