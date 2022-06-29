import { createContext, useContext } from "react";
import { IUser } from "../Interfaces/backend";

export interface IAuthContext {
  user: IUser;
  onSignOut: () => void;
}

export const authContext = createContext<IAuthContext>({
  user: {
    name: "Anônimo",
    email: "",
  },
  onSignOut: () => {},
});

export function useAuthContext() {
  return useContext(authContext);
}
