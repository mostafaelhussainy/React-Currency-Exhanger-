import Converter from "../Shared/Converter/Converter";
import { Chart } from "./Chart/Chart";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// T Y P E S
type DetailParams = {
  from: string
  to: string
  am: string
  resu: string
}

function DetailsPage() {

  // P A R A M S
  const { from, to, am, resu } = useParams<DetailParams>()

  // V A R I A B L E S
  const isHome: boolean = false
  const isFromDetails: boolean = true
  const monthsCalender: number[] = [31,28,31,30,31,30,31,31,30,31,30]
  
  // U S E - S T A T E S
  const [historicalData, setHistoricalData] = useState<number[]>([])
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>('EUR')
  const [toCurrency, setToCurrency] = useState<string>('USD')
  const [amount, setAmount] = useState<number>(0)
  const [exchangeRate, setExchangeRate] = useState<number>(0)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [topCurrencies, setTopCurrencies] = useState<{}>({})
  const [result, setResult] = useState<string>('')
  const [isConverted, setIsConverted] = useState<boolean>(false)
  const filterArray = ['USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'CHF', 'EGP', 'HKD']
  

  // U S E - E F F E C T S

  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/582e1a6458049a3cbfd3b2f5/latest/${fromCurrency}`)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.conversion_rates)[146]
        setCurrencyOptions(Object.keys(data.conversion_rates))
        setFromCurrency(Object.keys(data.conversion_rates)[0])
        setToCurrency(Object.keys(data.conversion_rates)[146])
        setExchangeRate(data.conversion_rates[firstCurrency])
        filterResults(data.conversion_rates)
      })
      if ( to && from && am && resu) {
        setToCurrency(to)
        setFromCurrency(from)
        setAmount(parseInt(am))
        setResult(resu)
        setIsConverted(true)
        setIsDisabled(false)
      }
  },[])


  // Change the exchange rate depending on swapping between options

  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/582e1a6458049a3cbfd3b2f5/pair/${fromCurrency}/${toCurrency}`)
      .then(res => res.json())
      .then(data => {
        setExchangeRate(data.conversion_rate)
      })
      if ( to && from && am && resu) {
        setToCurrency(to)
        setFromCurrency(from)
        setAmount(parseInt(am))
        setResult(resu)
        setIsConverted(true)
        setIsDisabled(false)
      }
  },[fromCurrency, toCurrency])
  
  
    // Change the top currencies depending on the change of the base currency 
  
    useEffect(()=> {
      fetch(`https://v6.exchangerate-api.com/v6/582e1a6458049a3cbfd3b2f5/latest/${fromCurrency}`)
      .then(res => res.json())
      .then(data => {
        filterResults(data.conversion_rates)
      })
      if ( to && from && am && resu) {
        setToCurrency(to)
        setFromCurrency(from)
        setAmount(parseInt(am))
        setResult(resu)
        setIsConverted(true)
        setIsDisabled(false)
      }
    },[fromCurrency])


  // F U N C T I O N S

  function filterResults(currencyFullOptions: {}) {
    const filtered: [string, unknown][] = (Object.entries(currencyFullOptions)).filter(([key, value]) => filterArray.includes(key));
    setTopCurrencies(Object.fromEntries(filtered));
  }

  function handleSwap() {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setResult('')
  }

  function onChangeAmount (event: React.ChangeEvent<HTMLInputElement>): void {
    if (isConverted) {
      setAmount(parseInt(event.target.value))
      setResult((parseInt(event.target.value) * exchangeRate).toPrecision(4))
    } else {
      setIsConverted(true)
      if (parseInt(event.target.value) > 0 && event.target.value) {
        setIsDisabled(false)
      } else if (0 >= parseInt(event.target.value)){
        setIsDisabled(true)
      }
    }
  }

  function handleConvert() {
    setResult((amount * exchangeRate).toPrecision(4))
    setIsConverted(true)
  }

  function onChangeFromCurrency (event: React.ChangeEvent<HTMLSelectElement>) {
    setFromCurrency(event.target.value)
    setIsConverted(false)
    setAmount(0)
    setResult('')
  }

  function onChangeToCurrency (event: React.ChangeEvent<HTMLSelectElement>) {
    setToCurrency(event.target.value)
    setIsConverted(false)
    setAmount(0)
    setResult('')
  }
  
  
  return ( 
    <>
      <Converter 
        amount={amount}
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        handleSwap={handleSwap}
        isHome={isHome}
        handleConvert = {handleConvert}
        result = {result}
        isConverted = {isConverted}
        isFromDetails = {isFromDetails}
        onChangeFromCurrency = {onChangeFromCurrency}
        onChangeToCurrency = {onChangeToCurrency}
        onChangeAmount = {onChangeAmount}
        exchangeRate = {exchangeRate}
        currencyOptions = {currencyOptions}
        isDisabled = {isDisabled}
      />
      <Chart 
        historicalData = {historicalData}
        monthsCalender = {monthsCalender}
        toCurrency={toCurrency}
      />
    </>
   );
}

export default DetailsPage;