export const ROLES = {
  GN_USER: "LM_USER",
  GN_ROLE_TRANS_FREEZER: "GN_ROLE_TRANS_FREEZER",
  GN_ROLE_TRANSFORMATION: "GN_ROLE_TRANSFORMATION"
};

export const ALL_ROLES = [ROLES.GN_USER, ROLES.GN_ROLE_TRANS_FREEZER, ROLES.GN_ROLE_TRANSFORMATION];
export const EDIT_ROLES = [ROLES.GN_ROLE_TRANS_FREEZER];
export const ADMIN_ROLES = [ROLES.GN_ROLE_TRANS_FREEZER];





export function isAuthorized(userRoles) {
  return userRoles.some(role => ALL_ROLES.includes(role))
}

export const ROLES_AUTHORIZED = {
  STORE_STOCK: ALL_ROLES,

};


export function doEnableEditing(userRoles, editingRoles) {
  return userRoles.some(role => editingRoles.includes(role))
} 
