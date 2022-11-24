type OutputProps = {
  result: string
  toCurrency: string
}

function OutputTo(props: OutputProps) {
  const { result, toCurrency } = props
  return ( 
    <>
      <div className="output-to col-span-2 sm:col-span-1">
        <h3>result: {result} {toCurrency} </h3>
      </div>
    </>
   );
}

export default OutputTo;