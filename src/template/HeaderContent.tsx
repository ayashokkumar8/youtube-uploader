import React, { useContext } from "react";
import styled from "styled-components";
import Icon from "components/buttons/Icon";
import { AppContext } from "AppContext"; 
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import {Typography} from "components/text/Typography";
import Breadcrumbs, {BreadcrumbsProps} from "@material-ui/core/Breadcrumbs";
import { useLocation } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
//import { getBreads } from "routes";

const Logo = styled.img`
  flex-grow: 1;
  max-height: 100%;
  height: 30px;
  visibility: hidden;
  ${p => p.theme.breakpoints.down("xs")} {
    visibility: visible;
  }
`;

const StyledAppBar = styled(AppBar)`
  z-index: ${p => p.theme.zIndex.drawer - 1};
  color: black;
  background-color: ${p => p.theme.palette.background.paper};
  ${p => p.theme.breakpoints.down("xs")} {
    z-index: ${p => p.theme.zIndex.drawer + 1};
  }
`;

const MenuIconButton = styled(Icon)`
  visibility: hidden;
  ${p => p.theme.breakpoints.down("xs")} {
    visibility: visible;
  }
`;

const AvatarIconButton = styled(Icon)`
  height: 35px;
  width: 35px;
  margin-left: 20px;
`;
const BreadcrumbsLabel = styled(Typography)`
  font-size:1.1rem;
  font-weight: 600;
`;

const Navigation = (props: BreadcrumbsProps) => {
  const location = useLocation();
  const theme = useTheme();
  
  const breads = getBreads(location.pathname)

  return (
    <Breadcrumbs {...props} aria-label="breadcrumb">
      {breads.map((bread, index) => {
        const last = index === breads.length - 1;
        return last ? (
          <BreadcrumbsLabel color={theme.palette.text.primary} key={bread}>
            {bread}
          </BreadcrumbsLabel>
        ) : (
          <Typography color={theme.palette.text.secondary} key={bread}>
            {bread}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
};

const StyledNavigation = styled(Navigation)`
  margin-left: 42px;
  ${p => p.theme.breakpoints.down("xs")} {
    display: none;
  }
`
const StyledTypography = styled(Typography)`
  ${p => p.theme.breakpoints.down("xs")} {
    display: none;
  }
`

const HeaderContent = () => {
  const { openMenu, setOpenMenu } = useContext(AppContext);

  return (
    <StyledAppBar elevation={0} position="fixed">
      <Toolbar>
      <MenuIconButton
          button
          onClick={() => setOpenMenu(true)}
          src="/images/icons/menu.svg"
        />
        <StyledNavigation />      
        <Logo src="/images/Mercitalia Logistics.svg" />
        <StyledTypography>Help Desk</StyledTypography>
        <AvatarIconButton src="/images/icons/profile.svg" />
      </Toolbar>
    </StyledAppBar>
  );
};

export default HeaderContent;
