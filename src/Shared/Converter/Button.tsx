type ButtonProps = {
  onClick?: () => void
  isDisabled?: boolean
} & React.ComponentProps<'button'>

function Button(props: ButtonProps) {
  const { onClick, isDisabled, children, ...rest } = props
  return ( 
    <button onClick={onClick} disabled={isDisabled}>{children ? children : 'Button'}</button>
   );
}

export default Button;