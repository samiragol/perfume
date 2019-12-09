// https://medium.com/better-programming/building-basic-react-authentication-e20a574d5e71

import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Home from './pages/Home';
import Admin from './pages/Admin';
import {AuthContext} from "./context/auth";
import PrivateRoute from "./PrivateRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const [value, setValue] = useState(null);
  const [authTokens, setAuthTokens] = useState();
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }
  useEffect(()=>{
    axios.get('/user')
      .then(res => {
        console.log(res.data.rows, "????");
        setValue(res.data.rows)
      })
      .catch(err => console.log(err))
      });
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* <div>{JSON.stringify(value)}</div>
          {value && value.map((row, index) => 
            <div key={index}>{row.firstname}</div>
          )} */}
          <Router>
          <div>
          <div><Link to='/'>Home Page</Link> </div>
        <div><Link to="/admin">Admin Page </Link></div>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/admin" component={Admin} />
          </div>
        </Router>
        </header>
      </div>
    </AuthContext.Provider>
    
  );
}

export default App;
