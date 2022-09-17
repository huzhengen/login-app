import classNames from 'classnames'

type Props = {
  disabled: boolean
  onClick: () => void
  children: string
}

export const Button = (props: Props) => {
  const {disabled, onClick, children} = props

  return (
    <button className={classNames('next', !disabled && 'active')}
            disabled={disabled} onClick={onClick}>{children}</button>
  )
}
