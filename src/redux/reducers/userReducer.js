import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function userReducer(state = initialState.user, action={}) {
  switch (action.type) {
    case types.SET_LOGGED_IN_USER_INFO:
      return {
        ...action.user
      };
    default:
      return state;
  }
}
