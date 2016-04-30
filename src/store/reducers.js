
/*import { loginReducer }  from		'../routes/Login/modules/reducers';
import { logoutReducer }  from		'../routes/Logout/modules/reducers';
import { getUserlistReducer }  from '../routes/UserList/modules/reducers';
import { combineReducers } from 'redux';


const testApp = combineReducers({
    loginReducer: loginReducer,
	logoutReducer: logoutReducer,
	getUserlistReducer: getUserlistReducer
});

export default testApp;*/

import { combineReducers } from 'redux';

const loginReducer = (state = {userid: null, message: null}, action) => {
	if (state == null) {
		console.log('state is null');
		state = {userid: null, message: null};
	} else {
		console.log('userid: ' + action.userid);
	}
	return Object.assign({}, state, { userid: action.userid, message: action.message });
}

const getUserlistReducer = (state = { userlist: [], message: null }, action) => {
	return Object.assign({}, state, { userlist: action.userlist, message: action.message });
}

const testApp = combineReducers({
    loginReducer,
	getUserlistReducer
});

export default testApp;
