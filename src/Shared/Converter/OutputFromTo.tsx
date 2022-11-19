type OutputFromToProps = {
  result: number
  amount: number
  toCurrency: string
  fromCurrency: string
  isConverted: boolean
}

function OutputFromTo(props:OutputFromToProps) {
  const { result, amount, toCurrency, fromCurrency, isConverted } = props
  return ( 
    <>
      <div className="output-to">
        {isConverted && <h1>{`${amount} ${fromCurrency} - ${result} ${toCurrency}`}</h1>}
      </div>
    </>
   );
}

export default OutputFromTo;