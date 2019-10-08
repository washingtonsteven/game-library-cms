import React from "react";
import logo from "./logo.svg";
import "./App.css";
// import FaunaTest from "./FaunaTest";
import NetlifyFunctionTest from "./NetlifyFunctionTest";
import SearchTest from "./SearchTest";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <NetlifyFunctionTest />
        <SearchTest />
      </header>
    </div>
  );
}

export default App;
