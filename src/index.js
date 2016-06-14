import React, { omponent, PropTypes } from 'react';
import ReactDom from 'react-dom';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import MainPage from './routes/MainPage/index';
import Login from './routes/Login/index';
import Register from './routes/Register/index';
import UserListContainer from './routes/UserList/index';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import testApp from './store/reducers';
 

const store = createStore(testApp);

let rootElement = document.getElementById('root');

ReactDom.render(
	<Provider store={store}>
		<Router history = {browserHistory}>
			<Route path = "/" component = {App} userid={store.getState().userid} role={store.getState().role} >
				<IndexRoute component = {MainPage} />
				<Route path = "Login" component = {Login} />
				<Route path = "Register" component = {Register} />
				<Route path = "UserList" component = {UserListContainer} userlist={store.getState().userlist} />
				<Route path = "MainPage" component = {MainPage} />
			</Route>
		</Router>
	</Provider>,
	rootElement
);