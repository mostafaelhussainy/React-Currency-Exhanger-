type ButtonProps = {
  onClick?: () => void
  isEmpty?: boolean
}

function Button(props: ButtonProps) {
  const { onClick, isEmpty } = props
  return ( 
    <button onClick={onClick} disabled={isEmpty}>Button</button>
   );
}

export default Button;