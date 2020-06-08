import React from "react";
import MuiTextField, { TextFieldProps } from "@material-ui/core/TextField";
import styled from "styled-components";

const StyledTextField = styled(MuiTextField)`
  & .MuiInputBase-root {
    background-color: white;
    min-height: 50px;
  }
`;

export type FieldProps =  {error?: any} & Omit<TextFieldProps, "error">

export const TextField = ({helperText, ...props}: FieldProps) => (
  <StyledTextField helperText={helperText ?? " "} {...props} variant="outlined" />
);
