import Converter from "../Shared/Converter/Converter";
import Chart from "./Chart/Chart";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

type DetailParams = {
  from: string
  to: string
  am: number
}

function DetailsPage() {

  // P A R A M S
  const { from, to, am } = useParams<DetailParams>()

  // V A R I A B L E S
  const isHome: boolean = false
  const isFromDetails: boolean = true

  // U S E - S T A T E S
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>('EUR')
  const [toCurrency, setToCurrency] = useState<string>('USD')
  const [amount, setAmount] = useState<number>(am)
  const [exchangeRate, setExchangeRate] = useState<number>(0)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)

  // F U N C T I O N S

  function handleSwap() {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  function onChangeAmount (event: React.ChangeEvent<HTMLInputElement>): void {
    setAmount(parseInt(event.target.value))
    if (parseInt(event.target.value) > 0 && event.target.value) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
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
    fetch(`https://v6.exchangerate-api.com/v6/84d5356a4a47f3ebc2632835/latest/${fromCurrency}`)
      .then(res => res.json())
      .then(data => {
        console.log(Object.keys(data.conversion_rates))
        const firstCurrency = Object.keys(data.conversion_rates)[0]
        setCurrencyOptions(Object.keys(data.conversion_rates))
        setFromCurrency(Object.keys(data.conversion_rates)[0])
        setToCurrency(Object.keys(data.conversion_rates)[146])
        setExchangeRate(data.conversion_rates[firstCurrency])
        if (from && to && am) {
          setAmount(am)
          setFromCurrency(from)
          setToCurrency(to)
        }
      })
  },[])


  // Change the exchange rate depending on swapping between options

  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/84d5356a4a47f3ebc2632835/pair/${fromCurrency}/${toCurrency}`)
      .then(res => res.json())
      .then(data => {
        setExchangeRate(data.conversion_rate)
      })
      if (from && to && am) {
        setAmount(am)
        setFromCurrency(from)
        setToCurrency(to)
      }
  },[toCurrency])


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
        isHome={isHome}
        isFromDetails={isFromDetails}
      />
      <Chart />
    </>
   );
}

export default DetailsPage;