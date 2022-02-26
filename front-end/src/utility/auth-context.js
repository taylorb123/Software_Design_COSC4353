import { createContext } from "react";

export const AuthContext = createContext({
  username: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});
