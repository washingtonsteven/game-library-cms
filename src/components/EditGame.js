import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
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

const EditGame = ({ game: rawGameData, onCancel, onUpdate }) => {
  const [game, updateGame] = React.useState(null);
  const [gameId, setGameId] = React.useState("");

  React.useEffect(() => {
    if (rawGameData) {
      updateGame(rawGameData.data);
      setGameId(rawGameData.ref["@ref"].id);
    } else {
      updateGame(null);
      setGameId("");
    }
  }, [rawGameData]);

  const doSubmit = e => {
    e.preventDefault();
    onUpdate(gameId, game);
  };

  const doUpdate = e => {
    // console.log("updating", e.target.id, e.target.value);
    const updatedGame = { ...game };
    updatedGame[e.target.id] = e.target.value;
    updateGame(updatedGame);
  };

  const doUpdateSwitch = e => {
    const updatedGame = { ...game, updated_date: new Date().getTime() };
    updatedGame[e.target.id] = e.target.checked;
    updateGame(updatedGame);
  };

  const handleClose = e => {
    onCancel && onCancel();
  };

  const updateRating = React.useCallback(
    rating => {
      updateGame({
        ...game,
        rating
      });
    },
    [game]
  );

  return (
    <Modal show={game !== null} onHide={handleClose}>
      <Modal.Header closeButton>
        Editing Game: {game ? game.title : ""}
      </Modal.Header>
      <Modal.Body>
        {game ? (
          <Container>
            <Form onSubmit={doSubmit}>
              <Form.Group>
                <Form.Switch
                  id="completed"
                  label="Finished?"
                  checked={game.completed}
                  onChange={doUpdateSwitch}
                />
                <Form.Switch
                  id="owned"
                  label="Owned?"
                  checked={game.owned}
                  onChange={doUpdateSwitch}
                />
                <Form.Switch
                  id="played"
                  label="Played?"
                  checked={game.played}
                  onChange={doUpdateSwitch}
                />
              </Form.Group>
              <Form.Group controlId="notes">
                <Form.Label>Notes</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  value={game.notes}
                  onChange={doUpdate}
                />
              </Form.Group>
              <Form.Group controlId="rating">
                <Form.Label>Rating</Form.Label>
                <Form.Control
                  type="number"
                  value={game.rating}
                  style={{ display: "none" }}
                  readOnly
                />
                <StarRating
                  initialRating={game.rating}
                  onUpdate={updateRating}
                />
              </Form.Group>
              <Form.Group controlId="platform">
                <Form.Label>Platform</Form.Label>
                <Form.Control
                  as="select"
                  value={game.platform}
                  onChange={doUpdate}
                >
                  <option>None Set</option>
                  <option value="computer">PC/Mac</option>
                  <option value="switch">Nintendo Switch</option>
                  <option value="ps4">Playstation 4</option>
                  <option value="3ds">Nintendo 3DS</option>
                  <option value="ds">Nintendo DS</option>
                  <option value="wiiu">Nintendo WiiU</option>
                  <option value="wii">Nintendo Wii</option>
                  <option value="x360">Xbox 360</option>
                  <option value="ps2">Playstation 2</option>
                  <option value="gcn">Nintendo Gamecube</option>
                  <option value="psp">Playstation Portable</option>
                  <option value="psv">Playstation Vita</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Container>
        ) : (
          <Container>No Game to edit</Container>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={doSubmit}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditGame;
