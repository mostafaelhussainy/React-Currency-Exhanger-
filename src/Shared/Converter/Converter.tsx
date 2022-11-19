// H O O K S
import { useEffect, useState } from 'react'

// C O M P O N E N T S
import Amount from "./Amount";
import CurrencyDropdown from "./CurrencyDropdown";
import OutputFromTo from "./OutputFromTo";
import OutputTo from "./OutputTo";
import Button from "./Button";

// S T Y L I N G
import './Converter.css'

// D A T A    T Y P E


// V A R I A B L E S
const BASE_URL = 'https://v6.exchangerate-api.com/v6/84d5356a4a47f3ebc2632835/latest/USD'

function Converter() {
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>()
  const [toCurrency, setToCurrency] = useState<string>()
  const [amount, setAmount] = useState<number>()
  const [exchangeRate, setExchangeRate] = useState<number>()
  const [result, setResult] = useState<number>()
  const [isEmpty, setIsEmpty] = useState<boolean>(true)
  const [isConverted, setIsConverted] = useState<boolean>(false)

  console.log(fromCurrency, toCurrency)
  useEffect(() => {
    fetch(BASE_URL)
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
    fetch(`https://v6.exchangerate-api.com/v6/84d5356a4a47f3ebc2632835/pair/${fromCurrency}/${toCurrency}`)
      .then(res => res.json())
      .then(data => {
        setExchangeRate(data.conversion_rate)
      })
  },[fromCurrency, toCurrency] )

  function handleConvert() {
    // @ts-ignore
    // CHECKKKKKKKKKKKKKKKKKKKKKKKKKKK !!!!!!!!!!!!!!!!
    setResult(amount * exchangeRate)
    setIsConverted(true)
  }
  
  function handleSwap() {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    handleConvert()
  }

  // I need to empty the result when the amount is zero or empty !!!!!!!!!!!!!

  return (
    <>
      <section className="Converter">
        <Amount 
          amount = {amount}
          onChangeAmount = {event => {
            setAmount(parseInt(event.target.value))
            if (parseInt(event.target.value) > 0 && event.target.value) {
              setIsEmpty(false)
            } else {
              setIsEmpty(true)
            }
          }}
        />
        <div className="currency-row">
          <div className="from">
            <h3 className="currency-title">From</h3>
            <CurrencyDropdown 
              currencyOptions = {currencyOptions}
              selectedCurrency = {fromCurrency}
              onChangeCurrency = {event => setFromCurrency(event.target.value)}
              isEmpty = {isEmpty}
            />
          </div>
          <Button
            onClick={handleSwap} 
            isEmpty = {isEmpty} 
          >
            Swap
          </Button>
          <div className="to">
            <h3 className="currency-title">To</h3>
            <CurrencyDropdown 
              currencyOptions = {currencyOptions}
              selectedCurrency = {toCurrency}
              onChangeCurrency = {event => setToCurrency(event.target.value)}
              isEmpty = {isEmpty}
            />
          </div>
        </div>
        <Button  
          onClick={handleConvert} 
          isEmpty = {isEmpty} 
        >
          Convert
        </Button>
        <OutputFromTo 
          toCurrency = {toCurrency}
          fromCurrency = {fromCurrency}
          result =  {result}
          amount = {amount}
          isConverted = {isConverted}
        />
        <OutputTo 
          result =  {result}
          toCurrency = {toCurrency}
        />
        <Button />
      </section>
    </>
  );
}

export default Converter;