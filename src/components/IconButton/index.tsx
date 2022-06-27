import { ButtonHTMLAttributes } from 'react'
import './styles.css'

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function IconButton({ children, ...rest }: IconButtonProps) {
  return (
    <button
      {...rest}
      className="icon-button"
    >
      {children}
    </button>
  )
}