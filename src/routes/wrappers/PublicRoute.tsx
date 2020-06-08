import React, { Suspense } from "react";
import { Route, RouteProps } from "react-router-dom";
import { PageLoading } from "template/PageLoading";
import MasterPage, { MasterPageLayoutProps } from "template/MasterPage";

type Props = {
  component: React.FC<any>;
} & RouteProps & MasterPageLayoutProps;

export default function PublicRoute({ component: Component, header, drawer, ...rest }: Props) {
  if (!Component)
    throw new Error(`A component needs to be specified for path ${rest.path}`);

  return (
    <Route
      {...rest}
      render={(renderProps: any) => (
        <MasterPage header={header} drawer={drawer}>
          <Suspense fallback={<PageLoading />}>
            <Component {...renderProps} />
          </Suspense>
        </MasterPage>
      )}
    />
  );
}
