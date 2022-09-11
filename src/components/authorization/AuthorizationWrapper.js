import { useSelector } from "react-redux";

//Check if user have allowed roles return children passed otherwise return default component if specified
const AuthorizationWrapper = ({ children, allowedRoles ,defaultComponent=null }) => {
  const roles = useSelector((state) => state.user.roles);
  if ( roles && (roles.some(item => allowedRoles.includes(item)))) return children;
  else return defaultComponent ;
};


export default  AuthorizationWrapper;
