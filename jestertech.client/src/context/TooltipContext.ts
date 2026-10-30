import { createContext, useContext } from "react";
import type { IToolTipContext } from "../types/IUiTypes";


export const ToolTipContext = createContext<IToolTipContext | undefined>(undefined);

export function useToolTipHook() {
    const context = useContext(ToolTipContext);
    if (!context)
        throw new Error("ToolTip components must be wrapped inside <ToolTip>");
    return context;
}