import { createContext, Dispatch, SetStateAction } from "react";


export type MessageType = 'error' | 'success'
interface IAuthContext {
  setStep: Dispatch<SetStateAction<number>>;
  step: number;
  notify: (message: string) => void
}
export const AuthContext = createContext<IAuthContext>(null as any);


interface IAuthContext {
  setStep: Dispatch<SetStateAction<number>>;
  step: number;
  notify: (message: string) => void;
}
export const AuthContext = createContext<IAuthContext>(null as any);

