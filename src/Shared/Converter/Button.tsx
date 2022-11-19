type ButtonProps = {
  onClick?: () => void
  isEmpty?: boolean
} & React.ComponentProps<'button'>

function Button(props: ButtonProps) {
  const { onClick, isEmpty, children, ...rest } = props
  return ( 
    <button onClick={onClick} disabled={isEmpty}>{children ? children : 'Button'}</button>
   );
}

export default Button;