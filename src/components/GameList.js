import React from "react";
import GameCard from "./GameCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditGame from "./EditGame";
import FormControl from "react-bootstrap/FormControl";

const GameList = ({ fetchGamesResponse, onDelete, onUpdate }) => {
  const [editingGame, setEditingGame] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [gamesList, setGamesList] = React.useState([]);
  const [filteredGamesList, setFilteredGamesList] = React.useState([]);

  // Repopulate games if the response changes
  React.useEffect(() => {
    if (
      fetchGamesResponse &&
      fetchGamesResponse.response &&
      Array.isArray(fetchGamesResponse.response)
    ) {
      setGamesList(fetchGamesResponse.response);
    } else {
      setGamesList([]);
    }
  }, [fetchGamesResponse]);

  // Filter games list based on search
  React.useEffect(() => {
    if (search.trim() === "") {
      setFilteredGamesList(gamesList);
      return;
    }

    const newGamesList = gamesList.filter(game => {
      return game.data.title.toLowerCase().indexOf(search) >= 0;
    });

    setFilteredGamesList(newGamesList);
  }, [search, gamesList]);

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
      <Row className="mb-3">
        <Col>
          <FormControl
            placeholder="Search Games"
            aria-label="Game search query"
            onChange={e => setSearch(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        {filteredGamesList.map(game => (
          <Col md={4} sm={6} xs={12} key={game.ref["@ref"].id} className="mb-3">
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
