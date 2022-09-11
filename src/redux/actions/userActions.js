import * as types from "./actionTypes";

/**
 * Action to update store with user
 * @param {*} user
 */
export function setLoggedInUserInfo(user) {
  return { type: types.SET_LOGGED_IN_USER_INFO, user };
}


