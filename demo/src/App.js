import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './compo/Home'
import Contact from './compo/Contact'
import About from './compo/About'
import Header from './compo/Header'
import Fetch from './compo/Fetch'
import Update from './compo/Update'
import Adminregister from './compo/Adminregister'
import Adminlogin from './compo/Adminlogin'

function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/contact' element={<Contact/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/fetch' element={<Fetch/>}></Route>
      <Route path='/update/:id' element={<Update/>}></Route>
      <Route path='/adminregister' element={<Adminregister/>}></Route>
      <Route path='/adminlogin' element={<Adminlogin/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
