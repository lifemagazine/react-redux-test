
//import { REQUEST_LOGOUT }  from '../../../routes/Logout/modules/actions';


const logoutReducer = (state = {userid: null, message: null}, action) => {
	return Object.assign({}, state, { userid: action.userid, message: action.message });
}

export default logoutReducer;