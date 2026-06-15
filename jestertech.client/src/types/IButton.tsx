export interface IButtonProps {
    children: React.ReactNode,
    onClick?: (e: Event) => void,
    type?: 'submit' | 'reset' | 'button',
    className: string
}