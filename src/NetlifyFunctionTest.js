import React from "react";
import axios from "axios";

const randString = () =>
  Array(4)
    .fill()
    .map(x => String.fromCharCode(Math.floor(Math.random() * 58) + 65))
    .join("");

const getTestGame = () => ({
  completed: false,
  completed_date: new Date().getTime(),
  cover: "http://via.placeholder.com/500",
  created_date: new Date().getTime(),
  updated_date: new Date().getTime(),
  description: "This is a description",
  notes: "These are notes",
  owned: true,
  played: true,
  rating: 100,
  release_date: new Date(new Date().setFullYear(1988)).getTime(),
  title: "Test Game " + randString(),
  platform: "Nintendo Switch"
});

const style = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  textAlign: "left",
  fontSize: "0.5em"
};

export default () => {
  const [addGameResponse, setAddGameResponse] = React.useState({});
  const [fetchGamesResponse, setFetchGamesResponse] = React.useState({});

  const doFetchGames = () => {
    axios
      .get("/.netlify/functions/getGames")
      .then(response => setFetchGamesResponse(response.data))
      .catch(e => console.error(e));
  };

  const doAddGame = () => {
    axios
      .post("/.netlify/functions/addGame", getTestGame())
      .then(response => setAddGameResponse(response.data))
      .catch(e => console.error(e));
  };

  return (
    <div className="netlify-function-test" style={style}>
      <div className="fetch col">
        <button onClick={doFetchGames}>
          Fetch All Games
          {fetchGamesResponse.response &&
            fetchGamesResponse.response.length &&
            ` (${fetchGamesResponse.response.length})`}
        </button>
        {fetchGamesResponse && (
          <pre>
            <code>{JSON.stringify(fetchGamesResponse, null, 1)}</code>
          </pre>
        )}
      </div>
      <div className="add col">
        <button onClick={doAddGame}>Add New Game</button>
        {addGameResponse && (
          <pre>
            <code>{JSON.stringify(addGameResponse, null, 1)}</code>
          </pre>
        )}
      </div>
    </div>
  );
};
