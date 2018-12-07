import React, { Component } from "react";
import "../App.css";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import App from "../App";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";

import Login from "./Login/Login";
import Auth from "../lib/Auth/Auth";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import configureStore from "../store/configureStore";
import reducers from "../Reducers/reducers";

const Root = stores => {
    const PrivateRoute = ({ component: Component, ...rest }) => (
        <Route
            {...rest}
            render={props =>
                Auth(stores) ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login"
                        }}
                    />
                )
            }
        />
    );

    const store = createStore(reducers, applyMiddleware(thunk));
    return (
        <Provider store={store}>
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <Router>
                    <div>
                        <Route exact path="/login" component={Login} />
                        <PrivateRoute path="/list" component={App} />
                    </div>
                </Router>
            </MuiThemeProvider>
        </Provider>
    );
};

export default Root;
