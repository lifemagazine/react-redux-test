import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import { requestLogout } from '../routes/Logout/modules/actions';
import ReactDom from 'react-dom';
import $ from 'jquery';


class MenuBar extends Component {
	constructor(props) {
		super(props);

		this.logoutClick = this.logoutClick.bind(this);
	}
	
	componentWillReceiveProps() {
		console.log('componentWillReceiveProps() - ' + this.props.userid);
	}
	shouldComponentUpdate() {
		console.log('shouldComponentUpdate() - ' + this.props.userid);
		return true;
	}
	componentWillUpdate() {
		console.log('componentWillUpdate() - ' + this.props.userid);
	}
	componentDidUpdate() {
		if (this.preprops == undefined && this.props.userid != null) {
			browserHistory.pushState(null, '/MainPage');
		}
	}

	logoutClick(e) {
		e.preventDefault();
		// requestLogout
		//this.props.logout(this.props.userid);
		//browserHistory.pushState(null, '/MainPage');

		/* fetch('/userlist')
			.then((response) => response.json())
			.then((responseData) => {
				this.setState({userData: responseData});
		})
			.catch((error) => {
				console.log('Error fetching and parsing data', error');
		}); */

		/* let itself = this;
		let _promise = function () {
			return new Promise(function (resolve, reject) {
				window.setTimeout(function () {
					resolve('logout ok');
				}, 1000);
			});
		};

		_promise()
		.then(function (text) {
			console.log(text);
			itself.props.logout();
			browserHistory.pushState(null, '/MainPage');
		}, function (error) {
			console.log('logout fail: ' + error);
		}); */

		let itself = this;

		$.ajax({
            url: '/logout',
            async: false,
            type: "POST",
            success: function(data) {
                alert('logout ok');
				itself.props.logout();
				browserHistory.pushState(null, '/MainPage');
            },
            error: function(err) {
                alert('failed to logout!');
            }
        });
	}

    render() {
		let logoutStyle = { cursor: 'pointer' };
		console.log('MenuBar.rencder()');
		let leftMenu, rightMenu;
		if (this.props.userid == null || this.props.userid.length == 0 || this.props.userid == 'null') {
			leftMenu = 
				<ul className="nav navbar-nav">
					<li><Link to="MainPage" value="MainPage">MainPage</Link></li>
				</ul>;

			rightMenu = 
				<ul className="nav navbar-nav navbar-right">
					<li><Link to="Login" value="Login"> Login</Link></li>
					<li><Link to="Register" value="Register"> Register</Link></li>
				</ul>;
		} else {
			leftMenu = 
				<ul className="nav navbar-nav">
					<li><Link to="MainPage" value="MainPage">MainPage</Link></li>
					<li><Link to="UserList" value="UserList">UserList</Link></li>
				</ul>;

			rightMenu = 
				<ul className="nav navbar-nav navbar-right">
					<li><a onClick={this.logoutClick} style={logoutStyle}>{this.props.userid} Logout</a></li>
				</ul>;
		}
		
		return (
			<div>
				<nav className="navbar navbar-inverse">
				  <div className="container-fluid">
					{ leftMenu }
					{ rightMenu }
				  </div>
				</nav>
			</div>
		);
    }
}

let mapStateToProps = (state) => {
    return {
        userid: state.loginReducer.userid
    };
}

let mapDispatchToProps = (dispatch) => {
	return {
		logout: () => dispatch(requestLogout())
	};
}

MenuBar = connect(mapStateToProps, mapDispatchToProps)(MenuBar);

export default MenuBar;