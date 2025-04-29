import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import './App.css'
import Navber from './Component/Navber'
import HeroSection from './Component/HeroSection'
import ClientRv from './Component/ClientRv'
import Conatct from './Component/Conatct'
import Footer from './Component/Footer'
import Login from './Component/Login'
import Notepad from './Component/NoteComponent/Notepad'
import HelpPage from './Component/NoteComponent/HelpPage'
// import SmartEditor from './Component/NoteComponent/SmartEditor'

function Layout() {
  const location = useLocation();
  const isUserPage = location.pathname === "/notepad";

  return (
    <>
      {!isUserPage && <div className='mt-9'>
        <Navber/></div>}
      <Routes>
        <Route path="/" element={
          <div className="container mx-auto px-8 mt-9">
            <HeroSection />
            <div className='mt-[-200px] '>
              <ClientRv />
              <Conatct />
            </div>
          </div>
        } />
        <Route path="/feature" element={<ClientRv />} />
        <Route path="/contact" element={<Conatct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notepad" element={<Notepad />} />
        <Route path="/help" element={<HelpPage/>} />

      </Routes>
      {!isUserPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
