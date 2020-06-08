import React, { Suspense, lazy, useState } from "react";
import "App.css";
import { Router } from "react-router-dom";
import {
  ThemeProvider as ThemeProviderMui,
  StylesProvider,
} from "@material-ui/styles";
import styled, { ThemeProvider } from "styled-components";
import theme from "themes/default";
import Routes from "routes";
import ScrollToTop from "routes/wrappers/ScrollToTop";
import { createBrowserHistory, BrowserHistoryBuildOptions } from "history";
import { AppContext, User, AppContextModel } from "AppContext";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import GlobalStyle from "GlobalStyle";
import {
  ReactQueryConfigProvider,
  ReactQueryProviderConfig,
} from "react-query";
import InitialAuthChecker from "routes/wrappers/InitialAuthChecker";
import { storage } from "services/storage";
import TopBarProgress from "react-topbar-progress-indicator";

const queryConfig: ReactQueryProviderConfig = {
  // Global
  suspense: false,
  useErrorBoundary: undefined, // Defaults to the value of `suspense` if not defined otherwise
  throwOnError: false,
  refetchAllOnWindowFocus: false,
  //queryKeySerializerFn: queryKey => [queryHash, queryFnArgs],
  // onMutate: () => {},
  // onSuccess: () => {},
  // onError: () => {},
  // onSettled: () => {},

  // useQuery
  retry: 2,
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  staleTime: 0,
  cacheTime: 5 * 60 * 1000,
  refetchInterval: false,
  //queryFnParamsFilter: args => filteredArgs,
  refetchOnMount: true,
};

TopBarProgress.config({
  barColors: {
    "0": "#0AA89E",
    "1.0": "#0AA89E"
  },
  shadowBlur: 5
});

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
export const history = createBrowserHistory({
  basename: baseUrl,
} as BrowserHistoryBuildOptions);

const App = () => {
  const [account, setAccount] = useState<User | undefined>();
  const [openMenu, setOpenMenu] = useState(false);

  const login = (account: User) => {
    setAccount(account);
  };
  const logout = () => {
    storage.clearAuthToken();
    setAccount(undefined);
  };
  const isAuthenticated = () => {
    return !!storage.getAuthToken();
  };

  const appContextValue: AppContextModel = {
    account,
    login,
    logout,
    isAuthenticated,
    openMenu,
    setOpenMenu,
  };

  return (
    <StylesProvider injectFirst>
      <ThemeProviderMui theme={theme}>
        <ThemeProvider theme={theme}>
          <GlobalStyle>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <ReactQueryConfigProvider config={queryConfig}>
                <AppContext.Provider value={appContextValue}>
                  <Router history={history}>
                    <InitialAuthChecker>
                      <ScrollToTop>
                        <Routes />
                      </ScrollToTop>
                    </InitialAuthChecker>
                  </Router>
                </AppContext.Provider>
              </ReactQueryConfigProvider>
            </MuiPickersUtilsProvider>
          </GlobalStyle>
        </ThemeProvider>
      </ThemeProviderMui>
    </StylesProvider>
  );
};

export default App;
