import React from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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

export default ({ game: initialGameData }) => {
  const [game, updateGame] = React.useState(initialGameData);

  const doSubmit = e => {
    e.preventDefault();
    console.log("submitted:", game);
  };

  const doUpdate = e => {
    console.log("updating", e.target.id, e.target.value);
    const updatedGame = { ...game };
    updatedGame[e.target.id] = e.target.value;
    updateGame(updatedGame);
  };

  const doUpdateSwitch = e => {
    const updatedGame = { ...game };
    updatedGame[e.target.id] = e.target.checked;
    updateGame(updatedGame);
  };

  return (
    <Container>
      <h2>Editing...</h2>
      <h1>{game.title}</h1>
      <Form onSubmit={doSubmit}>
        <Form.Group>
          <Form.Switch
            id="completed"
            label="Completed?"
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
          <Form.Control type="number" value={game.rating} onChange={doUpdate} />
        </Form.Group>
        <Form.Group controlId="platform">
          <Form.Label>Platform</Form.Label>
          <Form.Control as="select" value={game.platform} onChange={doUpdate}>
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
        <Button type="submit">Submit</Button>
      </Form>
    </Container>
  );
};
