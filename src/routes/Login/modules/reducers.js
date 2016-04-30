
//import { REQUEST_LOGIN }  from '../../../routes/Login/modules/actions';


const loginReducer = (state = {userid: null, message: null}, action) => {
	if (state == null) {
		console.log('state is null');
		state = {userid: null, message: null};
	} else {
		console.log('userid: ' + action.userid);
	}
	return Object.assign({}, state, { userid: action.userid, message: action.message });
}

export default loginReducer;
