import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import Signup from './pages/signup/Signup.jsx'
import Login from './pages/login/Login.jsx'

import UserContext from './Contexts/UserContext' 
import React, { useState, useContext } from 'react';

import OthersProfile from "./pages/othersProfile/OthersProfile";


export default function App() {

  // Global state for our context provider
  const { userInfo } = useContext(UserContext)



  return (
    <BrowserRouter>
        {userInfo.user_id ? <Navbar /> : null}
        <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path = '/signup' element={<Signup/>}></Route>
            <Route path = '/home' element = {<Home/>}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/profile/:id' element={<OthersProfile />}></Route>
            {/* <Profile /> */}
            {/* <Home /> */}
        </Routes>
    </BrowserRouter>

  )
}
