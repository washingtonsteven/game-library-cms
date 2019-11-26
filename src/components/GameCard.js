import React from "react";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Game from "../model/Game";
import ConfirmButton from "./ConfirmButton";

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

const GameCard = ({ gameData, igdbGameData, buttons = [] }) => {
  const game = new Game(gameData);
  if (igdbGameData) {
    game.initWithIgdb(igdbGameData);
  }

  return (
    <Card style={{ maxWidth: "18rem", cursor: "pointer", margin: "0 auto" }}>
      <Card.Img variant="top" src={game.cover} />
      <Card.Body>
        <Card.Title>{game.title}</Card.Title>
        <Card.Text>
          {game.description}
          <small>{game.displayReleaseDate()}</small>
        </Card.Text>
        {buttons && buttons.length && (
          <ButtonGroup>
            {buttons.map(button =>
              button.isConfirmButton ? (
                <ConfirmButton
                  key={button.key || button.label}
                  onConfirm={() => button.onConfirm()}
                  buttonProps={{ variant: button.variant }}
                  confirmLabel={button.confirmLabel}
                  confirmedLabel={button.confirmedLabel}
                  cancelLabel={button.cancelLabel}
                  confirmVariant={button.confirmVariant}
                >
                  {button.label}
                </ConfirmButton>
              ) : (
                <Button
                  key={button.key || button.label}
                  onClick={button.onClick}
                  variant={button.variant}
                >
                  {button.label}
                </Button>
              )
            )}
          </ButtonGroup>
        )}
      </Card.Body>
    </Card>
  );
};

export default GameCard;
