import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import AppBar from "material-ui/AppBar";
import classnames from "classnames";
import { userGet } from "./Actions/LoginAction";
import BarButton from "./Components/BarButton";
import SideBar from "./Components/SideBar";
import UsersList from "./Components/Users/UsersList";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: true
        };
    }
    handleToggleAppBar(state) {
        if (state === true) {
            this.setState({
                open: false
            });
        } else {
            this.setState({
                open: true
            });
        }
    }
    componentDidMount() {
        if (window.innerWidth < 768) {
            this.setState({
                open: false
            });
        }
    }

    render() {
        return (
            <div className="app-container">
                {console.log(
                    this.props.helperReducer.responsive,
                    "probando responsive!"
                )}
                <AppBar
                    style={{
                        backgroundColor: "#66BB6A",
                        position: "fixed",
                        top: 0
                    }}
                    onLeftIconButtonClick={() =>
                        this.handleToggleAppBar(this.state.open)
                    }
                    title="Title"
                    iconElementRight={<BarButton />}
                />
                <div
                    className={classnames("menu-container", {
                        "menu-expanded": !this.state.open
                    })}
                >
                    <SideBar open={this.state.open} />
                    <div
                        className={classnames("app-content content-container", {
                            expanded: !this.state.open
                        })}
                    >
                        <UsersList />
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        helperReducer: state.helperReducer
    };
};
export default connect(
    mapStateToProps,
    { userGet }
)(App);
