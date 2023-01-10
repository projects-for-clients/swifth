import { createContext, Dispatch, SetStateAction } from "react";


export type MessageType = 'error' | 'success'
interface IAuthContext {
  setStep: Dispatch<SetStateAction<number>>;
  step: number;
  errorMessage: string | null
  setErrorMessage: Dispatch<SetStateAction<string | null>>
}
export const AuthContext = createContext<IAuthContext>(null as any);

