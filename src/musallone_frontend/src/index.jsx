import {musallone_backend} from "../../declarations/musallone_backend";

import * as React from "react";
import { render } from "react-dom";
import  MyHello  from "./components/Hello";
import  App from "./components/App";




render(<App />, document.getElementById("app"));
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