import React from "react";
import MuiIcon, { IconProps } from "@material-ui/core/Icon";
import styled from "styled-components";

const Icon = styled(({ button, src, height, width, margin, ...rest }) => (
  <MuiIcon {...rest} />
))<Props>`
  text-align: center;
  display: inline-block;
  margin: ${p => p.margin ?? "auto"};
  height: ${p => p.height ?? "20px"};
  width: ${p => p.width ?? "20px"};
  ${p => p.button && `cursor: pointer;`}
  background-image: url('${p => p.src}');
  background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
`;

type Props = {
  src: string;
  button?: boolean;
  heght?: string;
  width?: string;
} & IconProps;

export default Icon;

type TableIconType = {
  src: string;
  button?: boolean;
} & IconProps

export const TableIcon = (props: TableIconType) => (
  <Icon width="20px" height="20px" margin="4px" button {...props} />
)
