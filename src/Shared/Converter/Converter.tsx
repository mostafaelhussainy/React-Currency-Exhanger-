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
type ConverterProps = {
  amount: number
  exchangeRate: number
  onChangeAmount: (event: React.ChangeEvent<HTMLInputElement>) => void
  onChangeFromCurrency: (event: React.ChangeEvent<HTMLSelectElement>) => void
  onChangeToCurrency: (event: React.ChangeEvent<HTMLSelectElement>) => void
  handleSwap: () => void
  isEmpty: boolean
  currencyOptions: string[]
  fromCurrency: string
  toCurrency: string
} 

// V A R I A B L E S

function Converter(props: ConverterProps) {
  const { 
    amount,
    exchangeRate,
    onChangeAmount,
    onChangeFromCurrency,
    onChangeToCurrency,
    isEmpty,
    currencyOptions,
    fromCurrency,
    toCurrency,
    handleSwap,
  } = props

  const [result, setResult] = useState<number>()
  const [isConverted, setIsConverted] = useState<boolean>(false)

  function handleConvert() {
    // @ts-ignore
    // CHECKKKKKKKKKKKKKKKKKKKKKKKKKKK !!!!!!!!!!!!!!!!
    setResult(amount * exchangeRate)
    setIsConverted(true)
  }
  
  // I need to empty the result when the amount is zero or empty !!!!!!!!!!!!!

  return (
    <>
      <section className="Converter">
        <Amount 
          amount = {amount}
          onChangeAmount = {onChangeAmount}
        />
        <div className="currency-row">
          <div className="from">
            <h3 className="currency-title">From</h3>
            <CurrencyDropdown 
              currencyOptions = {currencyOptions}
              selectedCurrency = {fromCurrency}
              onChangeCurrency = {onChangeFromCurrency}
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
              onChangeCurrency = {onChangeToCurrency}
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