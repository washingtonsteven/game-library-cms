import faunadb from "faunadb";

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNA_KEY_DEV
});

exports.handler = async function(event, context, callback) {
  const data = JSON.parse(event.body);
  const gameData = {
    data: data
  };
  return client
    .query(q.Create(q.Collection("Game"), gameData))
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
