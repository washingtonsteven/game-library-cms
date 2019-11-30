import React from "react";
import GameCard from "./GameCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditGame from "./EditGame";
import Form from "react-bootstrap/Form";
import Platform from "../model/Platform";

const GameList = ({ fetchGamesResponse, onDelete, onUpdate }) => {
  const [editingGame, setEditingGame] = React.useState(null);
  const [search, setSearch] = React.useState("");
  const [platformFilter, setPlatformFilter] = React.useState("all");
  const [filteredGamesList, setFilteredGamesList] = React.useState([]);

  // Repopulate games if the response changes
  const gamesList = React.useCallback(() => {
    if (
      fetchGamesResponse &&
      fetchGamesResponse.response &&
      Array.isArray(fetchGamesResponse.response)
    ) {
      return fetchGamesResponse.response.sort((a, b) => {
        return b.data.updated_date - a.data.updated_date;
      });
    } else {
      return [];
    }
  }, [fetchGamesResponse]);

  const platforms = React.useCallback(() => {
    return gamesList()
      .map(g => g.data.platform)
      .filter(p => p)
      .filter((p, i, a) => a.indexOf(p) === i);
  }, [gamesList]);

  // Filter games list based on search
  React.useEffect(() => {
    let newGamesList = gamesList();
    if (search.trim() !== "") {
      newGamesList = gamesList().filter(game => {
        return game.data.title.toLowerCase().indexOf(search) >= 0;
      });
    }

    if (platformFilter && platformFilter !== "all") {
      newGamesList = newGamesList.filter(game => {
        return game.data.platform === platformFilter;
      });
    }

    setFilteredGamesList(newGamesList);
  }, [search, gamesList, fetchGamesResponse, platformFilter]);

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
          <Form.Control
            placeholder="Search Games"
            aria-label="Game search query"
            onChange={e => setSearch(e.target.value)}
            value={search}
          />
        </Col>
        <Col>
          <Form.Group controlId="platform">
            <Form.Control
              as="select"
              value={platformFilter}
              onChange={e => setPlatformFilter(e.target.value)}
            >
              <option value="all">All Platforms</option>
              {platforms().map(platform => (
                <option value={platform} key={platform}>
                  {Platform.getPlatformName(platform)}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        {filteredGamesList.map(game => (
          <Col
            xl={3}
            md={4}
            sm={6}
            xs={12}
            key={game.ref["@ref"].id}
            className="mb-3"
          >
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
