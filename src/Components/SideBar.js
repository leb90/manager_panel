import React, { Component } from "react";
import { List, ListItem } from "material-ui/List";
import ActionGrade from "material-ui/svg-icons/action/grade";
import ContentInbox from "material-ui/svg-icons/content/inbox";
import ContentDrafts from "material-ui/svg-icons/content/drafts";
import ContentSend from "material-ui/svg-icons/content/send";
import Subheader from "material-ui/Subheader";
import Toggle from "material-ui/Toggle";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import classnames from "classnames";
import AppBar from "material-ui/AppBar";
import Drawer from "material-ui/Drawer";
import BarButton from "./BarButton";

class SideBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sidebar-app-container">
                <div>
                    <Drawer
                        className={classnames("app-bar", {
                            expanded: this.props.open
                        })}
                        containerStyle={{
                            borderRight: "1px solid rgba(179, 179, 179, 0.7)",
                            top: "auto"
                        }}
                        zDepth="none"
                        docked={true}
                        open={this.props.open}
                    >
                        <List className="app-bar-list">
                            <Subheader>User Name</Subheader>
                            <ListItem
                                primaryText="Sent mail"
                                leftIcon={<ContentSend />}
                            />
                            <ListItem
                                primaryText="Drafts"
                                leftIcon={<ContentDrafts />}
                            />
                            <ListItem
                                primaryText="Inbox"
                                leftIcon={<ContentInbox />}
                                initiallyOpen={false}
                                primaryTogglesNestedList={true}
                                nestedItems={[
                                    <ListItem
                                        key={1}
                                        primaryText="Starred"
                                        leftIcon={<ActionGrade />}
                                    />,
                                    <ListItem key={2} />
                                ]}
                            />
                        </List>
                    </Drawer>
                </div>
            </div>
        );
    }
}
export default SideBar;
