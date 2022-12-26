import {musallone_backend} from "../../declarations/musallone_backend";

import * as React from "react";
import { render } from "react-dom";
// import { custom_greeting } from "../../declarations/musallone_backend";

const MyHello = () => {
  const [name, setName] = React.useState('');
  const [message, setMessage] = React.useState('');

  async function doGreet() {
    const greeting = await musallone_backend.greet(name);
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

render(<MyHello />, document.getElementById("app"));
// document.querySelector("form").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const button = e.target.querySelector("button");

//   const name = document.getElementById("name").value.toString();

//   button.setAttribute("disabled", true);

//   // Interact with foo actor, calling the greet method
//   const greeting = await musallone_backend.greet(name);

//   button.removeAttribute("disabled");

//   document.getElementById("greeting").innerText = greeting;

//   return false;
// });

// document.querySelector("form").addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const button = e.target.querySelector("button");

//   const contract_title = document.getElementById("contract_title").value.toString();
//   const contract_specs = document.getElementById("contract_specs").value.toString();

//   button.setAttribute("disabled", true);

//   // Interact with foo actor, calling the greet method
//   const contract_item = await musallone_backend.add_contract(contract_title, contract_specs);
//   console.log("contract: " ,contract_item.Ok )

//   button.removeAttribute("disabled");

//   document.getElementById("contract_item").innerText = contract_item.Ok;

//   return false;
// });
