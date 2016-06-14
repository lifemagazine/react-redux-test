
const loginReducer = (state = {userid: null, role: 100, message: null}, action) => {
	if (state == null) {
		console.log('state is null');
		state = {userid: null, message: null};
	} else {
		console.log('userid: ' + action.userid + ', role: ' + action.role);
	}
	return Object.assign({}, state, { userid: action.userid, role: action.role, message: action.message });
}

export default loginReducer;
