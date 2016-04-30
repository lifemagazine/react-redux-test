
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';

export function requestLogout() {
	return { type: REQUEST_LOGOUT, userid: 'null', message: 'logout ok' };
}
