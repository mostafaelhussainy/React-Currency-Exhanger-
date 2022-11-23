type OutputProps = {
  result: string
  toCurrency: string
}

function OutputTo(props: OutputProps) {
  const { result, toCurrency } = props
  return ( 
    <>
      <div className="output-to">
        <h1>result: {result} {toCurrency} </h1>
      </div>
    </>
   );
}

export default OutputTo;