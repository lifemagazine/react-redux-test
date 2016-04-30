
export const REQUEST_LOGIN = 'REQUEST_LOGIN';


export function requestLogin(userId) {
	console.log('requestLogin: ' + userId);
	return { type: REQUEST_LOGIN, userid: userId, message: null };
}
