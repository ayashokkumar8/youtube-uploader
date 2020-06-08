import React, { lazy, Suspense } from "react";
import { Switch, Redirect } from "react-router";
import PublicRoute from "routes/wrappers/PublicRoute";
import PrivateRoute from "routes/wrappers/PrivateRoute";
import { Url } from "routes";

const LoginPage = lazy(() => import("pages/login/LoginPage"));
const DashboardPage = lazy(() => import("pages/dashboard/DashboardPage"));



const Routes = () => (
    <Switch>
        <PublicRoute path={Url.login} drawer={false} header={false} component={LoginPage} />
        <PrivateRoute exact={true} path={Url.dashboard} component={DashboardPage} />

    </Switch>
);

export default Routes;