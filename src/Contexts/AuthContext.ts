import { Dispatch, SetStateAction, createContext } from "react";

interface IAuthContext {
  setStep: Dispatch<SetStateAction<number>>;
}
export const AuthContext = createContext<IAuthContext>(null as any);
