import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default class MainPage extends React.Component {
	render() {
		return (
			<div>
				<div className="jumbotron">
					<h1>React Redux Test</h1>  
					<p>
						This starter kit is designed to get you up and running with a bunch of awesome new front-end technologies, all on top of a configurable, feature-rich webpack build system that is already setup to provide hot reloading, CSS modules with Sass support, unit testing, code coverage reports, bundle splitting, and a whole lot more. The primary goal of this project is to remain as unopinionated as possible. Its purpose is not to dictate your project structure or to demonstrate a complete sample application, but to provide a set of tools intended to make front-end development robust, easy, and, most importantly, fun. Check out the full feature list below! Finally, This project would not be possible without the help of our many contributors, so thank you for all of your help.
					</p>
				</div>

			</div>
		);
	}
}
