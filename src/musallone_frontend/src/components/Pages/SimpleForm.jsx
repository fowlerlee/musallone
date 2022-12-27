import * as React from 'react';
import {musallone_backend} from "../../../../declarations/musallone_backend";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CardHeader, Container, Grid, Stack, Typography } from '@mui/material';


export default function SimpleForm() {
  const [name, setName] = React.useState('');
  const [details, setDetails] = React.useState('');
  const [tokens, setTokens] = React.useState('');
  const [message, setMessage] = React.useState('');

  async function doGreet() {
    const greeting = await musallone_backend.greet(name)
    console.log("greeting: ", greeting);
    const contract = await musallone_backend.add_contract(name, details, parseInt(tokens));
    console.log("contract:" , contract.Ok)
    setMessage(contract.Ok);
  }
  
  return (
    <> 
    <Box
       component="form"
       sx={{
         '& > :not(style)': { m: 5, width: '90ch' },
       }}
       noValidate
       autoComplete="off"
     > 
      <Typography variant="h3" sx={{ mb: 3 }}>
          Welcome to Musall alpha
      </Typography>
        <p>
            {" "}
            Submit a contract to the MusallDAO store{" "}
            <br></br>
            <br></br>
            Enter a name, details and its number of tokens to share in contract.
            {" "}
        </p>
    </Box>
  
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    > 
      <TextField id="filled-basic" label="Contract name" variant="filled" onChange={(ev) => setName(ev.target.value)}/>
      <TextField id="filled-basic" label="Contract details" variant="filled" multiline
          rows={8} onChange={(ev) => setDetails(ev.target.value)}/>
      <TextField id="filled-basic" label="Total tokens to share" variant="filled" onChange={(ev) => setTokens(ev.target.value)}/>
      <Button variant="contained" color="success" onClick={doGreet}> Submit </Button>
      <div> MusallDAO response: <span style={{ color: "green" }}>{message}</span> </div>
    </Box>
    </>
  );
}