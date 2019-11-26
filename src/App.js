import React from "react";
import GameList from "./components/GameList";
import GameSearch from "./components/GameSearch";
import axios from "axios";
import Game from "./model/Game";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function App({ user = {}, logoutFn = () => {} }) {
  const [fetchGamesResponse, setFetchGamesResponse] = React.useState({});

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

  const doUpdate = (gameId, game) => {
    console.log("App updating game", { gameId, game });
    axios
      .post("/.netlify/functions/updateGame", {
        gameData: {
          ...game
        },
        gameId
      })
      .then(response => doFetchGames())
      .catch(e => console.error(e));
  };

  React.useEffect(() => {
    doFetchGames();
  }, []);

  return (
    <Tabs defaultActiveKey="list" className="App">
      <Tab eventKey="user" title="UserData">
        <Container>
          <Row>
            <Col>
              <Button onClick={logoutFn} variant="danger">
                Logout
              </Button>
              <pre>
                <code>{JSON.stringify(user, null, 1)}</code>
              </pre>
            </Col>
          </Row>
        </Container>
      </Tab>
      <Tab eventKey="list" title="Game List">
        <Container>
          <Row>
            <Col>
              <GameList
                fetchGamesResponse={fetchGamesResponse}
                onDelete={deleteGame}
                onUpdate={doUpdate}
              />
            </Col>
          </Row>
        </Container>
      </Tab>
      <Tab eventKey="search" title="Game Search">
        <Container>
          <Row>
            <Col>
              <GameSearch onGameClicked={addGame} />
            </Col>
          </Row>
        </Container>
      </Tab>
    </Tabs>
  );
}

export default App;
