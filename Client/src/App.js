import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const [value, setValue] = useState(null);
  useEffect(()=>{
    axios.get('/user')
      .then(res => {
        console.log(res.data.rows, "????");
        setValue(res.data.rows)
      })
      .catch(err => console.log(err))
      });
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>{JSON.stringify(value)}</div>
        {value && value.map((row, index) => 
          <div key={index}>{row.firstname}</div>
        )}
      </header>
    </div>
  );
}

export default App;
