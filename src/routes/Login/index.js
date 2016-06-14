import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { requestLogin } from '../../routes/Login/modules/actions';
import $ from 'jquery';


class Login extends React.Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.registerClick = this.registerClick.bind(this);
		this.onKeyPress = this.onKeyPress.bind(this);
		this.doLogin = this.doLogin.bind(this);
	}

	handleClick(e) {
		e.preventDefault();
		
		this.doLogin();
	}

	doLogin() {
		const textUserid = this.refs.userid.value;
		const textPwd = this.refs.pwd.value;
		console.log('handleClick: ' + textUserid + ', ' + textPwd);

		
		let itself = this;

		var formData = {userid: textUserid, password: textPwd};

		$.ajax({
            url: '/login',
            async: false,
            type: "POST",
            data : JSON.stringify(formData),
            contentType: "application/json; charset=utf-8",
            success: function(data) {
				console.log(data);
				console.log(data.role);
                alert('login ok: ' + textUserid);
				itself.props.login(textUserid, data.role);
            },
            error: function(err) {
                alert('login failed. check userid or password');
				itself.refs.userid.value = "";
				itself.refs.pwd.value = "";
            }
        });
	}

	registerClick(e) {
		e.preventDefault();
		console.log('handleClick: go register');
		//this.props.login(textUserid, textPwd);
		this.props.history.pushState(null, '/Register');
	}

	onKeyPress(e) {
		if (e.charCode == 13 || e.keyCode == 13) {
			this.doLogin();
		}
	}

	render() {
		return (
			<div className="container">
				<br />
				<form id="loginForm" className="form-horizontal" role="form">
				  <div className="form-group">
					<label className="control-label col-sm-2" for="userid">User ID:</label>
					<div className="col-sm-4">
					  <input type="text" className="form-control" id="userid" placeholder="Enter id" ref='userid' />
					</div>
				  </div>
				  <div className="form-group">
					<label className="control-label col-sm-2" for="password">Password:</label>
					<div className="col-sm-4"> 
					  <input type="password" className="form-control" id="password" placeholder="Enter password" ref='pwd' onKeyPress={this.onKeyPress} />
					</div>
				  </div>
				  <div className="form-group"> 
					<div className="col-sm-offset-2 col-sm-4">
					  <button type="button" className="btn btn-default" onClick={this.handleClick}>Login</button>
					  { " " }
					  <button type="button" className="btn btn-default" onClick={this.registerClick}>Register</button>
					</div>
				  </div>
				</form>
			</div>
		);
	}
}


let mapDispatchToProps = (dispatch) => {
	return {
		login: (userId, role) => dispatch(requestLogin(userId, role))
	};
}

Login = connect(undefined, mapDispatchToProps)(Login);

export default Login;