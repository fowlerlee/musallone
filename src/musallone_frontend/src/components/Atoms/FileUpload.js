import {React, useState } from "react";
import  {create}  from 'ipfs-core';
import Button from '@mui/material/Button';


function FileUpload() {
    const [file, setFile] = useState()
    const [url, setUrl] = React.useState('');

  function handleChange(event) {
    setFile(event.target.files[0])
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("ipfs: ", ipfs);
    let ipfs = await create();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);

    const results = await ipfs.add(data)
    console.log("returned data:", ipfs.cat(results.path))
    setUrl(ipfs.cat(results.path))
  }

  return (
    <div className="App">
        <form onSubmit={handleSubmit}>
          <h1>File Upload</h1>
          <input type="file" onChange={handleChange}/>
          <button type="submit">Upload</button>
        </form>
    </div>
  );
}

export default FileUpload;