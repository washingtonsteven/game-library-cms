import React from "react";
import axios from "axios";

export default () => {
  const [search, setSearch] = React.useState("");
  const [results, setResults] = React.useState({});

  const formSubmit = e => {
    e.preventDefault();
    axios
      .get("/.netlify/functions/searchGame", { params: { s: search } })
      .then(response => setResults(response))
      .catch(error => console.error(error));
  };

  return (
    <div className="search-container">
      <form onSubmit={formSubmit}>
        <label htmlFor="searchbox">
          Search:
          <input
            type="text"
            value={search}
            id="searchbox"
            onChange={e => setSearch(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {results && (
        <pre>
          <code>{JSON.stringify(results, null, 1)}</code>
        </pre>
      )}
    </div>
  );
};
