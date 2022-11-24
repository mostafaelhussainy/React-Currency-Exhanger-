type AmountProps = {
  amount: number
  onChangeAmount: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function Amount(props: AmountProps) {
  const { amount, onChangeAmount } = props
  return ( 
    <>
      <div className="ammout">
        <h3>Amount</h3>
         <input type="number" value={amount} onChange={onChangeAmount} min='0'/>
      </div>
    </>
   );
}

export default Amount;