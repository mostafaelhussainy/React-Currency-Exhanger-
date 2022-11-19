import Converter from "../Shared/Converter/Converter";
import CardsGrid from "./CardsGrid/CardsGrid";
import { useState, useEffect } from "react";

const BASE_URL = 'https://v6.exchangerate-api.com/v6/84d5356a4a47f3ebc2632835/latest/USD'

function Home() {
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>()
  const [toCurrency, setToCurrency] = useState<string>()
  const [amount, setAmount] = useState<number>()
  const [exchangeRate, setExchangeRate] = useState<number>()
  const [isEmpty, setIsEmpty] = useState<boolean>(true)


  console.log(fromCurrency, toCurrency)
  useEffect(() => {
    // fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.conversion_rates)[43]
        setCurrencyOptions(Object.keys(data.conversion_rates))
        setFromCurrency(Object.keys(data.conversion_rates)[43])
        setToCurrency(Object.keys(data.conversion_rates)[0])
        setExchangeRate(data.conversion_rates[firstCurrency])
      })
  },[])

  useEffect(() => {
    // fetch(`https://v6.exchangerate-api.com/v6/84d5356a4a47f3ebc2632835/pair/${fromCurrency}/${toCurrency}`)
      .then(res => res.json())
      .then(data => {
        setExchangeRate(data.conversion_rate)
      })
  },[fromCurrency, toCurrency] )

  function handleSwap() {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  function onChangeAmount (event: React.ChangeEvent<HTMLInputElement>): void {
    setAmount(parseInt(event.target.value))
    if (parseInt(event.target.value) > 0 && event.target.value) {
      setIsEmpty(false)
    } else {
      setIsEmpty(true)
    }
  }

  function onChangeFromCurrency (event: React.ChangeEvent<HTMLSelectElement>) {
    setFromCurrency(event.target.value)
  }

  function onChangeToCurrency (event: React.ChangeEvent<HTMLSelectElement>) {
    setToCurrency(event.target.value)
  }

  return (
    <>
      <Converter 
        amount={amount}
        exchangeRate={exchangeRate}
        onChangeAmount={onChangeAmount}
        onChangeFromCurrency={onChangeFromCurrency}
        onChangeToCurrency={onChangeToCurrency}
        isEmpty={isEmpty}
        currencyOptions={currencyOptions}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        handleSwap={handleSwap}
      />
      <CardsGrid />
    </>
  );
}

export default Home;