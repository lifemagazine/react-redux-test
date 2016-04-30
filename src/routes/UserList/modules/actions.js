

export const REQUEST_USERLIST = 'REQUEST_USERLIST';

export function requestUserlist(userlist) {
	return { type: REQUEST_USERLIST, userlist: userlist, message: null };
}
	