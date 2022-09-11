import { Navigate, Outlet } from 'react-router-dom'
import React from 'react'
import { UN_AUTHORIZED } from "./route-definitions";

const ProtectedRoute = ({
  component: Component,
  children,
  allowedRoles,
  authUser,
  ...rest
}, props) => {

  // not logged in so Navigate  to login page with the return url
  if (!authUser) {
    return (<Navigate to={{ pathname: '/', state: { from: props.location } }} />);
  }

  // check if route is restricted by role or no roles defined for user
  if (allowedRoles && !allowedRoles?.some((r) => authUser.roles.includes(r))
  ) {
    return (<Navigate to={{ pathname: UN_AUTHORIZED, state: { from: props.location } }} />)
  }

  return <Outlet />
}

export default React.memo(ProtectedRoute);
