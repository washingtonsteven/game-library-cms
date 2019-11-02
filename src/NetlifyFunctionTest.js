import React from "react";
import GameCard from "./components/GameCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import EditGame from "./components/EditGame";

export default ({
  addGameResponse,
  fetchGamesResponse,
  doFetch,
  onDelete,
  onAdd
}) => {
  const [editingGame, setEditingGame] = React.useState(null);

  const doEdit = () => {
    if (!editingGame && fetchGamesResponse) {
      console.log("editing: ", fetchGamesResponse.response[0].data);
      setEditingGame(fetchGamesResponse.response[0].data);
    } else {
      setEditingGame(null);
    }
  };
  return (
    <Container
      className="netlify-function-test"
      style={{ marginBottom: "20px" }}
    >
      <Row>
        <div className="fetch col">
          <Button onClick={doFetch}>
            Fetch All Games
            {fetchGamesResponse.response &&
              fetchGamesResponse.response.length &&
              ` (${fetchGamesResponse.response.length})`}
          </Button>
          {fetchGamesResponse && fetchGamesResponse.response && (
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}
            >
              {fetchGamesResponse.response.map(game => (
                <GameCard
                  key={game.ref["@ref"].id}
                  gameData={game.data}
                  onConfirm={() => onDelete(game)}
                  buttonLevel="danger"
                  buttonText="Delete?"
                />
              ))}
            </div>
          )}
        </div>
      </Row>
      <Row style={{ display: "none" }}>
        <div className="add col">
          <button onClick={onAdd}>Add New Game</button>
          {addGameResponse && (
            <pre>
              <code>{JSON.stringify(addGameResponse, null, 1)}</code>
            </pre>
          )}
        </div>
      </Row>
      <Row>
        <Button onClick={doEdit}>Edit a Game</Button>
        {editingGame && <EditGame game={editingGame} />}
      </Row>
    </Container>
  );
};
