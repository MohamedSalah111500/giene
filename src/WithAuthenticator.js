import Auth from "@aws-amplify/auth";
import { Hub } from "@aws-amplify/core";
import { generateUser } from "./config/cognitoUtils";
import React, { Component } from "react";
import { cognito } from "./config/config";

const WithAuthenticator = ComposedComponent => {
  class Authenticate extends Component {
    state = {
      user: null,
      customState: null
    };

    async componentDidMount() {
      Hub.listen("auth", ({ payload: { event, data } }) => {
        // eslint-disable-next-line default-case
        if (event === "customOAuthState") {
            const decodedURL = decodeURIComponent(data);
             this.setState({ customState: decodedURL });
          }
        
      });

      try {
        let user = await Auth.currentAuthenticatedUser();
        this.setState({ user: user });
        this.props.history.push(this.state.customState);
       
      } catch (e) {
        if (e === "The user is not authenticated") {
            await Auth.federatedSignIn({
            // eslint-disable-next-line no-restricted-globals
            customState: location.pathname,
            // this is the identity provider that is configured in congnito
            provider: cognito.AUTH_CUSTOM_PROVIDER
          });
        }
      }
    }
    render() {
      if (!this.state.user) return <div />;
      else {
        return <ComposedComponent {...this.props} customState={this.state.customState} user={generateUser(this.state.user)} />;
      }
    }
  }

  return Authenticate;
};

export default WithAuthenticator;
