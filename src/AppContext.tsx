import React from "react";

export type User = {
    username: string;
}

export type AppContextModel = {
  account?: User;
  login: (account: User) => void;
  logout: Function;
  isAuthenticated: () => boolean;
  openMenu: boolean;
  setOpenMenu: (open: boolean) => void;
};

export const initialAppContext = {
  account: undefined,
  login: (account: User) => {},
  logout: () => {},
  isAuthenticated: () => false,
  openMenu: false,
  setOpenMenu: (open: boolean) => {}
}

export const AppContext = React.createContext<AppContextModel>(initialAppContext);
