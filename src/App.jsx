import { Grid, Container, Typography, Box } from '@mui/material'
import InputAmount from './Components/InputAmount'
import SelectCountry from './Components/SelectCountry'
import SwitchCurrency from './Components/SwitchCurrency'
import { useContext, useEffect, useState } from 'react';
import { CurrencyContext } from './context/CurrencyContext';
import axios from 'axios';

function App() {
  const { fromCurrency, 
    setFromCurrency, 
    toCurrency, 
    setToCurrency,
    firstAmount,
  }= useContext(CurrencyContext);

  const [resultCurrency, setResultCurrency] = useState(0);
  const codeFromCurrency= fromCurrency.split(" ")[1];
  const codeToCurrency= toCurrency.split(" ")[1];

  console.log(resultCurrency);

  useEffect(() => {
if(firstAmount)
{
  axios("https://api.freecurrencyapi.com/v1/latest", {
    params: {
      apikey: "fca_live_qfoOyb7mjECl6Sy5sCP4HkjKNjqIztHeRP8L1mBf",
      base_currency: codeFromCurrency,
      currencies: codeToCurrency
    }
  })
  .then(response => setResultCurrency(response.data.data[codeToCurrency]))
  .catch(error => console.log(error))
}
  }, [firstAmount, fromCurrency, toCurrency])


  const boxStyles = {
    background: "#fdfdfd",
    marginTop: "10rem",
    textAlign: "center",
    color: "#222",
    minHeight: "20rem",
    borderRadius: 2,
    padding: "4rem 2rem",
    boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
    position: "relative"
  }

  return (
    <Container maxWidth="md" sx={boxStyles}>
      <Typography variant="h5" sx={{marginBottom: "2rem"}}>Currency Converter</Typography>
      <Grid container spacing={2}>
        <InputAmount/>
        <SelectCountry value={fromCurrency} setValue={setFromCurrency} label="From" />
        <SwitchCurrency/>
        <SelectCountry  value={toCurrency} setValue={setToCurrency} label="To" />
      </Grid>

    {firstAmount ? (
      <Box sx={{ textAlign: "left", marginTop: "1rem"}}>
        <Typography>{firstAmount} {fromCurrency} =</Typography>
        <Typography variant='h5' sx={{ marginTop: "5px", fontWeight: "bold"}}>{resultCurrency * firstAmount} {toCurrency}</Typography>
      </Box>

    ) : "" }

    </Container>
  )
}

export default App
