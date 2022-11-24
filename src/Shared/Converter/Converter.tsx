// H O O K S
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
  handleConvert: () => void
  currencyOptions: string[]
  fromCurrency: string
  toCurrency: string
  isDisabled: boolean
  isHome?: boolean
  isFromDetails?: boolean
  isConverted: boolean
  result: string
} 

// V A R I A B L E S

function Converter(props: ConverterProps) {
  const { 
    amount,
    onChangeAmount,
    onChangeFromCurrency,
    onChangeToCurrency,
    handleConvert,
    handleSwap,
    currencyOptions,
    fromCurrency,
    toCurrency,
    isDisabled,
    isHome,
    isFromDetails,
    result,
    isConverted,
  } = props
  
  // I need to empty the result when the amount is zero or empty !!!!!!!!!!!!!

  return (
    <>
      <section className="Converter container">
        <div className="title grid grid-cols-2">
        { isHome ? 
           <h1 className='col-span-2'>Currency Exchanger</h1>
          : 
          <>
            <h3>{fromCurrency}</h3>
            <Link className="details-btn" to={`/React-Currency-Exhanger-/`}>
            <Button
              isDisabled = {isDisabled} 
            >Back to home</Button> 
          </Link> 
          </>
        }
        </div>
        <div className="converter-container mx-auto grid grid-cols-1 sm:grid-cols-2 justify-items-stretch">
          <div className="amount text-center">
            <Amount 
              amount = {amount}
              onChangeAmount = {onChangeAmount}
            />
          </div>
          <div className="currency-row grid grid-cols-3 justify-items-center gap-y-6">
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
            <div className="swap-btn">
              <Button
                onClick={handleSwap} 
                isDisabled = {isDisabled} 
              >Swap</Button>
            </div>
            <div className="to">
              <h3 className="currency-title">To</h3>
              <CurrencyDropdown 
                currencyOptions = {currencyOptions}
                selectedCurrency = {toCurrency}
                onChangeCurrency = {onChangeToCurrency}
                isDisabled = {isDisabled}
              />
            </div>
            <div className="convert-btn col-span-3">
              <Button  
                onClick={handleConvert} 
                isDisabled = {isDisabled} 
              >Convert</Button>
            </div>
          </div>
        </div>
        <div className="output-container grid grid-cols-2 sm:grid-cols-4">
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
          <Link className="details-btn" to={`/details-page/${fromCurrency}/${toCurrency}/${amount}/${result}`}>
            <Button
              isDisabled = {isDisabled} 
            >More Details</Button> 
          </Link>
          : <></> }
        </div>
      </section>
    </>
  );
}

export default Converter;