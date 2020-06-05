import React from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import LeftContent from "template/LeftContent";
import Drawer from "@material-ui/core/Drawer";
import HeaderContent from "template/HeaderContent";
import BodyContent from "template/BodyContent";
import { useLocation } from "react-router-dom";
//import { getBreads } from "routes";

const StyledMain = styled.div`
  flex: 0 0 100%;
  min-height: 400px;
`;

const StyledContent = styled.div`
  flex-grow: 1;
  max-width: 100%;
  width: calc(100% - 73px);
`;

const StyledFlexContainer = styled.div`
  display: flex;
`;

const ToolbarSpace = styled.div(p => p.theme.mixins.toolbar as any);

export type MasterPageLayoutProps = {
  drawer?: boolean;
  header?: boolean;
}

type Props = {
  children: JSX.Element;
} & MasterPageLayoutProps;

const MasterPage = ({ children, drawer = true, header = true }: Props) => {

  const location = useLocation();
  const title = "Mercitalia Logistics – " + getBreads(location.pathname).join(" – ")

  return (
    <div>
      <CssBaseline />

      <Helmet>
        <html lang="it" />
        <title>{title}</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no"
        />
        <meta http-equiv="content-type" content="text/html; charset=UTF-8" />
        <meta http-equiv="X-UA_Compatible" content="IE=edge" />
        <meta property="og:title" content="Mercitalia Logistics" />
        <meta
          property="og:image"
          content="https://www.mercitaliarail.it:443null"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.mercitaliarail.it/content/mercitalia_rail/it.html"
        />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      </Helmet>

      {header && <HeaderContent />}

      <StyledFlexContainer>
        {drawer && <LeftContent />}

        <StyledContent>
          {header && <ToolbarSpace />}
          <StyledMain id="#content">
            <BodyContent>{children}</BodyContent>
          </StyledMain>
        </StyledContent>
      </StyledFlexContainer>
    </div>
  );
};

export default MasterPage;
