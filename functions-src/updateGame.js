import faunadb from "faunadb";

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNA_KEY_DEV
});

exports.handler = async function(event, context, callback) {
  const data = JSON.parse(event.body);
  const gameData = {
    data: data.gameData
  };
  const gameId = data.gameId;

  return client
    .query(q.Update(q.Ref(q.Collection("Game"), gameId), gameData))
    .then(response => {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          response: response
        })
      };
    })
    .catch(error => {
      console.log("error", error);
      return {
        statusCode: 400,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(error)
      };
    });
};
