import { createContext, Dispatch, SetStateAction } from "react";


export type MessageType = 'error' | 'success'
interface IAuthContext {
  setStep: Dispatch<SetStateAction<number>>;
  step: number;
  isMessage: boolean;
  setIsMessage: Dispatch<SetStateAction<boolean>>
  messageType?: MessageType;
  setMessageType: Dispatch<SetStateAction<MessageType>>
  message?: string;
  setMessage: Dispatch<SetStateAction<string>>
}
export const AuthContext = createContext<IAuthContext>(null as any);

