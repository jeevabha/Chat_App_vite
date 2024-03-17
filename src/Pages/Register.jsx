import image from "../assets/search.png";
import image1 from "../assets/3d-portrait-people.jpg";
import image2 from "../assets/profile.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, db, storage } from "../Firebase/Firebaseconfig";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {

    const navigaet = useNavigate()
    const [toggle, settoggle] = useState(false)
    const [imageurl, setimageurl] = useState('')
    const functoggle = () =>{settoggle(!toggle)}
    const [create, setcreate] = useState({
        name:"",
        email:"",
        password:"",
        photourl:""
    })

   // hooks
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
      ] = useCreateUserWithEmailAndPassword(auth);

     // error 
      if (error) {
        return (
          <div>
            <p>Error: {error.message}</p>
          </div>
        );
      }
    //  loading
      if (loading) {
        return <div className='h-screen flex justify-center mt-[7rem]'>
        <div className=' flex border h-[25rem] w-[40rem]'>
       
      </div>
      </div>
      }


      const handelselect = async(e)=>{
      e.preventDefault()
      
         const res =await createUserWithEmailAndPassword(create.email,create.password)

          const storageRef = ref(storage,create.name);

          const uploadTask = uploadBytesResumable(storageRef, create.photourl);
      
           uploadTask.on(
            (error) => {
              console.log(error);
            }, 
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
            await updateProfile(res.user,{
              displayName:create.name,
              photoURL:downloadURL
             })
             
             await setDoc(doc(db,"userChat",res.user.uid),{})
             
             await setDoc(doc(db,"users",res.user.uid),{
               displayName:create.name,
               email:create.email,
               uid:res.user.uid,
               photourl:downloadURL
              })
          });
        }
      ); 
        
     navigaet("/")      
      }

  return (

      <div className="w-full flex justify-center items-center ">
        
          <div className="flex md:w-[25rem] lg:w-[25rem] min-h-full flex-col justify-center px-8 py-12 lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handelselect} >
              <div>
                <input type="file"
                 id="file"
                 onChange={(e)=>setcreate({...create,photourl:e.target.files[0]})}
                 className="hidden"/>
              <label htmlFor="file" className="flex flex-col justify-center items-center">
              <img src={image2} alt="s" className="w-[4.5rem] mx-auto"/>
              add pic
              </label>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    onChange={(e)=>setcreate({...create,name:e.target.value})}
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                  />
                </div >
                <div className="mt-2">
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={(e)=>setcreate({...create,email:e.target.value})}
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                  />
                </div>
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm mr-3 cursor-pointer" onClick={functoggle}>
                    {toggle ?
                     <FaEye size={20} /> : <FaEyeSlash size={20} />}
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    onChange={(e)=>setcreate({...create,password:e.target.value})}
                    type={toggle? "password" : "text"}
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-insetsm:text-sm sm:leading-6"
                  />
                </div>
           
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <div className="flex items-center mt-6">
            <div className="grow border-b border-2"></div>
            <span className="shrink px-1 pb-1 mx-1">OR</span>
            <div className="grow border-b border-2"></div>
           </div>
           <label htmlFor="google" className="mt-6 flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 border shadow-md hover:bg-[#f3f3f3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
           <img src={image} id="google" alt="" className="w-5 h-5 mr-2" />
           Sign Up With Google
           </label>
          </div>
          <Link to={"/login"} className="mt-6 flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 border shadow-md hover:bg-[#f3f3f3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
            Login
          </Link>
        </div>
       <div className="hidden lg:block">
        <img src={image1} alt="" className="w-[25rem] h-[35rem] rounded-md flex justify-center items-center "/>
       </div>
      </div>
    )
  }
  
  