/* eslint-disable @typescript-eslint/no-explicit-any */
const SAVEINFO = 'saveInfo';
let localStorage: any;
if (typeof window == 'undefined') {
	localStorage = global.localStorage;
} else {
	localStorage = window.localStorage;
}

export default class TokenStorage {
	saveToken(info: any) {
		localStorage && localStorage.setItem(SAVEINFO, JSON.stringify(info));
	}
	getToken() {
		return localStorage && JSON.parse(localStorage.getItem(SAVEINFO));
	}
	removeToken() {
		localStorage && localStorage.removeItem(SAVEINFO);
	}
	clearToken() {
		localStorage && localStorage.removeItem(SAVEINFO);
	}
}
