import {ChangeEvent} from 'react'
import classNames from "classnames";

type Props = {
  placeholder: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  isError: boolean
  type: string
  maxLength: number
}

export const Input = (props: Props) => {
  const {placeholder, onChange, isError, type, maxLength} = props
  return <input type={type} className={classNames(isError && 'error')}
                maxLength={maxLength} placeholder={placeholder} onChange={onChange}/>
}
