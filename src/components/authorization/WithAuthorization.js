import React from "react";

//
function WithAuthorization(WrappedComponent, editAllowedRoles, userRoles = null) {

  return function AuthorizedComponent({ ...props }) {
    let roles = userRoles;
    let enableEditing = false;

    if (roles && (roles.some(item => editAllowedRoles.includes(item)))) {
      enableEditing = true;
    }
    return <WrappedComponent {...props} enableEditing={enableEditing} />;
  };
}


export default WithAuthorization;
