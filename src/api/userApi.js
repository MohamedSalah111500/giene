import axios from "axios";
import { USER_API } from "./apiURLs";
import { isAuthorized } from "../config/securityConfig";

/**
 * Login with the user to add user to list of users and update the last login date
 */
export function login(user) {
  if (user && user.roles && user.roles.length > 0 && isAuthorized(user.roles)) {
    //axios.post(`${USER_API.BASE_URL}?action=login`);
  }
}


