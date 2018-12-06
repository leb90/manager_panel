import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import TextField from 'material-ui/TextField';
import FontIcon from 'material-ui/FontIcon';
import { red500, yellow500, blue500 } from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FileBase64 from 'react-file-base64';
import { connect } from 'react-redux'
import { closeModal , showModal} from "../../Actions/helperAction"
import { userGet, addUser, editUser } from "../../Actions/LoginAction"
import apiService from '../../lib/apiService/apiService';

const iconStyles = {
	marginRight: 50
};
const styles = {
	button: {
		height: '40px',
		lineHeight: '55px',
		overflow: 'inherit'
	},
	iconStyles: {
		marginRight: 50
	},
};

const textStyles = {
	position: 'initial',
	marginLeft: '1em',
	height: '40px'
}
const textStylesSelect = {
	position: 'initial',
	marginLeft: '1em',
	height: '40px',
	lineHeight: '55px',
	overflow: 'inherit'
}

class ModalFormUser extends Component {

	constructor(props) {
		super(props);
		this.state = {
			open: true,
			edit: false,
			select: 1,
			user: { ...this.props.LoginReducer.user } || null,
			newUserId: null
		};
		this.handleClose = this._handleClose.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleReset = this.handleReset.bind(this);
	}

	_handleClose() {
		this.props.closeModal();
	}

	handleChange = (e) => {
		let user = Object.assign({}, this.state.user);
		user[e.target.name] = e.target.value;
		if (this.props.LoginReducer.user) {
			this.setState({ user, edit: true });
		} else {
			this.setState({ user, edit: false });
		}

	}
	componentDidUpdate(prevProps , prevState){
		if(prevProps.LoginReducer.user !== this.props.LoginReducer.user){
			this.setState({user: this.props.LoginReducer.user.data[0]})
			console.log(this.props.LoginReducer.user , "LOGINREDUCER DESDE EL MODALFORM")
		} else if (prevProps.LoginReducer.allUsers !== this.props.LoginReducer.allUsers) {
			this.props.userGet();
		} 
	}	
	handleReset() {
		this.setState({
			user: {
				name: "",
				surname: "",
				nickname: "",
				email: "",
				dni: "",
				country_id: "",
				state: "",
				city: "",
				address: "",
				postalCode: "",
				phone: "",
				rol_id: this.state.select
			}
		});
	}
	handleCreate(event) {

		const userData = {
			name: event.target.name.value,
			surname: event.target.surname.value,
			nickname: event.target.nickname.value,
			email: event.target.email.value,
			dni: event.target.dni.value,
			country_id: event.target.country_id.value,
			state: event.target.state.value,
			city: event.target.city.value,
			address: event.target.address.value,
			postalCode: event.target.postalCode.value,
			phone: event.target.phone.value,
			rol_id: this.state.select
		};

		if (this.state.edit === true) {		
			this.props.editUser(this.state.user.id, userData);
			this.props.returnUser(this.state.user.id, userData);
			this.props.closeModal();

		} else {
			this.props.addUser(userData);
			this.props.closeModal();
		}
	}

	handleSelect = (event, index, select) => {
		this.setState({ select })
	};

	render() {
		const actions = [
			<FlatButton type="reset" label="Reset" secondary={true} style={{ float: 'left' }} onClick={this.handleReset} />,
			<FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
			<FlatButton type="submit" label="Submit" primary={true} />
		];
		return (
			<Dialog title="Dialog With Custom Width" modal={true} open={this.props.showModal}>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						this.handleCreate(e);
					}}>
					<FontIcon className="material-icons" style={iconStyles}>perm_identity<TextField style={textStyles} onChange={this.handleChange} value={this.state.user.name || ''} name="name" hintText="Nombre" /></FontIcon>
					<FontIcon className="material-icons" style={iconStyles}>perm_identity<TextField style={textStyles} onChange={this.handleChange} value={this.state.user.surname || ''} name="surname" hintText="Apellido" /></FontIcon>
					<FontIcon className="material-icons" style={iconStyles}>account_box<TextField style={textStyles} onChange={this.handleChange} value={this.state.user.nickname || ''} name="nickname" hintText="NickName" /></FontIcon>
					<FontIcon className="material-icons" style={iconStyles}>email<TextField style={textStyles} onChange={this.handleChange} value={this.state.user.email || ''} name="email" hintText="Email" /></FontIcon>
					<FontIcon className="material-icons" style={iconStyles}>fingerprint<TextField style={textStyles} onChange={this.handleChange} value={this.state.user.dni || ''} name="dni" hintText="Dni" /></FontIcon>
					<FontIcon className="material-icons" style={iconStyles}>public<TextField style={textStyles} onChange={this.handleChange} value={this.state.user.country_id || ''} name="country_id" hintText="Pais" /></FontIcon>
					<FontIcon className="material-icons" style={iconStyles}>terrain<TextField style={textStyles} onChange={this.handleChange} value={this.state.user.state || ''} name="state" hintText="Estado/Provincia" /></FontIcon>
					<FontIcon className="material-icons" style={iconStyles}>location_city<TextField style={textStyles} onChange={this.handleChange} value={this.state.user.city || ''} name="city" hintText="Ciudad" /></FontIcon>
					<FontIcon className="material-icons" style={iconStyles}>my_location<TextField style={textStyles} onChange={this.handleChange} value={this.state.user.address || ''} name="address" hintText="Direccion" /></FontIcon>
					<FontIcon className="material-icons" style={iconStyles}>rate_review<TextField style={textStyles} onChange={this.handleChange} value={this.state.user.postalCode || ''} name="postalCode" hintText="Codigo Postal/Zip" /></FontIcon>
					<FontIcon className="material-icons" style={iconStyles}>phone<TextField style={textStyles} onChange={this.handleChange} value={this.state.user.phone || ''} name="phone" hintText="Telefono" /></FontIcon>
					<FontIcon className="material-icons" style={iconStyles}>supervisor_account
						<SelectField
							labelStyle={textStylesSelect}
							value={this.state.user.rol_id || this.state.select}
							onChange={this.handleSelect}>
							<MenuItem value={1} primaryText="SuperAdmin" />
							<MenuItem value={2} primaryText="Admin" />
							<MenuItem value={3} primaryText="User" />
							<MenuItem value={6} primaryText="Client" />
						</SelectField>
					</FontIcon>
					<FontIcon className="material-icons" style={styles.iconStyles}>filter
						<FlatButton
							label="Choose an Image"
							labelPosition="before"
							style={styles.button}
							containerElement="label"
						>
						</FlatButton>
					</FontIcon>
					<div
						style={{
							textAlign: 'right',
							padding: 8,
							margin: '24px -24px -24px -24px'
						}}>
						{actions}
					</div>
				</form>
			</Dialog>
		)
	}
}
const mapToStateToProps = state => {
	return {
		LoginReducer: state.LoginReducer,
		helperReducer: state.helperReducer
	}
}

export default connect(mapToStateToProps, { closeModal, userGet, addUser, editUser , showModal })(ModalFormUser);