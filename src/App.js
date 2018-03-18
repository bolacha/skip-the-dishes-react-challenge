import React, { Component } from 'react';
import './App.css';

import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { Navbar, NavItem, Nav, Badge } from 'react-bootstrap';

import { HomePage } from './pages/HomePage';
import { FoodPage } from './pages/FoodPage';
import { RestaurantPage } from './pages/RestaurantPage';
import { LoginPage } from './pages/LoginPage';
import { LogoutPage } from './pages/LogoutPage';

import { Provider } from 'react-redux'
import { createStore, compose } from 'redux';

import persistState from 'redux-localstorage'
import rootReducer from './reducers'

const store = createStore(rootReducer)


const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
}

const PropsRoute = ({ component, ...rest }) => {
    return (
        <Route {...rest} render={routeProps => {
            return renderMergedProps(component, routeProps, rest);
        }}/>
    );
};

class App extends Component {

    constructor(props) {
        super(props);

        const token = localStorage.getItem('token');

        this.state = {
            token: token,
            orders: []
        };

        this.setUser = this.setUser.bind(this);
    }

    setUser(user) {
        localStorage.setItem('token', user.token);
        this.setState(Object.assign(this.state, user));
    }

    render() {

        const { token } = this.state;

        return (
            <Provider store={store}>
                <div>
                    <Navbar>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="/">Skip the Line</a>
                            </Navbar.Brand>
                        </Navbar.Header>
                        <Nav>

                        </Nav>

                        <Nav pullRight>
                            <NavItem href={token !== 'undefined' ? ('/logout') : ('/login')}>
                                {token !== 'undefined' ? ('Logout') : ('Login')}
                            </NavItem>
                            <NavItem href="#">
                                Cart <Badge>123</Badge>
                            </NavItem>
                        </Nav>
                    </Navbar>;
                    <BrowserRouter>
                        <Switch>
                            <Route exact path='/' component={HomePage}/>
                            <Route path='/food' component={FoodPage}/>
                            <Route path='/restaurant' component={RestaurantPage} />
                            <Route path='/order' component={HomePage}/>
                            <Route path='/logout' component={ LogoutPage}/>
                            <PropsRoute path='/login' component={LoginPage} userLogged={this.setUser}/>
                        </Switch>
                    </BrowserRouter>
                </div>
            </Provider>
        );
    }
}

export default App;
