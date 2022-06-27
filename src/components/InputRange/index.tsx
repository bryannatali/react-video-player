import { InputHTMLAttributes } from 'react'

import { StyledInputRange } from './styles'

type InputRangeProps = InputHTMLAttributes<HTMLInputElement> & {
  percentage: number
}

export function InputRange({ percentage, onChange }: InputRangeProps) {
  return (
    <StyledInputRange
      // {...rest}
      className={`input-range ${percentage < 50 ? 'less-than-fifty' : ''} ${percentage === 0 ? 'no-progress' : ''}`}
      percentage={percentage}
      min={0}
      max={100}
      step={1}
      value={percentage}
      onChange={onChange}
    />
  )
}