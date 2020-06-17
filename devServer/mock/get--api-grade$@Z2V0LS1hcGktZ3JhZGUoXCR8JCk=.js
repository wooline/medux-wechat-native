/* global request,database */
let {term = '', title = '', sorterField = '', sorterOrder = '', pageCurrent, pageSize, purviews} = request.query;

term = term.toString();
title = title.toString();
sorterField = sorterField.toString();
sorterOrder = sorterOrder.toString();
pageCurrent = parseInt(pageCurrent) || 1;
pageSize = parseInt(pageSize) || 10;

const gradesData = database.data.grades;

const result = {
  statusCode: 200,
  headers: {
    'x-delay': 0,
    'content-type': 'application/json; charset=utf-8',
  },
};

const start = (pageCurrent - 1) * pageSize;
const end = start + pageSize;

let resourceList = Object.keys(gradesData).map((id) => {
  return gradesData[id];
});

if (term) {
  resourceList = resourceList.filter((item) => item.title.includes(term));
}
if (title) {
  resourceList = resourceList.filter((item) => item.title.includes(title));
}

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
