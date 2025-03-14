import React from 'react'
import './App.css';
import {Route,BrowserRouter,Routes} from 'react-router-dom';

import {Sender} from './components/Sender';
import {Receiver} from './components/Reciever';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/sender' element={<Sender/>}/>
        <Route path='/reciever' element={<Receiver/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
