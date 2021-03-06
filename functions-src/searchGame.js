const axios = require("axios");
require("dotenv").config();

exports.handler = function(event, context, callback) {
  const search = event.queryStringParameters
    ? event.queryStringParameters.s
    : null;

  if (!search) {
    return callback(null, {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "No search parameter provided"
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

  return axios({
    method: "post",
    url: "https://api-v3.igdb.com/games",
    headers: {
      Accept: "application/json",
      "user-key": process.env.IGDB_API_KEY
    },
    data: `search "${search}"; fields name, alternative_names.*, cover.*, first_release_date, summary, total_rating, websites.*, platforms.name;`
  }).then(function(response) {
    response.data = response.data.map(g => {
      return {
        ...g,
        description: g.summary,
        cover: g.cover
          ? {
              url: `https://images.igdb.com/igdb/image/upload/t_cover_big/${g.cover.image_id}.jpg`
            }
          : false
      };
    });
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        response: response.data,
        userData: {
          ...claims
        }
      })
    };
  });
};
