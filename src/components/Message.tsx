export const Message = (props: { children: string, className: string }) => {
  const {className, children} = props
  return <span className={className}>{children}</span>
}
