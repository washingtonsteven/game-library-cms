import React from "react";
import GameCard from "./GameCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditGame from "./EditGame";

const GameList = ({ fetchGamesResponse, onDelete, onUpdate }) => {
  const [editingGame, setEditingGame] = React.useState(null);

  const doEdit = game => {
    if (!editingGame && fetchGamesResponse) {
      setEditingGame(game);
    } else {
      setEditingGame(null);
    }
  };

  const doUpdate = (gameId, game) => {
    if (onUpdate) {
      doEdit(null);
      onUpdate(gameId, game);
    }
  };

  return (
    <Container className="game-list">
      <Row>
        {fetchGamesResponse &&
          fetchGamesResponse.response &&
          fetchGamesResponse.response.map(game => (
            <Col md={4} sm={6} xs={12} key={game.ref["@ref"].id}>
              <GameCard
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
            </Col>
          ))}
      </Row>
      <EditGame
        game={editingGame}
        active={editingGame !== null}
        onCancel={() => doEdit(null)}
        onUpdate={doUpdate}
      />
    </Container>
  );
};

export default GameList;
