export interface IButtonProps {
    children: React.ReactNode,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    type?: 'submit' | 'reset' | 'button',
    className: string
}