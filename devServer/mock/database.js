/* global __server */
const path = require('path');
const crypto = require('crypto');
const mockjs = require('mockjs');
const utils = require(path.join(__dirname, './utils'));
const timestamp = Date.now();
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
const groups = ['个人赛', '团队赛', '男子组', '女子组', '越野组', '100公里', '10公里', '50公里', '老年组'];
function createContests() {
  const data = {};
  mockjs
    .mock({
      'list|25': [
        {
          'id|+1': 1,
          type: 'contest',
          link: '',
          title: '@ctitle(5,30)',
          summary: '@cparagraph',
          thumb: utils.getRandomPhoto,
          createdTime: utils.getRandomTime,
          cate: () => `1_${utils.randomNum(1, 4)}`,
          'groups|1-5': [
            {
              'id|+1': 1,
              'name|+1': groups,
              'price|20-500': 20,
            },
          ],
          addr: '@city(true)',
          activeTime: utils.getRandomTimeRange,
          'singUpNum|20-100': 20,
        },
      ],
    })
    .list.forEach((item) => {
      item.updatedTime = item.createdTime + 1000 * 3600 * 24 * 2;
      item.signUpTime = [item.activeTime[0] - 1000 * 3600 * 24 * 20, item.activeTime[0] - 1000 * 3600 * 24 * 2];
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
          type: 'article',
          link: '',
          title: '@ctitle(5,30)',
          summary: '@cparagraph',
          thumb: utils.getRandomPhoto,
          createdTime: utils.getRandomTime,
          cate: () => `2_${utils.randomNum(1, 3)}`,
        },
      ],
    })
    .list.forEach((item) => {
      item.updatedTime = item.createdTime + 1000 * 3600 * 24 * 2;
      data[item.id] = item;
    });
  return data;
}
function createGrades() {
  const data = {};
  mockjs
    .mock({
      'list|25': [
        {
          'id|+1': 51,
          type: 'grade',
          link: '',
          title: '@ctitle(5,30)',
          summary: '@cparagraph',
          thumb: utils.getRandomPhoto,
          createdTime: utils.getRandomTime,
          cate: `1_${utils.randomNum(1, 4)}`,
          top: utils.getRandomAvatars,
          'groups|1-5': [
            {
              'id|+1': 1,
              'name|+1': groups,
              grades: utils.getRandomAvatars,
            },
          ],
          addr: '@city(true)',
          activeTime: utils.getRandomTimeRange,
          'singUpNum|20-100': 20,
        },
      ],
    })
    .list.forEach((item) => {
      item.signUpTime = [item.activeTime[0] - 1000 * 3600 * 24 * 20, item.activeTime[0] - 1000 * 3600 * 24 * 2];
      item.updatedTime = item.createdTime + 1000 * 3600 * 24 * 2;
      data[item.id] = item;
    });
  return data;
}
function createContacts() {
  const data = {};
  mockjs
    .mock({
      'list|5': [
        {
          'id|+1': 1,
          name: '@cname',
          'gender|0-1': 0,
          'mobile|13000000000-19000000000': 13000000000,
          createdTime: utils.getRandomTime,
          birthday: '@date',
          'iid|43000000000000-44000000000000': 43000000000000,
          addr: '@city(true)',
          'dressSize|0-2': 0,
        },
      ],
    })
    .list.forEach((item) => {
      data[item.id] = item;
    });
  return data;
}
function createSigneds() {
  const data = {};
  mockjs
    .mock({
      'list|15': [
        {
          'id|+1': 1,
          'cid|1-25': 1,
          cname: '@ctitle(5,30)',
          thumb: utils.getRandomPhoto,
          activeTime: utils.getRandomTimeRange,
          'cgid|0-2': 0,
          'cgname|1': groups,
          'price|50-200': 50,
          createdTime: utils.getRandomTime,
          master: {
            'id|+1': 1,
            username: '@cname',
            'gender|0-1': 0,
            'mobile|13000000000-19000000000': 13000000000,
            createdTime: utils.getRandomTime,
            birthday: '@date',
            'iid|43000000000000-44000000000000': 43000000000000,
            addr: '@city(true)',
            'dressSize|0-2': 0,
          },
        },
      ],
    })
    .list.forEach((item) => {
      item.signUpTime = [item.activeTime[0] - 1000 * 3600 * 24 * 20, item.activeTime[0] - 1000 * 3600 * 24 * 2];
      item.updatedTime = item.createdTime + 1000 * 3600 * 24 * 2;
      data[item.id] = item;
    });
  return data;
}
const contests = createContests();
const articles = createArticles();
const grades = createGrades();
const contacts = createContacts();
const signeds = createSigneds();

const data = {
  config: {
    cates,
    clientPublishPath: '',
    startupPage: {linkUrl: 'aaa', imageUrl: '/imgs/startup.jpg', times: 2},
  },
  contests,
  grades,
  articles,
  contacts,
  signeds,
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
