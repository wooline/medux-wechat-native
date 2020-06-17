/* global request,database */

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
const recommend = [contests.pop(), grades.pop(), articles.pop()];

const result = {
  statusCode: 200,
  headers: {
    'x-delay': 0,
    'content-type': 'application/json; charset=utf-8',
  },
};
result.statusCode = 200;
result.response = {
  recommend,
  contests,
  grades,
  articles,
};
return result;
