import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import HousesList from './components/HousesList';
import HouseDetails from './components/HouseDetails';
import Error from './components/Error';
import Nav from './components/Nav';
import AddHousesForm from './components/AddHousesForm';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Nav />
          <div>
            <Switch>
              <Route exact path="/" />
              <Route exact path="/home" component={Home} />
              <Route exact path="/houses" component={HousesList} />
              <Route exact path="/houses/:house_id" component={HouseDetails} />
              <Route exact path="/contribution" component={AddHousesForm} />
              <Route component={Error} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
