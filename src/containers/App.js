import React, { Component, PropTypes } from 'react';
import MenuBar from '../components/MainMenu';

export default class App extends Component {
	
    render() {
		console.log('App.render(), userid:' + this.props.route.userid + ', role: ' + this.props.route.role);
		//let userid = 'admin';
		return (
			<div>
				<MenuBar userid={this.props.route.userid} role={this.props.route.role} />
				{ this.props.children }
			</div>
		);
    }
}
