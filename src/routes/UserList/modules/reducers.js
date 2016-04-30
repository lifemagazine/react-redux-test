
//import { REQUEST_USERLIST }  from '../../../routes/UserList/modules/actions';


const getUserlistReducer = (state = { userlist: [], message: null }, action) => {
	return Object.assign({}, state, { userlist: action.userlist, message: action.message });
}

export default getUserlistReducer;