type DropdownProps = {
  currencyOptions: string[]
  selectedCurrency: string
  onChangeCurrency: (event: React.ChangeEvent<HTMLSelectElement>) => void
  isEmpty: boolean
}

function CurrencyDropdown(props: DropdownProps) {

  const { currencyOptions, selectedCurrency, onChangeCurrency, isEmpty } = props
  return ( 
    <>
      <select value={selectedCurrency} onChange={onChangeCurrency} disabled={isEmpty}>
        {currencyOptions.map((option => 
        <>
          <option key={option} value={option}>{option} </option>
        </>
        ))}
      </select>
    </>
   );
}

export default CurrencyDropdown;