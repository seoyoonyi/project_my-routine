/* eslint-disable @typescript-eslint/no-explicit-any */
const SAVE_INFO = "saveInfo";
let localStorage: any;
if (typeof window == "undefined") {
  localStorage = global.localStorage;
} else {
  localStorage = window.localStorage;
}

export default class TokenStorage {
  saveToken(info: any) {
    localStorage && localStorage.setItem(SAVE_INFO, JSON.stringify(info));
  }
  getToken() {
    return localStorage && JSON.parse(localStorage.getItem(SAVE_INFO));
  }
  removeToken() {
    localStorage && localStorage.removeItem(SAVE_INFO);
  }
  clearToken() {
    localStorage && localStorage.removeItem(SAVE_INFO);
  }
}
