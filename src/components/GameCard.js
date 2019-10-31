import React from "react";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Game from "../model/Game";

/*const getTestGame = () => ({
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
}); */

const ConfirmState = {
  OFF: "OFF",
  UNCONFIRMED: "UNCONFIRMED",
  CONFIRMED: "CONFIRMED"
};

export default ({
  gameData,
  igdbGameData,
  onConfirm,
  bypassConfirm = false,
  buttonLevel = "danger",
  buttonText = "Delete?"
}) => {
  const [confirmState, setConfirmState] = React.useState(ConfirmState.OFF);

  const game = new Game(gameData);
  if (igdbGameData) {
    game.initWithIgdb(igdbGameData);
  }

  const doConfirm = () => {
    if (confirmState === ConfirmState.OFF) {
      if (bypassConfirm) onConfirm();
      else setConfirmState(ConfirmState.UNCONFIRMED);
    }
    if (confirmState === ConfirmState.UNCONFIRMED) {
      setConfirmState(ConfirmState.CONFIRMED);
      onConfirm && typeof onConfirm === "function" && onConfirm();
    }
  };

  const cancelConfirm = () => {
    setConfirmState(ConfirmState.OFF);
  };

  return (
    <Card
      style={{ maxWidth: "18rem", cursor: "pointer" }}
      onClick={() => (confirmState === ConfirmState.OFF ? doConfirm() : null)}
    >
      <Card.Img variant="top" src={game.cover} />
      <Card.Body>
        <Card.Title>{game.title}</Card.Title>
        <Card.Text>
          {game.description}
          <small>{game.displayReleaseDate()}</small>
        </Card.Text>
        {confirmState !== ConfirmState.OFF && (
          <ButtonGroup>
            <Button variant="secondary" onClick={cancelConfirm}>
              Cancel
            </Button>
            <Button variant={buttonLevel} onClick={doConfirm}>
              {buttonText}
            </Button>
          </ButtonGroup>
        )}
      </Card.Body>
    </Card>
  );
};
