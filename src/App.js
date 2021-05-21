import React from 'react';

import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import Login from './Components/Login'
import Details from './Components/Details.js'
import { BrowserRouter as Router , Route, Switch,  } from "react-router-dom";
 
function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route  path="/detail/:id">
            <Details />
          </Route>
          <Route  path="/home">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
