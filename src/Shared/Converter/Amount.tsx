type AmountProps = {
  amount: number
  onChangeAmount: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function Amount(props: AmountProps) {
  const { amount, onChangeAmount } = props
  return ( 
    <>
      <div className="ammout">
        <h1>Amount</h1>
         <input type="number" value={amount} onChange={onChangeAmount} />
      </div>
    </>
   );
}

export default Amount;