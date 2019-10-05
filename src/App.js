import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import FaunaTest from "./FaunaTest";
import NetlifyFunctionTest from "./NetlifyFunctionTest";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <NetlifyFunctionTest />
      </header>
    </div>
  );
}

export default App;
