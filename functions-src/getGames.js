import faunadb from "faunadb";

const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNA_KEY_DEV
});

exports.handler = async function(event, context, callback) {
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
    .query(q.Paginate(q.Match(q.Index("game_by_user"), claims.sub)))
    .then(function(response) {
      const gameRefs = response.data;

      return client.query(gameRefs.map(ref => q.Get(ref))).then(ret => ({
        statusCode: 200,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          response: ret
        })
      }));
    })
    .catch(function(err) {
      console.log("Got error: ", String(err));
      return {
        statusCode: 422,
        body: String(err)
      };
    });
};
