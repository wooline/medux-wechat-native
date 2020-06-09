/* global __server */
const path = require('path');
const crypto = require('crypto');
const mockjs = require('mockjs');
const utils = require(path.join(__dirname, './utils'));
const headers = {
  'x-delay': 0,
  'content-type': 'application/json; charset=utf-8',
};
const cates = {
  '1': '赛事',
  '1_1': '登山赛',
  '1_2': '挑战赛',
  '1_3': '越野赛',
  '1_4': '城市赛',
  '2': '户外',
  '2_1': '自然风光',
  '2_2': '名胜古迹',
  '2_3': '休闲度假',
};
function createContests() {
  const data = {};
  mockjs
    .mock({
      'list|25': [
        {
          'id|+1': 1,
          type: '赛事',
          link: '',
          title: '@ctitle(5,30)',
          summary: '@cparagraph',
          thumb: () => `/photos/${utils.randomNum(1, 18)}.jpg`,
          createdTime: utils.getRandomTime,
          updatedTime: utils.getRandomTime,
          cate: () => `1_${utils.randomNum(1, 4)}`,
          extra: {
            addr: '@city(true)',
            signUpTime: utils.getRandomTime,
            activeTime: utils.getRandomTimeRange,
          },
        },
      ],
    })
    .list.forEach((item) => {
      data[item.id] = item;
    });
  return data;
}
function createArticles() {
  const data = {};
  mockjs
    .mock({
      'list|25': [
        {
          'id|+1': 26,
          type: '文章',
          link: '',
          title: '@ctitle(5,30)',
          summary: '@cparagraph',
          thumb: () => `/photos/${utils.randomNum(1, 18)}.jpg`,
          createdTime: utils.getRandomTime,
          updatedTime: utils.getRandomTime,
          cate: () => `2_${utils.randomNum(1, 3)}`,
        },
      ],
    })
    .list.forEach((item) => {
      data[item.id] = item;
    });
  return data;
}
const contests = createContests();
const articles = createArticles();
const posts = {...contests, ...articles};

const data = {
  config: {
    cates,
    clientPublishPath: '',
    startupPage: {linkUrl: 'aaa', imageUrl: '/imgs/startup.jpg', times: 2},
  },
  contests,
  posts,
};

const database = {
  data,
  action: {
    users: {
      createToken(userId, expired) {
        const version = data.config.version;
        const curUser = data.users[userId];
        const digestData = [userId, curUser.password, expired, version].join(',');
        const md5 = crypto.createHash('md5');
        const digest = md5.update(digestData).digest('hex');
        const tokenData = {expired, userId, version, digest};
        const tokenStr = JSON.stringify(tokenData);
        const token = new Buffer(tokenStr).toString('base64');
        return token;
      },
      verifyToken(token) {
        if (token) {
          try {
            token = new Buffer(token, 'base64').toString();
            token = JSON.parse(token || '{}');
          } catch (e) {
            token = {};
          }
          const {expired, userId, version, digest} = token;
          if (expired && data.users[userId] && version === data.config.version && digest) {
            const since = Date.now() - expired;
            if (since < 0) {
              const curUser = data.users[userId];
              const digestData = [userId, curUser.password, expired, version].join(',');
              const md5 = crypto.createHash('md5');
              const digestStr = md5.update(digestData).digest('hex');
              if (digestStr === digest) {
                return {
                  statusCode: 200,
                  headers,
                  response: {...curUser},
                };
              }
            } else if (since < data.config.tokenRenewalTime) {
              return {
                statusCode: 402,
                headers,
                response: expired.toString(),
              };
            }
          }
        }
        return {
          statusCode: 401,
          headers,
          response: '',
        };
      },
    },
  },
};

return database;
