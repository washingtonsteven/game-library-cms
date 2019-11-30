import React from "react";
import GameCard from "./GameCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import CardDeck from "react-bootstrap/CardDeck";
import FunctionCall from "../functionCall";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

const spinnerStyle = {
  width: "1rem",
  height: "1rem",
  borderWidth: "0.125em"
};

const GameSearch = ({ onGameClicked, fetchGamesResponse }) => {
  const [search, setSearch] = React.useState("");
  const [results, setResults] = React.useState(null);
  const [searchLoading, setSearchLoading] = React.useState(false);
  const [previousSearch, setPreviousSearch] = React.useState("");

  const gamesList = React.useCallback(() => {
    if (
      fetchGamesResponse &&
      fetchGamesResponse.response &&
      Array.isArray(fetchGamesResponse.response)
    ) {
      return fetchGamesResponse.response;
    } else {
      return [];
    }
  }, [fetchGamesResponse]);

  const formSubmit = e => {
    e.preventDefault();
    setSearchLoading(true);
    setPreviousSearch(search);
    FunctionCall.call({
      fetchConfig: {
        url: "/.netlify/functions/searchGame",
        method: "get",
        params: {
          s: search
        }
      }
    })
      .then(response => {
        setResults(response);
        setSearchLoading(false);
      })
      .catch(error => console.error(error));
  };

  const reset = () => {
    setSearch("");
    setResults({});
  };

  const gameClicked = game => {
    onGameClicked &&
      typeof onGameClicked === "function" &&
      (() => {
        onGameClicked(game);
        reset();
      })();
  };

  return (
    <Container style={{ marginBottom: "20px" }}>
      <Row className="search-container mb-3">
        <Col>
          <Form onSubmit={formSubmit}>
            <InputGroup>
              <FormControl
                placeholder="Search Games"
                aria-label="Game search query"
                onChange={e => setSearch(e.target.value)}
                value={search}
              />
              <InputGroup.Append>
                <ButtonGroup>
                  <Button type="submit" disabled={searchLoading}>
                    {searchLoading ? (
                      <Spinner animation="border" style={spinnerStyle}>
                        <span className="sr-only">
                          Loading Search Results...
                        </span>
                      </Spinner>
                    ) : (
                      "Submit"
                    )}
                  </Button>
                  <Button onClick={reset} variant="secondary">
                    Clear
                  </Button>
                </ButtonGroup>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </Col>
      </Row>
      {!results && (
        <Row>
          <Col>
            <Alert variant="primary">Enter a search query above</Alert>
          </Col>
        </Row>
      )}
      {results &&
        results.data &&
        results.data.response &&
        !results.data.response.length && (
          <Row>
            <Col>
              <Alert variant="warning">
                Sorry, no results for "{previousSearch}"
              </Alert>
            </Col>
          </Row>
        )}
      <Row>
        {results &&
          results.data &&
          results.data.response &&
          results.data.response.map(game => {
            const alreadyAdded = Boolean(
              gamesList().find(g => parseInt(g.data.igdb_id) === game.id)
            );
            return (
              <Col key={game.id} md={4} sm={6} xs={12} className="mb-3">
                <CardDeck>
                  <GameCard
                    igdbGameData={game}
                    onConfirm={e => gameClicked(game)}
                    buttonLevel="info"
                    buttonText="Add?"
                    buttons={[
                      {
                        isConfirmButton: true,
                        variant: "info",
                        label: alreadyAdded ? "Already Added" : "Add?",
                        confirmLabel: `Yes, add ${game.name}`,
                        confirmedLabel: `Added ${game.name}!`,
                        confirmVariant: "info",
                        cancelLabel: `No, don't add`,
                        onConfirm: () => {
                          console.log("confirmed", game.name);
                          gameClicked(game);
                        },
                        buttonProps: {
                          disabled: alreadyAdded
                        }
                      }
                    ]}
                  />
                </CardDeck>
              </Col>
            );
          })}
        <small style={{ display: "none" }}>
          {results && (
            <pre>
              <code>{JSON.stringify(results, null, 1)}</code>
            </pre>
          )}
        </small>
      </Row>
    </Container>
  );
};

export default GameSearch;
