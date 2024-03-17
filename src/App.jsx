import { BrowserRouter as Router , Routes,Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { useContext } from "react";
import { Authcontext } from "./Authcontext/Authconfig";
// import { Authcontext, AuthcontextProvider } from "./Authcontext/Authconfig";

export default function App() {
  const {currentuser}  = useContext(Authcontext)
  // const protect = ({children}) => {
  //   if(!currentuser){
  //     return <Navigate rti/>
  //   }
  // }
  
  return (
    <Router>
      <Routes>
          <Route path="/"  element={currentuser? <Home /> : <Login/>}/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
      </Routes>
    </Router>
  )
}
