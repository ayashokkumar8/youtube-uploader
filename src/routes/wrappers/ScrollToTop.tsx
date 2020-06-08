import React, { useEffect, Fragment, ReactNode } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";

type Props = {
  children: ReactNode;
} & RouteComponentProps;

function ScrollToTop({ location: { pathname }, children }: Props) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <Fragment>{children}</Fragment>;
}

export default withRouter(ScrollToTop);
