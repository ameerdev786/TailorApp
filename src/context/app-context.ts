import React from "react";
import { IUseAuth } from "../types";


interface IRootState {
    auth: IUseAuth,
    sideMenuToggle: { isShow: boolean, hide: Function, toggle: Function, show: Function }
}

export const AppContext = React.createContext<IRootState>({} as any);