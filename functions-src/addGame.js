import faunadb from "faunadb";

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNA_KEY_DEV
});

exports.handler = async function(event, context, callback) {
  console.log(typeof event.body);
  const data = (() => {
    try {
      return JSON.parse(event.body);
    } catch (e) {
      return null;
    }
  })();

  const gameData = {
    data: data
  };

  if (!data) {
    return callback(null, {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "No data sent to add"
      })
    });
  }

  const claims = context.clientContext && context.clientContext.user;
  if (!claims) {
    return callback(null, {
      statusCode: 401,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "Unauthorized."
      })
    });
  }

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
