import React, { Component } from "react";
import IconButton from "material-ui/IconButton";
import IconMenu from "material-ui/IconMenu";
import MenuItem from "material-ui/MenuItem";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from "react-router-dom";
import Toggle from "material-ui/Toggle";
import MoreVertIcon from "material-ui/svg-icons/navigation/more-vert";
import NavigationClose from "material-ui/svg-icons/navigation/close";
import Auth from "../lib/Auth/Auth";

class barButton extends Component {
    constructor(props) {
        super(props);
        this.state = { auth: true };
    }

    static muiName = "IconMenu";

    removeToken() {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        localStorage.removeItem("userMail");
        localStorage.removeItem("userName");
        localStorage.removeItem("userRolId");
        this.setState({ auth: Auth() });
    }
    render() {
        return (
            <div>
                {!this.state.auth ? (
                    <Redirect to={{ pathname: "/login" }} />
                ) : (
                    <IconMenu
                        iconButtonElement={
                            <IconButton>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        anchorOrigin={{ horizontal: "right", vertical: "top" }}
                        targetOrigin={{ horizontal: "right", vertical: "top" }}
                        iconStyle={{ color: "rgba(255, 255, 255)" }}
                    >
                        <MenuItem primaryText="Refresh" />
                        <MenuItem primaryText="Help" />
                        <MenuItem
                            primaryText="Sign out"
                            onClick={this.removeToken.bind(this)}
                        />
                    </IconMenu>
                )}
            </div>
        );
    }
}

export default barButton;
