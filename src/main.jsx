import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthcontextProvider } from './Authcontext/Authconfig.jsx'
import { ChatcontextProvider } from "./Authcontext/Chatcontext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthcontextProvider>
    <ChatcontextProvider>
      <React.StrictMode>
         <App />
      </React.StrictMode>
    </ChatcontextProvider>
    </AuthcontextProvider> 
)
