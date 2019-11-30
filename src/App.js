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
import Alert from "react-bootstrap/Alert";
import functionCall from "./functionCall";

function App({ user, logoutFn = () => {} }) {
  const [fetchGamesResponse, setFetchGamesResponse] = React.useState({});

  const doFetchGames = () => {
    functionCall
      .call({
        fetchConfig: {
          url: "/.netlify/functions/getGames",
          method: "get"
        }
      })
      .then(response => setFetchGamesResponse(response.data))
      .catch(e => console.error(e));
  };

  const deleteGame = game => {
    functionCall
      .call({
        fetchConfig: {
          url: "/.netlify/functions/deleteGame",
          method: "post",
          data: game
        }
      })
      .then(() => doFetchGames())
      .catch(e => console.error(e));
  };

  const addGame = game => {
    const formattedGame = new Game();
    formattedGame.initWithIgdb(game);
    functionCall
      .call({
        fetchConfig: {
          url: "/.netlify/functions/addGame",
          method: "post",
          data: {
            ...formattedGame.getData(),
            user_id: user.id
          }
        }
      })
      .then(() => doFetchGames())
      .catch(e => console.error(e));
  };

  const doUpdate = (gameId, game) => {
    console.log("App updating game", { gameId, game });
    functionCall
      .call({
        fetchConfig: {
          url: "/.netlify/functions/updateGame",
          method: "post",
          data: {
            gameData: { ...game },
            gameId
          }
        }
      })
      .then(response => doFetchGames())
      .catch(e => console.error(e));
  };

  React.useEffect(() => {
    doFetchGames();
  }, []);

  if (!user) {
    return (
      <Container>
        <Row>
          <Col>
            <Alert variant="danger">Uh oh. You didn't log in right.</Alert>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Tabs defaultActiveKey="list" className="App my-3 px-3">
      <Tab eventKey="user" title="UserData">
        <Container className="p-2">
          <Row>
            <Col>
              <Button onClick={logoutFn} variant="danger" className="mb-3">
                Logout
              </Button>
              <pre>
                <code>{JSON.stringify(user || {}, null, 1)}</code>
              </pre>
            </Col>
          </Row>
        </Container>
      </Tab>
      <Tab eventKey="list" title="Game List">
        <Container className="p-2">
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
        <Container className="p-2">
          <Row>
            <Col>
              <GameSearch
                onGameClicked={addGame}
                fetchGamesResponse={fetchGamesResponse}
              />
            </Col>
          </Row>
        </Container>
      </Tab>
    </Tabs>
  );
}

export default App;
