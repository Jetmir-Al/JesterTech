import { useState } from "react";
import { ToolTipContext, useToolTipHook } from "../../context/TooltipContext";
import type { IToolTipContentProps, IToolTipProps, IToolTipTriggerProps } from "../../types/IUiTypes";
import "./customToolTip.css";

export function ToolTip({ children }: IToolTipProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <ToolTipContext.Provider
      value={{
        isOpen: open,
        setIsOpen: setOpen
      }}
    >
      <div
        className="toolTip-container"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {children}
      </div>
    </ToolTipContext.Provider>
  );
}

export function ToolTipTrigger({ children }: IToolTipTriggerProps) {
  return (
    <div className="toolTipTrigger-container">
      {children}
    </div>
  );
}

export function ToolTipContent({ children, side }: IToolTipContentProps) {

  const { isOpen } = useToolTipHook();

  if (!isOpen) return null;

  return (
    <div className={`toolTipContent-container toolTipContent-container--${side}`}>
      {children}
    </div>
  );
}





