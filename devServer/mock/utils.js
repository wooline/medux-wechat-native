const mockjs = require('mockjs');
function getRandomPhoto() {
  return `/photos/${randomNum(1, 18)}.jpg`;
}
const randomAvatars = new Array(14).fill(1).map((v, i) => {
  return {name: mockjs.Random.cname(), avatar: `/photos/u${i + 1}.jpg`};
});
function getRandomAvatars() {
  const num = 3;
  const n = randomNum(0, randomAvatars.length - 1 - num);
  return randomAvatars.slice(n, n + 3);
}
const timestamp = Date.now() + 1000 * 3600 * 24 * 50;

function randomNum(minNum, maxNum) {
  //return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
  return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
}
const randomTimes = new Array(20).fill(timestamp).map((t) => {
  const n = Math.floor(Math.random() * 100);
  return t - n * 1000 * 3600 * 24;
});
function getRandomTime() {
  const n = randomNum(0, randomTimes.length - 1);
  return randomTimes[n];
}
function getRandomTimeRange() {
  const n = randomNum(0, randomTimes.length - 1);
  return [randomTimes[n], randomTimes[n] + 1000 * 3600 * 24];
}
function createMap(obj = {}, len = 50, prot) {
  if (prot === undefined) {
    prot = Object.keys(obj).length;
  }
  let protKeys = Object.keys(obj);
  protKeys.length = prot;
  protKeys = protKeys.reduce((pre, cur) => {
    pre[cur] = true;
    return pre;
  }, {});
  return new Proxy(obj, {
    set: function (target, key, value, receiver) {
      if (protKeys[key]) {
        return false;
      }
      const result = Reflect.set(target, key, value, receiver);
      const keys = Object.keys(target);
      if (keys.length > len) {
        Reflect.deleteProperty(target, keys[prot]);
      }
      return result;
    },
    deleteProperty: function (target, key) {
      if (protKeys[key]) {
        return false;
      }
      delete target[key];
      return true;
    },
  });
}
function createArray(arr = [], len = 50, prot) {
  if (prot === undefined) {
    prot = arr.length;
  }
  return new Proxy(arr, {
    get: function (target, key, receiver) {
      switch (key) {
        case 'push':
          return (...args) => {
            target.push(...args);
            const splcie = target.length - len;
            if (splcie > 0) {
              target.splice(prot, splcie);
            }
            return target.length;
          };
          break;
        case 'unshift':
          return (...args) => {
            target.splice(prot, 0, ...args);
            if (target.length > len) {
              target.length = len;
            }
            return target.length;
          };
          break;
        case 'splice':
          return (start, ...args) => {
            target.splice(prot + start, ...args);
            if (target.length > len) {
              target.length = len;
            }
            return target.length;
          };
          break;
      }
      return Reflect.get(target, key, receiver);
    },
    set: function (target, key, value, receiver) {
      const index = Number(key);
      if (!isNaN(index)) {
        if (index < prot) {
          return true;
        }
        if (index > len - 1) {
          key = len - 1;
        }
      } else if (key === 'length') {
        if (value > len) {
          value = len;
        }
      }
      return Reflect.set(target, key, value, receiver);
    },
  });
}
module.exports = {
  randomNum,
  getRandomTime,
  getRandomTimeRange,
  getRandomAvatars,
  getRandomPhoto,
  createArray,
  createMap,
};
