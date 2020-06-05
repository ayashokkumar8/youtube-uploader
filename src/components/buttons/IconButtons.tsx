import React from "react";
import { ButtonProps, Button } from "@material-ui/core";
import styled from "styled-components";
import Icon from "./Icon";

type Props = {
  src: string;
} & ButtonProps;

const ClearStyledButton = styled(Button)`
  background-color: inherit;
  height: 48px;
  width: 48px;
`;
const SearchStyledButton = styled(Button)`
  margin: 0px !important;
  padding: 3px !important;
  top:-11px; /* era 3px, ma non va bene su safari dopo le ultime modifiche */
`;

const ThemeStyledButton = styled(Button)`
  background: #0aa89e 0% 0% no-repeat padding-box;
  &:hover {
    background: #0b958e 0% 0% no-repeat padding-box;
  }
  height: 48px;
  width: 48px;
  /* margin-left: -3px !important; */

  ${(p) => p.theme.breakpoints.down("xs")} {
    min-width: 20px !important;
  }
`;

export const IconButton = ({ src, ...rest }: Props) => (
  <ThemeStyledButton {...rest}>
    <Icon src={src} />
  </ThemeStyledButton>
);

export const ClearIconButton = ({ src, ...rest }: Props) => (
  <ClearStyledButton {...rest}>
    <Icon src={src} />
  </ClearStyledButton>
);
/*
export const SearchIconButton = (props: ButtonProps) => (
  <SearchStyledButton className="::i-block-chrome dex-mi-btn">
  <IconButton src="/images/icons/search.svg" {...props} />
  </SearchStyledButton>
);

export const AddIconButton = (props: ButtonProps) => (
  <SearchStyledButton>
  <IconButton src="/images/icons/add.svg" {...props} />
  </SearchStyledButton>
);

export const CloseIconButton = (props: ButtonProps) => (
  <ClearIconButton src="/images/icons/close.svg" {...props} />
);

export const RefreshIconButton = (props: ButtonProps) => (
  <IconButton src="/images/icons/refresh.svg" {...props} />
);

export const UploadIconButton = (props: ButtonProps) => (
  <SearchStyledButton className="::i-block-chrome dex-mi-btn">
  <IconButton src="/images/icons/interface.svg" {...props} />
  </SearchStyledButton>
);
*/