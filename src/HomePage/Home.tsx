import Converter from "../Shared/Converter/Converter";
import CardsGrid from "./CardsGrid/CardsGrid";
import { useState, useEffect } from "react";

// S T Y L I N G
import './Home.css'

function Home() {
  const isHome: boolean = true
  // U S E - S T A T E S
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>('EUR')
  const [toCurrency, setToCurrency] = useState<string>('USD')
  const [amount, setAmount] = useState<number>(0)
  const [exchangeRate, setExchangeRate] = useState<number>(0)
  const [topCurrencies, setTopCurrencies] = useState<{}>({})
  const filterArray = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'EGP', 'HKD']
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  // F U N C T I O N S

  function filterResults(currencyFullOptions: {}) {
    const filtered: [string, unknown][] = (Object.entries(currencyFullOptions)).filter(([key, value]) => filterArray.includes(key));
    setTopCurrencies(Object.fromEntries(filtered));
  }

  function handleSwap() {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  function onChangeAmount (event: React.ChangeEvent<HTMLInputElement>): void {
    setAmount(parseInt(event.target.value))
    if (parseInt(event.target.value) > 0 && event.target.value) {
      setIsDisabled(false)
    } else {
      setIsDisabled(false)
    }
  }

  function onChangeFromCurrency (event: React.ChangeEvent<HTMLSelectElement>) {
    setFromCurrency(event.target.value)
  }

  function onChangeToCurrency (event: React.ChangeEvent<HTMLSelectElement>) {
    setToCurrency(event.target.value)
  }

  // U S E - E F F E C T S

  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/ff483db4f3522f7aee355415/latest/${fromCurrency}`)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.conversion_rates)[0]
        setCurrencyOptions(Object.keys(data.conversion_rates))
        setFromCurrency(Object.keys(data.conversion_rates)[0])
        setToCurrency(Object.keys(data.conversion_rates)[146])
        setExchangeRate(data.conversion_rates[firstCurrency])
        // setCurrencyFullOptions(data.conversion_rates)
        filterResults(data.conversion_rates)
      })
  },[])


  // Change the exchange rate depending on swapping between options

  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/ff483db4f3522f7aee355415/pair/${fromCurrency}/${toCurrency}`)
      .then(res => res.json())
      .then(data => {
        setExchangeRate(data.conversion_rate)
      })
  },[fromCurrency, toCurrency])


  // Change the top currencies depending on the change of the base currency 

  useEffect(()=> {
    fetch(`https://v6.exchangerate-api.com/v6/ff483db4f3522f7aee355415/latest/${fromCurrency}`)
    .then(res => res.json())
    .then(data => {
      filterResults(data.conversion_rates)
    })
  },[fromCurrency])

  return (
    <>
      <Converter 
        amount={amount}
        exchangeRate={exchangeRate}
        onChangeAmount={onChangeAmount}
        onChangeFromCurrency={onChangeFromCurrency}
        onChangeToCurrency={onChangeToCurrency}
        isDisabled={isDisabled}
        currencyOptions={currencyOptions}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        handleSwap={handleSwap}
        isHome = {isHome}
      />
      <CardsGrid 
        topCurrencies={topCurrencies}
        amount={amount}
      />
    </>
  );
}

export default Home;