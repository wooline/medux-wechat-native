/* global request,database */
let {term = '', category = '', title = '', sorterField = '', sorterOrder = '', pageCurrent, pageSize} = request.query;

term = term.toString();
category = category.toString();
title = title.toString();
sorterField = sorterField.toString();
sorterOrder = sorterOrder.toString();
pageCurrent = parseInt(pageCurrent) || 1;
pageSize = parseInt(pageSize) || 10;

const contestsData = database.data.contests;

const result = {
  statusCode: 200,
  headers: {
    'x-delay': 0,
    'content-type': 'application/json; charset=utf-8',
  },
};

let resourceList = Object.keys(contestsData).map((id) => {
  return contestsData[id];
});

let list, listSummary;

if (category === 'all') {
  const cates = database.data.config.cates;
  const categorySummary = Object.keys(cates).reduce((result, key) => {
    const arr = key.split('_');
    if (arr[0] === '1' && arr[1]) {
      result[arr[1]] = [];
    }
    return result;
  }, {});
  list = [];
  for (const id in contestsData) {
    if (contestsData.hasOwnProperty(id)) {
      const item = contestsData[id];
      const arr = item.cate.split('_');
      const category = categorySummary[arr[1]];
      if (category.length < 1) {
        list.push(item);
        category.push(list.length - 1);
      }
    }
  }
  listSummary = {
    pageCurrent,
    pageSize: list.length,
    totalItems: list.length,
    totalPages: 1,
    category: Object.keys(categorySummary).map((id) => {
      return {id: '1_' + id, name: cates['1_' + id]};
    }),
    recommend: [0, 1, 2, 3],
  };
} else {
  const start = (pageCurrent - 1) * pageSize;
  const end = start + pageSize;

  if (category) {
    resourceList = resourceList.filter((item) => item.cate === category);
  }
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
  list = resourceList.slice(start, end);
  listSummary = {
    pageCurrent,
    pageSize,
    totalItems,
    totalPages: Math.ceil(totalItems / pageSize),
  };
}
result.statusCode = 200;
result.response = {
  listSummary,
  list,
};
return result;
