type DropdownProps = {
  currencyOptions: string[]
  selectedCurrency: string
  onChangeCurrency: (event: React.ChangeEvent<HTMLSelectElement>) => void
  isDisabled: boolean
  isDetails?: boolean
  isFromDetails?: boolean
}

function CurrencyDropdown(props: DropdownProps) {

  const { currencyOptions, selectedCurrency, onChangeCurrency, isDisabled, isFromDetails } = props

  return ( 
    <>
      <select 
      value={selectedCurrency} 
      onChange={onChangeCurrency} 
      disabled = {isFromDetails ? isFromDetails : isDisabled}
      >
        {currencyOptions.map((option => 
        <>
          <option key={option} value={option} selected= {selectedCurrency == option ? true : false}>{option} </option>
        </>
        ))}
      </select>
    </>
   );
}

export default CurrencyDropdown;