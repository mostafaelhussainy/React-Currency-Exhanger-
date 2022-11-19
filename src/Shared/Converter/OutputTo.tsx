type OutputProps = {
  result: number
}

function OutputTo(props: OutputProps) {
  const { result } = props
  return ( 
    <>
      <div className="output-to">
      <h1>result: {result}</h1>
      </div>
    </>
   );
}

export default OutputTo;