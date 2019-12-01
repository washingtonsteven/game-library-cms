import React from "react";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Game from "../model/Game";
import ConfirmButton from "./ConfirmButton";
import CollapsibleText from "./CollapsibleText";
import Platform from "../model/Platform";
import StarRating from "./StarRating";

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
    <Card>
      <Card.Header>
        {game.title}{" "}
        <small className="text-muted">({game.displayReleaseDate()})</small>
      </Card.Header>
      <Card.Img variant="top" src={game.cover} />
      <Card.Body style={{ padding: 0 }}>
        <Card.Subtitle className="p-3 mt-0">
          {game.platform
            ? Platform.getPlatformName(game.platform)
            : "- No Platform Selected -"}
        </Card.Subtitle>
        <Card.Text>
          {game.notes && (
            <div className="p-3 mb-0 bg-warning">{game.notes}</div>
          )}
          <div className="p-3">
            <StarRating initialRating={game.rating} disabled />
          </div>
          <small className="p-3" style={{ display: "block" }}>
            <CollapsibleText as="small">{game.description}</CollapsibleText>
          </small>
        </Card.Text>
      </Card.Body>
      {buttons && buttons.length && (
        <Card.Footer>
          <ButtonGroup>
            {buttons.map(button =>
              button.isConfirmButton ? (
                <ConfirmButton
                  key={button.key || button.label}
                  onConfirm={() => button.onConfirm()}
                  buttonProps={{
                    variant: button.variant,
                    ...(button.buttonProps || {})
                  }}
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
                  {...(button.buttonProps || {})}
                >
                  {button.label}
                </Button>
              )
            )}
          </ButtonGroup>
        </Card.Footer>
      )}
    </Card>
  );
};

export default GameCard;
