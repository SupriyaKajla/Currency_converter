import React, { useState } from 'react';

function App() {
  const [convertedAmount, setConvertedAmount] = useState('');

  const handleSubmit = async (event: any) => {
        event.preventDefault();
    
        const baseCurrency = event.target.baseCurrency.value;
        const targetCurrency = event.target.targetCurrency.value;
        const amount = event.target.amount.value;
        try {
          let res = await fetch(`http://localhost:8080/currency/?baseCurrency=${baseCurrency}&targetCurrency=${targetCurrency}&amount=${amount}`, {method: "GET"});
          let resJson = await res.json();
          if (res.status === 200) {
            setConvertedAmount(resJson);    
            // console.log("Worked")
          }
        } catch (err) {
          console.log(err)
        }
        event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
    <div>
      <h1>Currency Converter</h1>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
        />
        </div>
      <div>
        
        <label htmlFor="baseCurrency">Base Currency:</label>
        <input
          type="text"
          id="baseCurrency"
        />
      </div>
      <div>
        <label htmlFor="targetCurrency">Target Currency:</label>
        <input
          type="text"
          id="targetCurrency"
        />
      </div>
      <button type="submit">Submit</button>
      <p>Converted amount: {convertedAmount}</p>
    </div>
    </form> 
  );
}
export default App;