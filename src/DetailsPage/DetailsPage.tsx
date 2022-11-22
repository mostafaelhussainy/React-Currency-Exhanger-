import Converter from "../Shared/Converter/Converter";
import { Chart } from "./Chart/Chart";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// T Y P E S
type DetailParams = {
  from: string
  to: string
  am: number
}

function DetailsPage() {

  // P A R A M S
  const { from, to, am } = useParams<DetailParams | any>()

  // V A R I A B L E S
  const isHome: boolean = false
  const isFromDetails: boolean = true
  const monthsCalender: number[] = [31,28,31,30,31,30,31,31,30,31,30]
  
  // U S E - S T A T E S
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>('EUR')
  const [toCurrency, setToCurrency] = useState<string>('USD')
  const [amount, setAmount] = useState<number>(0)
  const [exchangeRate, setExchangeRate] = useState<number>(0)
  const [isDisabled, setIsDisabled] = useState<boolean>(true)
  const [historicalData, setHistoricalData] = useState<number[]>([])

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

  function changingChartData() {
    let rates: number[] = [];

    let myHeaders = new Headers();
    myHeaders.append("apikey", "A3fg43rIt5HiCQjKqQx8Xxrjmo0jjpku");

    let requestOptions: {} = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    fetch("https://api.apilayer.com/fixer/2013-12-24?symbols=USD&base=EUR", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

    // monthsCalender.map((days:number,index:number)=>{
    //   })
    // setHistoricalData(rates)
  }
  // U S E - E F F E C T S

  // render pre-selected currencies from home page

  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/ff483db4f3522f7aee355415/latest/${fromCurrency}`)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.conversion_rates)[0]
        setCurrencyOptions(Object.keys(data.conversion_rates))
        setFromCurrency(Object.keys(data.conversion_rates)[0])
        setToCurrency(Object.keys(data.conversion_rates)[146])
        setExchangeRate(data.conversion_rates[firstCurrency])
        if (from && to && am) {
          // setAmount(am)
          setFromCurrency(from)
          setToCurrency(to)
        }
      })
      changingChartData()
  },[])



  useEffect(() => {
    // Change the exchange rate depending on swapping between options
    fetch(`https://v6.exchangerate-api.com/v6/ff483db4f3522f7aee355415/pair/${fromCurrency}/${toCurrency}`)
      .then(res => res.json())
      .then(data => {
        setExchangeRate(data.conversion_rate)
      })
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
      <Chart 
        historicalData = {historicalData}
        monthsCalender = {monthsCalender}
        toCurrency={toCurrency}
      />
    </>
   );
}

export default DetailsPage;