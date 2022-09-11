import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function currentStrainReducer(state = initialState.strains, action = {}) {
  switch (action.type) {

    case types.SET_STRAINS:
      return { ...state, strains: action.strains };


    default:
      return state;
  }
}
