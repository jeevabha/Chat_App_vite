import image from "../assets/search.png";
import image1 from "../assets/3d-portrait-people.jpg";
import image2 from "../assets/profile.png";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import { useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth, db, storage } from "../Firebase/Firebaseconfig";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {

    const navigaet = useNavigate()
    const [toggle, settoggle] = useState(false)
    const [imageurl, setimageurl] = useState('')
    const functoggle = () =>{settoggle(!toggle)}
    const [create, setcreate] = useState({
        email:"",
        password:"",
    })

   // hooks
   const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

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
      return <div role="status" className="max-w-sm animate-pulse flex justify-center items-center">
      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
      <span className="sr-only">Loading...</span>
  </div>
    }

      const handelselect = async(e)=>{
      e.preventDefault()
         const res = await signInWithEmailAndPassword(create.email,create.password) 
         navigaet("/")      
      }

  return (

      <div className="w-full flex justify-center items-center ">
        
          <div className="flex md:w-[25rem] lg:w-[25rem] min-h-full flex-col justify-center px-8 py-12 lg">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 ">
              Login in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handelselect} >
              <div>
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
                  Login 
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
          <Link to={"/register"} className="mt-6 flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 border shadow-md hover:bg-[#f3f3f3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
            Register
          </Link>
        </div>
       <div className="hidden lg:block">
        <img src={image1} alt="" className="w-[25rem] h-[35rem] rounded-md flex justify-center items-center "/>
       </div>
      </div>
    )
  }
  
  