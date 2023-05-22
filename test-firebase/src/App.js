import logo from './logo.svg';
import './App.css';
import LoginForm2 from './components/LoginForm2';
import MAIN from './components/MAIN';
import HOME from './components/HOME';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<LoginForm2/>}/>
        <Route path='/main' element={<MAIN/>}/>
        <Route path='/HOME' element={<HOME/>}/>
        
        
      </Routes>
    </div>
  );
}

export default App;
