import React from "react";
import axios from "axios";
import GameCard from "./GameCard";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";

export default ({ onGameClicked }) => {
  const [search, setSearch] = React.useState("");
  const [results, setResults] = React.useState({});

  const formSubmit = e => {
    e.preventDefault();
    axios
      .get("/.netlify/functions/searchGame", { params: { s: search } })
      .then(response => setResults(response))
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
      <div className="search-container">
        <Form onSubmit={formSubmit}>
          <InputGroup>
            <FormControl
              placeholder="Search Games"
              aria-label="Game search query"
              onChange={e => setSearch(e.target.value)}
            />
            <InputGroup.Append>
              <ButtonGroup>
                <Button type="submit">Submit</Button>
                <Button onClick={reset} variant="secondary">
                  Clear
                </Button>
              </ButtonGroup>
            </InputGroup.Append>
          </InputGroup>
        </Form>
        {results &&
          results.data &&
          results.data.response &&
          results.data.response.map(game => (
            <GameCard
              key={game.id}
              igdbGameData={game}
              onConfirm={e => gameClicked(game)}
              buttonLevel="info"
              buttonText="Add?"
              buttons={[
                {
                  isConfirmButton: true,
                  variant: "info",
                  label: "Add?",
                  confirmLabel: `Yes, add ${game.name}`,
                  confirmedLabel: `Added ${game.name}!`,
                  confirmVariant: "info",
                  cancelLabel: `No, don't add`,
                  onConfirm: () => {
                    console.log("confirmed", game.name);
                    gameClicked(game);
                  }
                }
              ]}
            />
          ))}
        <small style={{ display: "none" }}>
          {results && (
            <pre>
              <code>{JSON.stringify(results, null, 1)}</code>
            </pre>
          )}
        </small>
      </div>
    </Container>
  );
};
