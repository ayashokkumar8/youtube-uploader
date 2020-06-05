import React from "react";
import MuiTypography, {
  TypographyProps as MuiTypographyProps
} from "@material-ui/core/Typography";
import styled from "styled-components";

export type StyledTypographyProps = {
  color?: string;
  fontWeight?: number | string;
  display?: string;
  fontFamily?: string;
  fontSize?: string;
} & Omit<MuiTypographyProps, "color" | "display">;

const StyledTypography = styled(
  ({ color, display, fontWeight, fontFamily, fontSize, ...props }) => (
    <MuiTypography {...props} />
  )
)<StyledTypographyProps>`
  color: ${p => p.color};
  display: ${p => p.display};
  font-weight: ${p => p.fontWeight};
  font-family: ${p => p.fontFamily};
  font-size: ${p => p.fontSize};
`;

export function Typography({ ...props }: StyledTypographyProps) {

  return <StyledTypography {...props} />;
}
