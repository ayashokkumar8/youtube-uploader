import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";


const StyledConteiner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 140px;
  margin-bottom: 100px;
  width: 100%;
`;

export function PageLoading() {
  return (
    <StyledConteiner>
      <CircularProgress color="secondary" />
    </StyledConteiner>
  );
}

