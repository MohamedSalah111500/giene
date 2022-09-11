import * as userActions from "../actions/userActions";
import userReducer from "./userReducer";

describe("user reducer", () => {
    it("should update userInfo with passed value SET_LOGGED_IN_USER_INFO", () => {
      let initialState = {};
      const user= {
        userId: "t863071",
        email: "riham.fayez@syngenta.com",
        firstname: "riham",
        lastname: "fayez",
        taccount: "t863071",
        roles: []
      }
      const action = userActions.setLoggedInUserInfo(user);
      const newState = userReducer(initialState, action);
      expect(newState).toEqual(user);
    });


});
