import React, { Component } from 'react';
import './App.css';

import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { Navbar, Nav, Grid, Row } from 'react-bootstrap';

import { HomePage } from './pages/HomePage';
import { FoodPage } from './pages/FoodPage';
import { RestaurantPage } from './pages/RestaurantPage';

class App extends Component {
  render() {
    return (
        <div>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Skip the Line</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>

                </Nav>
            </Navbar>;
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route path='/food' component={FoodPage}/>
                    <Route path='/restaurant' component={RestaurantPage} />
                    <Route path='/order' component={HomePage}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
  }
}

export default App;
