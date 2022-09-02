import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import Signup from './pages/signup/Signup.jsx'
import Login from './pages/login/Login.jsx'

import UserContext from './Contexts/UserContext'
import React, { useState, useContext, useEffect } from 'react';

import OthersProfile from "./pages/othersProfile/OthersProfile";
import Feed from './components/feed/Feed'


export default function App() {

  // Global state for our context provider
  const { userInfo, setUserInfo } = useContext(UserContext)

  useEffect(() => {
    fetch('http://localhost:5500/rest/users/isAuth', {
      method: 'GET',
      credentials: 'include', // Don't forget to specify this if you need cookies
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    })
    .then(res => res.json())
    .then(res => {
      setUserInfo({...res})
    })
    .catch(error => console.log(error));
  } ,[]);


  return (
    <BrowserRouter>
      {userInfo.user_id ? <Navbar /> : null}
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/home' element={userInfo.user_id ? <Home /> : <Login/>}></Route>
        <Route path='/profile' element={userInfo.user_id ? <Profile /> : <Login/>}></Route>
        <Route path='/profile/:id' element={userInfo.user_id ? <OthersProfile /> : <Login />}></Route>
        {/* <Profile /> */}
        {/* <Home /> */}
      </Routes>
    </BrowserRouter>

  )
}
