import React, { lazy, Suspense } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { UN_AUTHORIZED, STORE_STOCK } from "./route-definitions";
import Loader from "../components/common/Loader";
import ProtectedRoute from "./ProtectedRoute";
import { ROLES_AUTHORIZED } from "../config/securityConfig";



// Import components/pages use lazy loading feature
const StoreStock = lazy(() => import("../pages/StoreStock/StoreStock"));
const UnAuthorized = lazy(() =>
  import("../components/UnAuthorized/UnAuthorized")
);
const NotFound = lazy(() => import("../components/NotFound/NotFound"));

function RoutesList({ loggedInUser }) {
  let location = useLocation();
  let background = location.state && location.state.background;
  // let source = location.state && location.state.source;
  //The `background` state is the location that we were at when one of
  // the request details links was clicked. If it's there,use it as the location for the <Switch> so
  // we show the gallery in the background, behind the modal.

  return (
    <>
      <Suspense fallback={<Loader open={true} />}>
        <Routes location={background || location}>
          <Route element={
            <ProtectedRoute allowedRoles={ROLES_AUTHORIZED.STORE_STOCK} authUser={loggedInUser} />
          }>
            <Route exact element={<StoreStock />} path={STORE_STOCK.LINK} />
          </Route>

          <Route exact element={<UnAuthorized />} path={UN_AUTHORIZED} />
          <Route element={<NotFound />} path="*" />
        </Routes>

      </Suspense>
    </>
  );
}

export default React.memo(RoutesList);
