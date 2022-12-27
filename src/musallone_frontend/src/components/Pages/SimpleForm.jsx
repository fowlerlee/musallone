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
  const [numbContracts, setNumbContracts] = React.useState(0);
  const [allContracts, setAllContracts] = React.useState([]);

  async function doContract() {
    const greeting = await musallone_backend.greet(name)
    console.log("name: ", greeting);
    const contract = await musallone_backend.add_contract(name, details, parseInt(tokens));
    console.log("response:" , contract.Ok)
    setMessage(contract.Ok);
  }

  async function doGetContracts() {
    const numbContracts = await musallone_backend.get_number_of_contracts()
    console.log("number of contracts: ", parseInt(numbContracts));
    setNumbContracts(numbContracts);
  }

  async function getAllContracts() {
    const allContracts = await musallone_backend.get_all_contracts()
    // Array(allContracts).map(i => console.log(parseInt(i)));
    console.log("all contracts: ", [...allContracts]);
    setAllContracts([...allContracts]);
  }
  
  return (
    <> 
    <Container fixed>
    <Box
       component="form"
       sx={{
         '& > :not(style)': { m: 5, width: '90ch' },
       }}
       noValidate
       autoComplete="off"
     > 
      <Typography variant="h3" sx={{ mb: 3 }}>
          Welcome to MusallDAO
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
    </Container>
  
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
      <Button variant="contained" color="success" onClick={doContract}> Submit </Button>
      <Button variant="outlined"  onClick={doGetContracts}> Count contracts </Button>
      <Button variant="contained" onClick={getAllContracts}> Get all contracts </Button>
      <div> MusallDAO response: <span style={{ color: "green" }}>{message}</span> </div>
      <div> Number of contracts created: <span style={{ color: "green" }}>{Number(numbContracts)}</span> </div>
    </Box>
    </>
  );
}