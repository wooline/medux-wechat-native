/* global request,database */
let {term = '', title = '', sorterField = '', sorterOrder = '', pageCurrent, pageSize, purviews} = request.query;

term = term.toString();
title = title.toString();
sorterField = sorterField.toString();
sorterOrder = sorterOrder.toString();
pageCurrent = parseInt(pageCurrent) || 1;
pageSize = parseInt(pageSize) || 10;

const contests = Object.keys(database.data.contests)
  .slice(0, 3)
  .map((id) => {
    return database.data.contests[id];
  });
const grades = Object.keys(database.data.grades)
  .slice(0, 3)
  .map((id) => {
    return database.data.grades[id];
  });
const articles = Object.keys(database.data.articles)
  .slice(0, 3)
  .map((id) => {
    return database.data.articles[id];
  });
const resourceList = [].concat(contests, grades, articles);

const result = {
  statusCode: 200,
  headers: {
    'x-delay': 0,
    'content-type': 'application/json; charset=utf-8',
  },
};

const start = (pageCurrent - 1) * pageSize;
const end = start + pageSize;

if (sorterField === 'createdTime') {
  if (sorterOrder === 'ascend') {
    resourceList.sort((a, b) => {
      return a.createdTime - b.createdTime;
    });
  } else if (sorterOrder === 'descend') {
    resourceList.sort((a, b) => {
      return b.createdTime - a.createdTime;
    });
  }
}
const totalItems = resourceList.length;

result.statusCode = 200;
result.response = {
  listSummary: {
    pageCurrent,
    pageSize,
    totalItems,
    totalPages: Math.ceil(resourceList.length / pageSize),
  },
  list: resourceList.slice(start, end),
};
return result;
