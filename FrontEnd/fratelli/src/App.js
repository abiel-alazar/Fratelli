import './App.css';
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';
import Services from './components/Services';
import Upcoming from './components/Upcoming';
import AdminHome from './components/AdminComponents/AdminHome';
import AdminUpcoming from './components/AdminComponents/AdminUpcoming';
import React, { useState } from 'react';
import jwt_decode from 'jwt-decode'
import AdminNav from './components/AdminComponents/AdminNav';
import AdminMessages from './components/AdminComponents/AdminMessages';
import Global from './components/GlobalContext';
import EditService from './components/AdminComponents/EditService';
import Reservation from './components/Reservation';
import AdminBooked from './components/AdminComponents/AdminBooked';
import videoBG from './videos/Dj.mp4'
import AdminRoute from './components/AdminComponents/AdminRoute';


function App() {
  const [token, setToken] = React.useState("")
  const [user, setUser] = React.useState("")
  const [nav, setNav] = React.useState(true)

  
  React.useEffect(() => {
    const exist = JSON.parse(localStorage.getItem('token'))

      if(exist){
        const decoded = jwt_decode(exist)
        setUser(decoded)
        setToken(exist)
      }
   
  }, [])

  const passUser = (tk)=>{
    setUser(tk)
  }

  const passToken = (tk)=>{
    setToken(tk)
  }

  const navBar=()=>{
    setNav(false)
  }
 

  return (

    <div >
      <video src={videoBG} muted autoPlay loop/>
      <Global.Provider value={{ passUser, passToken , token, navBar}}>
        {user.role === "Admin" ? <AdminNav /> : <NavBar />}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/services" element={<Services />}></Route>
          <Route path="/upcoming" element={<Upcoming />}></Route>
          <Route path="/reservation" element={<Reservation />}></Route>
          <Route element={<AdminRoute/>}>
          <Route path="/adminhome" element={<AdminHome />}></Route>
          <Route path="/adminupcoming" element={<AdminUpcoming />}></Route>
          <Route path="/adminmessages" element={<AdminMessages />}></Route>
          <Route path="/editservice" element={<EditService />}></Route>
          <Route path="/booking" element={<AdminBooked/>}></Route>
          </Route>
        </Routes>
      </Global.Provider>
    </div>
  );
}

export default App;
