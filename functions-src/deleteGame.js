import faunadb from "faunadb";

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNA_KEY_DEV
});

exports.handler = async function(event, context, callback) {
  const data = JSON.parse(event.body);
  const gameId = data.ref["@ref"].id;
  return client
    .query(q.Delete(q.Ref(q.Collection("Game"), gameId)))
    .then(response => {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          response: response,
          deleted: true,
          id: gameId
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
