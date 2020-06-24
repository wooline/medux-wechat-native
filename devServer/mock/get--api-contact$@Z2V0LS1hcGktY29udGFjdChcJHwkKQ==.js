/* global request,database */

const resourceList = Object.keys(database.data.contacts).map((id) => {
  return database.data.contacts[id];
});

const result = {
  statusCode: 200,
  headers: {
    'x-delay': 0,
    'content-type': 'application/json; charset=utf-8',
  },
};

const totalItems = resourceList.length;

result.statusCode = 200;
result.response = {
  listSummary: {
    pageCurrent: 1,
    pageSize: totalItems,
    totalItems,
    totalPages: 1,
  },
  list: resourceList,
};
return result;
