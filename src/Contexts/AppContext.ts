import { createContext } from "react";

interface IAppContext {
    path: 'login' | 'signup'
}
export const appContext = createContext<IAppContext>(null as any)