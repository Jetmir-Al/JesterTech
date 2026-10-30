

export interface IToolTipContentProps {
    children: React.ReactNode;
    side: "top" | "left" | "right" | "bottom"
}

export interface IToolTipTriggerProps {
    children: React.ReactNode;
}

export interface IToolTipProps {
    children: React.ReactNode;
}

export interface IToolTipContext {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
}
