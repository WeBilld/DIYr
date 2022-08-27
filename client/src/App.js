import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import Signup from './pages/signup/Signup.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
          <Route path='/profile/:id' element={<Profile />}></Route>
          {/* <Profile /> */}
          {/* <Home /> */}
      </Routes>
    </BrowserRouter>

  )
}
