import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import UserInfo from '../../routes/UserList/UserInfo';

export default class UserList extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="container">
				<br />
				<table className="table table-striped">
					<thead>
						<tr>
							<th>No.</th>
							<th>User ID</th>
							<th>Password</th>
							<th>Name</th>
							<th>E-mail</th>
						</tr>
					</thead>
					<tbody>
						{this.props.userlist.map((data, i) => {
							return (
								<UserInfo 
									no={i+1} 
									name={data.name}
									email={data.email}
									userid={data.userid}
									div1={"active-div-" + data.userid} 
									div2={"inactive-div-" + data.userid} 
									key={i} />
								);
						})}
					</tbody>
				</table>

			</div>
		);
	}
}

