import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';

import NavBar from "./components/NavBar";
import PrintBill from "./components/PrintBill";


// import ImportXlsx from "./components/importXlsx";

class App extends Component {

  render() {
    return (
      <div className="App">

      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={NavBar}></Route>
          <Route path="/print" component={PrintBill}></Route>
        </Switch>
      </BrowserRouter>

      </div>
    )
  }
}

export default App;