
export const REQUEST_LOGIN = 'REQUEST_LOGIN';


export function requestLogin(userId, role) {
	console.log('requestLogin: ' + userId + ', role: ' + role);
	return { type: REQUEST_LOGIN, userid: userId, role: role, message: null };
}
