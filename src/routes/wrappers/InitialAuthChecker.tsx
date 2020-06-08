import React, { useMemo, useRef, useContext } from "react";
import { useQuery, queryCache } from "react-query";
import { AppContext, User } from "AppContext";
import { AxiosResponse } from "axios";
import fetch, { TokenStatus } from "services/fetch";
import { storage } from "services/storage";

type Props = {
  children: JSX.Element;
};



const InitialAuthChecker = ({ children }: Props) => {
  const { account, login, logout, isAuthenticated } = useContext(AppContext);
  const init = useRef(false);

  const parsedToken = storage.getAuthTokenParsed();

  /* const {
    data,
    error,
    isFetching,
  } = useQuery<AxiosResponse<User>, string>(
    parsedToken?.status === TokenStatus.OK && "account",
    async () => await fetch.get("/account"),
    { cacheTime: 0 }
  );

  if(!isFetching && !init.current && !error){
    if (data?.data?.username) {
      login(data.data);
    } else if (isAuthenticated()) {
      queryCache.clear()
      logout();
    }

    init!.current = true;
  }
*/
  return children;
};

export default InitialAuthChecker;
