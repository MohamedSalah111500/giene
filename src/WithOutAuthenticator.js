import React, { Component } from "react";
import { ROLES } from "./config/securityConfig";
import {INITIAL_USER,getNavigationMenu} from "./config/cognitoUtils";

//const roles=[ROLES.LM_ADMIN_USER,ROLES.LM_USER];
//const roles=[ROLES.LM_USER];
// const roles=[ROLES.LM_VIEWER];
const roles=[ROLES.LM_ADMIN_USER];
// const roles=[];

const WithOutAuthenticator = ComposedComponent => {
  class Authenticate extends Component {
    state = {
      user: {...INITIAL_USER,
            roles:roles,
            navigationMenu:getNavigationMenu(roles)},
      customState: null
    };

    render() {
        return <ComposedComponent {...this.props} customState={this.state.customState} user={this.state.user} />;
      }
    
  }

  return Authenticate;
};

export default WithOutAuthenticator;
