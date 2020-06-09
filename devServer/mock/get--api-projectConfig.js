/* global database,request */
return {
  statusCode: 200,
  headers: {
    'x-delay': 0,
    'content-type': 'application/json; charset=utf-8',
  },
  response: {...database.data.config, clientPublishPath: [request.protocol, '://', request.headers.host, '/client'].join('')},
};
