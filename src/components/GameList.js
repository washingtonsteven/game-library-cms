import React from "react";
import GameCard from "./GameCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import EditGame from "./EditGame";

export default ({
  addGameResponse,
  fetchGamesResponse,
  doFetch,
  onDelete,
  onAdd
}) => {
  const [editingGame, setEditingGame] = React.useState(null);

  const doEdit = game => {
    if (!editingGame && fetchGamesResponse) {
      console.log("editing: ", game.data);
      setEditingGame(game.data);
    } else {
      setEditingGame(null);
    }
  };

  return (
    <Container className="game-list" style={{ marginBottom: "20px" }}>
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
                  buttons={[
                    {
                      isConfirmButton: true,
                      variant: "danger",
                      label: "Delete?",
                      confirmLabel: `Yes, delete ${game.data.title}`,
                      cancelLabel: `No, don't delete`,
                      onConfirm: () => {
                        onDelete(game);
                      }
                    },
                    {
                      variant: "info",
                      label: "Edit",
                      onClick: () => {
                        doEdit(game);
                      }
                    }
                  ]}
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
