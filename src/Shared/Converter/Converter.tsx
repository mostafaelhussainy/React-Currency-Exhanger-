// H O O K S
import { useState } from 'react'
import { Link } from 'react-router-dom';
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
  currencyOptions: string[]
  fromCurrency: string
  toCurrency: string
  isDisabled: boolean
  isHome?: boolean
  isFromDetails?: boolean
} 

// V A R I A B L E S

function Converter(props: ConverterProps) {
  const { 
    amount,
    exchangeRate,
    onChangeAmount,
    onChangeFromCurrency,
    onChangeToCurrency,
    currencyOptions,
    fromCurrency,
    toCurrency,
    handleSwap,
    isDisabled,
    isHome,
    isFromDetails
  } = props

  const [result, setResult] = useState<number>(0)
  const [isConverted, setIsConverted] = useState<boolean>(false)

  function handleConvert() {
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
              isDisabled = {isDisabled}
              isFromDetails = {isFromDetails}
            />
          </div>
          <Button
            onClick={handleSwap} 
            isDisabled = {isDisabled} 
          >
            Swap
          </Button>
          <div className="to">
            <h3 className="currency-title">To</h3>
            <CurrencyDropdown 
              currencyOptions = {currencyOptions}
              selectedCurrency = {toCurrency}
              onChangeCurrency = {onChangeToCurrency}
              isDisabled = {isDisabled}
            />
          </div>
        </div>
        <Button  
          onClick={handleConvert} 
          isDisabled = {isDisabled} 
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
        { isHome ? 
        <Link to={`/details-page/${fromCurrency}/${toCurrency}/${amount}`}>
          <Button>More Details</Button> 
        </Link>
        : <></> }
      </section>
    </>
  );
}

export default Converter;