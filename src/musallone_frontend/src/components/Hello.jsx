import {musallone_backend} from "../../../declarations/musallone_backend";
import * as React from "react";
import { render } from "react-dom";


export default function MyHello () {
    const [name, setName] = React.useState('');
    const [message, setMessage] = React.useState('');
  
    async function doGreet() {
      const greeting = await musallone_backend.greet(name)
      console.log("greeting: ", greeting);
      setMessage(greeting);
      const contract = await musallone_backend.add_contract("lee", "josefin");
      console.log("contract:" , contract)
    }
  
    return (
      <div style={{ "fontFamily": "sans-serif" }}>
        <div style={{ "fontSize": "30px" }}>
          <p>Greetings, from DFINITY!</p>
          <p>
            {" "}
            Type your message in the Name input field, then click{" "}
            <b> Get Greeting</b> to display the result.
          </p>
        </div>
        <div style={{ margin: "30px" }}>
          <input
            id="name"
            value={name}
            placeholder="Type text here"
            onChange={(ev) => setName(ev.target.value)}
          ></input>
          <button onClick={doGreet}>Get Greeting!</button>
        </div>
        <div>
          Greeting is: "
          <span style={{ color: "green" }}>{message}</span>"
        </div>
      </div>
    );
  };
