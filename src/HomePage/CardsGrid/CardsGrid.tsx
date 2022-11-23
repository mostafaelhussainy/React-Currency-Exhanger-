import './CardsGrid.css'

type CardsGridProps = {
  topCurrencies: {}
  amount: number
  flags: {
    cur: string
  }
}
function CardsGrid(props: CardsGridProps) {
  const { topCurrencies, amount, flags } = props
  const filtered: [string, number][] = (Object.entries(topCurrencies));
  const countryFlags: string[] = []
  const countryName: string[] = []
  const currencyName: string[] = []
  return ( 
    <>
      <section className="top-currencies container mx-auto">
        <div className="currencies-grid mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          {
            filtered.map((currency,index) => {
              let cur: string = currency[0]
              return (
                <>    
                  <div className="currency-card grid grid-cols-2 justify-items-center">
                    <div className="card-text">
                      <h3>{flags[cur][1]}</h3>
                      <h3 key={currency[0]}>{flags[cur][2]}</h3>
                      <h3>{currency[1] * amount}</h3>
                    </div>
                    <img
                      src={`https://flagcdn.com/${flags[cur][0]}.svg`}
                      width="100"
                    />
                  </div>
                </>
              )
            })
          }
        </div>
      </section>
    </>
   );
}

export default CardsGrid;