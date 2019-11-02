import React from "react";
import NetlifyFunctionTest from "./NetlifyFunctionTest";
import SearchTest from "./SearchTest";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Game from "./model/Game";

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

function App() {
  const [addGameResponse, setAddGameResponse] = React.useState({});
  const [fetchGamesResponse, setFetchGamesResponse] = React.useState({});

  const doAddRandomGame = () => {
    axios
      .post("/.netlify/functions/addGame", getTestGame())
      .then(response => setAddGameResponse(response.data))
      .then(() => doFetchGames())
      .catch(e => console.error(e));
  };

  const doFetchGames = () => {
    axios
      .get("/.netlify/functions/getGames")
      .then(response => setFetchGamesResponse(response.data))
      .catch(e => console.error(e));
  };

  const deleteGame = game => {
    axios
      .post("/.netlify/functions/deleteGame", game)
      .then(() => doFetchGames())
      .catch(e => console.error(e));
  };

  const addGame = game => {
    const formattedGame = new Game();
    formattedGame.initWithIgdb(game);
    axios
      .post("/.netlify/functions/addGame", formattedGame.getData())
      .then(response => doFetchGames())
      .catch(e => console.error(e));
  };

  return (
    <Container className="App">
      <Row>
        <NetlifyFunctionTest
          addGameResponse={addGameResponse}
          fetchGamesResponse={fetchGamesResponse}
          onDelete={deleteGame}
          doFetch={doFetchGames}
          onAdd={doAddRandomGame}
        />
      </Row>
      <Row>
        <SearchTest onGameClicked={addGame} />
      </Row>
    </Container>
  );
}

export default App;
