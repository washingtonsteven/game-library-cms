import React from "react";
import * as faunadb from "faunadb";

const q = faunadb.query;
let client;

const randString = () =>
  Array(4)
    .fill()
    .map(x => String.fromCharCode(Math.floor(Math.random() * 58) + 65))
    .join("");

const getTestGame = () => ({
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
});

export default () => {
  const [createResponse, setResponse] = React.useState({});

  React.useEffect(() => {
    client = new faunadb.Client({
      secret: process.env.REACT_APP_DEV_FAUNA_KEY
    });
  }, []);

  const addGame = () => {
    client
      .query(q.Create(q.Collection("Game"), { data: getTestGame() }))
      .then(response => {
        setResponse(response);
      });
  };

  return (
    <>
      <button onClick={addGame}>Add a random game</button>
      {createResponse && (
        <pre style={{ textAlign: "left" }}>
          <code>{JSON.stringify(createResponse, null, 1)}</code>
        </pre>
      )}
    </>
  );
};
