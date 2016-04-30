import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import UserList from '../../routes/UserList/UserList';
import { requestUserlist } from '../../routes/UserList/modules/actions';
import { getUserlistReducer } from '../../routes/UserList/modules/reducers';
import $ from 'jquery';

export default class UserListContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			userData: []
		};
		console.log('UserListContainer.constructor');
	}

	componentDidMount() {
		console.log('UserListContainer.componentDidUpdate');
		/* fetch('/userlist')
			.then((response) => response.json())
			.then((responseData) => {
				this.setState({userData: responseData});
		})
			.catch((error) => {
				console.log('Error fetching and parsing data', error');
		}); */

		var itself = this;
		var result = { userlist: [], errMsg: '' };
		var jqxhr = $.getJSON( "/users", function( data ) {
          $.each(data, function(key, value) {
            var user = new Object();
            user.name = value.name;
            user.eamil = value.email;
			user.userid = value.userid;
			user.password = "********";

            result.userlist.push(user);
          });
        }).done(function() {
            console.log( "succeeded to get user list" );
        }).fail(function() {
            console.log( "fail to get user list" );
			result.errMsg = 'fail to get user list';
        }).always(function() {
            itself.setState({userData: result.userlist});
			console.log('UserListContainer.componentDidMount.ok');
        });

		/* new Promise(function (resolve, reject) {
			window.setTimeout(function () {
				var result = { userlist: [], errMsg: '' };
				result.userlist = [
					{ name: "Abet", email: "Abet@gmail.com", userid: "abet", password: "********" },
					{ name: "Betty", email: "Betty@gmail.com", userid: "betty", password: "********" },
					{ name: "Charlie", email: "Charlie@gmail.com", userid: "charlie", password: "********" },
					{ name: "David", email: "David@gmail.com", userid: "david", password: "********" }
				];
				resolve(result);
			}, 1000);
		})
		.then(function (result) {
			itself.setState({userData: result.userlist});
			console.log('UserListContainer.componentDidMount.ok');
			//itself.props.getUserlist(result.userlist);
		}, function (error) {
			console.log('UserListContainer.componentDidUpdate.error: ' + error);
		});

		//this.props.getUserlist();
		*/


	}

	componentWillReceiveProps() {
		console.log('componentWillReceiveProps()');
	}
	shouldComponentUpdate() {
		console.log('shouldComponentUpdate()');
		return true;
	}
	componentWillUpdate() {
		console.log('componentWillUpdate()');
	}
	componentDidUpdate() {
		console.log('componentDidUpdate()');
	}

	render() {
		console.log('begin UserListContainer.render');
		return (
			<UserList userlist={this.state.userData} />
		);
		console.log('end UserListContainer.render');
	}
}

let mapStateToProps = (state) => {
    return {
        userData: state.getUserlistReducer.userlist
    };
}

let mapDispatchToProps = (dispatch) => {
	return {
		getUserlist: (userlist) => dispatch(requestUserlist(userlist))
	};
}

UserListContainer = connect(mapStateToProps, mapDispatchToProps)(UserListContainer);

export default UserListContainer;