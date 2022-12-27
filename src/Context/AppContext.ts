import { createContext, Dispatch, SetStateAction } from "react";

interface IAuthContext {
  setStep: Dispatch<SetStateAction<number>>;
}
export const AuthContext = createContext<IAuthContext>(null as any);

interface IAppContext {
    path: 'login' | 'signup'
}
export const AppContext = createContext<IAppContext>(null as any)