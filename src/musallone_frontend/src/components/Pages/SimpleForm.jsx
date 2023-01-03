import * as React from 'react';
import {musallone_backend} from "../../../../declarations/musallone_backend";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { CardHeader, Container, Grid, Stack, Typography } from '@mui/material';
import { Web3Storage } from 'web3.storage'
import  {create}  from 'ipfs-core';
import  TopBar  from "../Molecules/TopBar/TopBar";



export default function SimpleForm() {
  const [name, setName] = React.useState('');
  const [details, setDetails] = React.useState('');
  const [tokens, setTokens] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [numbContracts, setNumbContracts] = React.useState(0);
  const [allContracts, setAllContracts] = React.useState([]);
  const [url, setUrl] = React.useState('');

  async function ipfsActor(file) {
    let ipfs = await create();
    console.log("ipfs: ", ipfs)
    const data = 'Hello, <jack>'
    const results = await ipfs.add(data)
    console.log("results:" , results)
    // let string = await ipfs.cat(results.path)
    console.log("returned data:", ipfs.cat(results.path))
    setUrl(ipfs.cat(results.path))
    
    //   const obj = { hello: 'world' }
    //   const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
    
    //   const files = [
    //     new File(['contents-of-file-1'], 'plain-utf8.txt'),
    //     new File([blob], 'hello.json')
    //   ]

    // const x = await ipfs.files.mkdir('/my/directory/example', { parents: true })
    // await ipfs.files.write('/my/directory/example', files[0], { create: true })
    // console.log("my data:", await ipfs.files.stat('/example'))
    // console.log("my data:", await ipfs.files.ls('/example'))
    // for (const { cid } of results) {
    //   // CID (Content IDentifier) uniquely addresses the data
    //   // and can be used to get it again.
    //   console.log(cid.toString())
    // }
  }

//   async function makeAndStoreFiles () {
//       // You can create File objects from a Blob of binary data
//       // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
//       // Here we're just storing a JSON object, but you can store images,
//       // audio, or whatever you want!

//       let client = GetWebStorageClient();
   
//       const obj = { hello: 'world' }
//       const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })
    
//       const files = [
//         new File(['contents-of-file-1'], 'plain-utf8.txt'),
//         new File([blob], 'hello.json')
//       ]

//       let cid = await client.put(files);
//       console.log('stored files with cid:', cid);
//   }

//   function GetWebStorageClient () {
//     // If you're just testing, you can paste in a token
//     // and uncomment the following line:
//     // return 'paste-your-token-here'
  
//     // In a real app, it's better to read an access token from an
//     // environement variable or other configuration that's kept outside of
//     // your code base. For this to work, you need to set the
//     // WEB3STORAGE_TOKEN environment variable before you run your code.
//     let token = process.env.WEB3STORAGE_TOKEN;
//     console.log("token: ", token)
//   return new Web3Storage({ token: token })
// }

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
    <TopBar/>
    <Container fixed>
    <Box
       component="form"
       sx={{
         '& > :not(style)': { m: 5, width: '90ch' },
       }}
       noValidate
       autoComplete="off"
     > 
      <br></br>
      <br></br>
      <br></br>
      <Typography variant="h3" sx={{ mb: 3 }}>
          Welcome to shared ownership
      </Typography>
        <p>
            {" "}
            Submit a contract to the MusallDAO store{" "}
            <br></br>
            <br></br>
            Enter the name, abstract and its number of tokens to share in the contract.
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

      <input type="file" width="48" height="40" placeholder='browse file upload' />

      <Button variant="contained" onClick={ipfsActor}> Upload data </Button>

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