import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


function App() {
  const [Activities, setActivities]= useState();

  useEffect (()=>{
    axios.get('http://localhost:5000/api/activities')
    .then(resoponse=>{
      console.log(resoponse);
      setActivities(resoponse.data)
    })
  },[])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

      
      </header>
    </div>
  );
}

export default App;
