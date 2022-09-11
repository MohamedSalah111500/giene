import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function currentDeviceConfigReducer(state = initialState.deviceConfig, action = {}) {
  switch (action.type) {

    case types.SET_DEVICE_CONFIG:
      return { ...state, deviceConfig: action.config };

    default:
      return state;
  }
}
