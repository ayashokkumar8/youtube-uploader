import React, { useContext, Suspense } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { Url } from "routes";
import { AppContext } from "AppContext";
import { PageLoading } from "template/PageLoading";
import MasterPage, { MasterPageLayoutProps } from "template/MasterPage";

type Props = {
  component: React.FC<any>;
} & RouteProps &
  MasterPageLayoutProps;

function PrivateRoute({
  component: Component,
  header,
  drawer,
  ...rest
}: Props) {
  const { isAuthenticated } = useContext(AppContext);

  if (!Component)
    throw new Error(`A component needs to be specified for path ${rest.path}`);

  return (
    <Route
      {...rest}
      render={renderProps =>
        isAuthenticated() ? (
          <MasterPage header={header} drawer={drawer}>
            <Suspense fallback={<PageLoading />}>
              <Component {...renderProps} />
            </Suspense>
          </MasterPage>
        ) : (
          <Redirect
            to={{
              pathname: Url.login,
              state: { from: renderProps.location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
