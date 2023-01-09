import { createContext, Dispatch, SetStateAction } from "react";


export type MessageType = 'error' | 'success'
interface IAuthContext {
  setStep: Dispatch<SetStateAction<number>>;
  step: number;
  errorMessage: string
  setErrorMessage: Dispatch<SetStateAction<string>>
}
export const AuthContext = createContext<IAuthContext>(null as any);

