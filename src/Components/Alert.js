import React, { Component } from "react";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";

class DialogAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            acept: false
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleSend = this.handleSend.bind(this);
    }

    handleSend = () => {
        this.props.showAlert(this.state.open);
    };

    handleClose = () => {
        this.props.showAlert(this.state.acept);
    };

    render() {
        const actions = [
            <FlatButton
                label="Cancelar"
                secondary={true}
                onClick={() => this.handleClose()}
            />,
            <FlatButton
                label="Aceptar"
                primary={true}
                onClick={() => this.handleSend()}
            />
        ];

        return (
            <div>
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    {this.props.info}
                </Dialog>
            </div>
        );
    }
}
export default DialogAlert;
