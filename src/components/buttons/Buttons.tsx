import React from "react";
import Button from "@material-ui/core/Button";
import styled, { css } from "styled-components";

const sharedStyle = css`
  width: 170px;
  height: 55px;
  border-radius: 5px;
  ${p => p.theme.breakpoints.down("lg")} {
    width: 130px;
    height: 50px;
  }
  ${p => p.theme.breakpoints.down("xs")} {
    width: 125px;
    height: 45px;
    text-align: center;
  }

`;

const disabledStyle = css`
  &:disabled {
    background: #b5b7ba 0% 0% no-repeat padding-box;
    border: 2px solid #b5b7ba;
    color: #e5e6e6;
  }
`;

export const GreyButton = styled(Button).attrs({
  variant: "contained"
})`
  background: #0e1822 0% 0% no-repeat padding-box;
  border: 2px solid #0d0c13;
  &:hover {
    background: #2d363f 0% 0% no-repeat padding-box;
  }
  ${disabledStyle}
  ${sharedStyle}
`;

export const GreenButton = styled(Button).attrs({
  variant: "contained"
})`
  background: #0aa89e 0% 0% no-repeat padding-box;
  border: 2px solid #0aa89e;
  &:hover {
    background: #0b958e 0% 0% no-repeat padding-box;
  }
  ${disabledStyle}
  ${sharedStyle}
`;


export const RedButton = styled(Button).attrs({
  variant: "contained"
})`
  background: #cc0000 0% 0% no-repeat padding-box;
  border: 2px solid #cc0000;
  &:hover {
    background: #b40304 0% 0% no-repeat padding-box;
  }
  ${disabledStyle}
  ${sharedStyle}
`;

export const GreyBorderButton = styled(Button).attrs({
  variant: "outlined"
})`
  border: 2px solid #0d0c13;
  color: #000000;
  ${disabledStyle}
  ${sharedStyle}
`;

export const GreenBorderButton = styled(Button).attrs({
  variant: "outlined"
})`
  border: 2px solid #0aa89e;
  color: #000000;
  ${disabledStyle}
  ${sharedStyle}
`;
