type CardsGridProps = {
  topCurrencies: {}
  amount: number
}

function CardsGrid(props: CardsGridProps) {
  const { topCurrencies, amount } = props
  const filtered: [string, number][] = (Object.entries(topCurrencies));
  // const currenciesNamesArray:string[] = []
  // const currenciesexchangeArray:number[] = []
  // Object.keys(topCurrencies).forEach((currency:string)=>{
  //   currenciesNamesArray.push(currency)
  // })
  // Object.values(topCurrencies).forEach((rate:any)=>{
  //   currenciesexchangeArray.push(rate)
  // })
  return ( 
    <>
      <section className="top-currencies">
        {
          filtered.map((currency)=>{
            return (
              <h1>{currency[0]} : {currency[1] * amount}</h1>
            )
          })
        }
      </section>
    </>
   );
}

export default CardsGrid;