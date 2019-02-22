import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import HousesList from './components/HousesList';
import HouseDetails from './components/HouseDetails';
import Error from './components/Error';
import Nav from './components/Nav';

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <>
            <Nav />
            <Switch>
              <Route exact path="/" />
              <Route exact path="/home" component={Home} />
              <Route exact path="/api/houses" component={HousesList} />
              <Route exact path="/api/houses/:house_id" component={HouseDetails} />
              <Route component={Error} />
            </Switch>
          </>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
