import React, { Component, PropTypes } from 'react';
import MenuBar from '../components/MainMenu';

export default class App extends Component {
	
    render() {
		console.log('App.render(), userid:' + this.props.route.userid);
		//let userid = 'admin';
		return (
			<div>
				<MenuBar userid={this.props.route.userid} />
				{ this.props.children }
			</div>
		);
    }
}
