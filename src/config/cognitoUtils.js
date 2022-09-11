import { NAVIGATION_MENU } from "../routes/route-definitions";
import { ROLES_AUTHORIZED } from "../config/securityConfig";
const GN_ROLES_PREFIX = "GN_";


export const generateUser = (cognitoUser) => {
  let user = INITIAL_USER;

  if (cognitoUser && cognitoUser.attributes) {
    user.userId = cognitoUser.attributes.identities ? JSON.parse(cognitoUser.attributes.identities)[0].userId.toUpperCase() : null;
    user.firstname = cognitoUser.attributes.given_name;
    user.lastname = cognitoUser.attributes.family_name;
    user.fullname = user.firstname + " " + user.lastname;
    user.initials = user.firstname[0] + "" + user.lastname[0];
    user.email = cognitoUser.attributes.email;
    user.roles = cognitoUser.signInUserSession.idToken.payload[
      "cognito:groups"
    ].filter((item) => !item.startsWith(cognitoUser.pool.userPoolId) && item.startsWith(GN_ROLES_PREFIX));
    user.navigationMenu = getNavigationMenu(user.roles);
  }
  return user;
};


export const getNavigationMenu = (userRoles) => {
  const customMenu = [];
  if (userRoles && userRoles.length > 0) {
    for (let key in NAVIGATION_MENU) {
      let fun = NAVIGATION_MENU[key];
      if (ROLES_AUTHORIZED[fun.functionality].some(r => userRoles.includes(r))) {
        customMenu.push(fun);

      }
      
    }
  }
  return customMenu;
}


export const INITIAL_USER = {
  navigationMenu: [],
  roles: [],
  userId: "",
  firstname: "",
  lastname: "",
  fullname: "",
  initials: "",
  email: ""
};



