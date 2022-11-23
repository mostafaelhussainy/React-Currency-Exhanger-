type OutputFromToProps = {
  result: string
  amount: number
  toCurrency: string
  fromCurrency: string
  isConverted: boolean
}

function OutputFromTo(props:OutputFromToProps) {
  const { result, amount, toCurrency, fromCurrency, isConverted } = props
  return ( 
    <>
      <div className="output-from-to col-span-2">
        {isConverted && <h1>{`${amount} ${fromCurrency} - ${result} ${toCurrency}`}</h1>}
      </div>
    </>
   );
}

export default OutputFromTo;