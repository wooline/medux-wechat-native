/* global database */
return {
  statusCode: 504,
  headers: {
    'x-delay': 0,
    'content-type': 'application/json; charset=utf-8',
  },
  response: {startupPage: database.data.config.startupPage},
};
