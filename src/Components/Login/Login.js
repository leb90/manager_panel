import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import FontIcon from "material-ui/FontIcon";
import {
    blue500,
    red500,
    green400,
    fullWhite
} from "material-ui/styles/colors";
import Checkbox from "material-ui/Checkbox";
import "../../App.css";
import { connect } from "react-redux";

import apiService from "../../lib/apiService/apiService";
import Auth from "../../lib/Auth/Auth";
import "./login.css";
import { loginGet } from "../../Actions/LoginAction";
import LoginReducer from "../../Reducers/LoginReducer";
const stylesCheck = {
    block: {
        maxWidth: 250
    },
    checkbox: {
        top: "42px",
        width: "auto",
        marginBottom: 16
    }
};

const cardStyle = {
    width: "350px",
    height: "310px",
    display: "block",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: "10%"
};
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            authenticated: false
        };
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.loginGet({
            email: this.state.username,
            password: this.state.password
        });
    };
    buildLogin() {
        return (
            <form
                className="form-container"
                onSubmit={this.handleSubmit} /*onSubmit={this.login}*/
            >
                <Card className="form-card" style={cardStyle}>
                    <div className="form-header">
                        <h3>Bienvenidos a PapiSocial</h3>
                    </div>

                    <CardActions
                        className="form-input-container"
                        style={{
                            padding: "15px"
                        }}
                    >
                        <div className="input-text-container">
                            <TextField
                                className="input-form"
                                floatingLabelFocusStyle={{
                                    color: "#66BB6A"
                                }}
                                underlineFocusStyle={{
                                    borderColor: "#66BB6A"
                                }}
                                style={{
                                    paddingLeft: "0.5em"
                                }}
                                hintText="Username"
                                value={this.state.username}
                                onChange={this.handleUsernameChange.bind(this)}
                                floatingLabelText="Username"
                            />

                            <TextField
                                className="input-form"
                                floatingLabelFocusStyle={{
                                    color: "#66BB6A"
                                }}
                                underlineFocusStyle={{
                                    borderColor: "#66BB6A"
                                }}
                                style={{
                                    paddingLeft: "0.5em"
                                }}
                                hintText="Password Field"
                                value={this.state.password}
                                onChange={this.handlePasswordChange.bind(this)}
                                floatingLabelText="Password"
                                type="password"
                            />
                        </div>
                        <br />
                        <Checkbox
                            className="form-remenber"
                            label="Remember"
                            style={stylesCheck.checkbox}
                            labelStyle={{
                                fontSize: "12px"
                            }}
                        />
                        <div className="form-button-container">
                            <RaisedButton
                                className="form-button-submit"
                                label="Login"
                                type="submit"
                                labelColor={fullWhite}
                                backgroundColor="#27C423"
                            />
                            <div className="form-divider">
                                <h3 className="form-account-container">
                                    {" "}
                                    <span className="form-account">
                                        {" "}
                                        ¿No tenés cuenta?
                                    </span>
                                </h3>
                            </div>
                            <RaisedButton
                                className="form-button-submit"
                                label="Register"
                                labelColor={fullWhite}
                                backgroundColor="#27C423"
                            />
                        </div>
                    </CardActions>
                </Card>
            </form>
        );
    }
    /*tener en cuenta esta funcion para futuro, dependiende del usuario cambiaria la redireccion*/
    toUserList() {
        return (
            <Redirect
                to={{
                    pathname: "/list"
                }}
            />
        );
    }

    render() {
        const { LoginReducer } = this.props;
        const buildLogin = !LoginReducer.authenticated
            ? this.buildLogin()
            : this.toUserList();
        return <div>{buildLogin}</div>;
    }
}

const mapStateToProps = state => {
    return {
        LoginReducer: state.LoginReducer
    };
};
export default connect(
    mapStateToProps,
    { loginGet }
)(Login);
