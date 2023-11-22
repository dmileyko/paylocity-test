import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Profile from './pages/profile/Profile';
import Benefits from './pages/benefits/Benefits';
import Home from './pages/home/Home';

const App: React.FC = () => {   
  return (
     <div>
        {/* Navbar */}
        <Navbar />

        {/* Wrapper */}
        <div className="wrapper">
           <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/benefits" element={<Benefits />} />
           </Routes>
        </div>
     </div>
  );
};

export default App;