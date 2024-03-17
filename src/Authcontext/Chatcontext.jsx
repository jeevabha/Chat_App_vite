import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { auth } from "../Firebase/Firebaseconfig";
import { Authcontext } from "./Authconfig";


export const Chatcontext =  createContext()
export const ChatcontextProvider = ({children})=>{
  const {currentuser} =  useContext(Authcontext)
    const INITIAL_STATE = {
      chatID:"null",
      user:{}
    }

    const chatReducer = (state,action)=>{
      switch (action.type) {
        case "CHANGE_USER":
          return{
            user:action.payload,
            chatId : currentuser.uid > action.payload.uid ? currentuser.uid + action.payload.uid : action.payload.uid + currentuser.uid 
          } 
          default:
            return state;
      }
    }
   
      const [state,dispatch] = useReducer(chatReducer,INITIAL_STATE)
     
  return(
    <Chatcontext.Provider value={{data:state , dispatch}}>
        {children}
    </Chatcontext.Provider>
  )
}