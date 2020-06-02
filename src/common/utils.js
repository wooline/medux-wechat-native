"use strict";

exports.__esModule = true;
exports.extract = extract;
exports.uniqueKey = uniqueKey;
exports.simpleEqual = simpleEqual;
exports.pickEqual = pickEqual;
exports.pick = pick;
exports.arrayToMap = arrayToMap;
exports.enumOptions = enumOptions;
exports.reference = reference;

function extract(target, ...args) {
  const clone = Object.assign({}, target);
  const result = args.reduce((prev, cur) => {
    prev[cur] = target[cur];
    delete clone[cur];
    return prev;
  }, {});
  result.$ = clone;
  return result;
}

function uniqueKey() {
  return Math.random().toString(16).substr(2);
}

function simpleEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  } else if (typeof obj1 !== typeof obj2 || typeof obj1 !== 'object') {
    return false;
  } else {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    } else {
      for (const key of keys1) {
        if (!simpleEqual(obj1[key], obj2[key])) {
          return false;
        }
      }

      return true;
    }
  }
}

function pickEqual(obj1, obj2, props) {
  for (let i = 0, k = props.length; i < k; i++) {
    const key = props[i];

    if (!simpleEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

function pick(obj, keys) {
  return keys.reduce((prev, cur) => {
    prev[cur] = obj[cur];
    return prev;
  }, {});
}

function arrayToMap(arr, key = 'id') {
  return arr.reduce((pre, cur) => {
    pre[cur[key]] = cur;
    return pre;
  }, {});
}

function enumOptions(data) {
  const options = [];
  const nameToKey = {};
  const keyToName = {};
  Object.keys(data).forEach(name => {
    options.push({
      name,
      key: data[name]
    });
    nameToKey[name] = data[name];
    keyToName[data[name]] = name;
  });
  return {
    keyToName,
    nameToKey,
    options
  };
}

function reference(...args) {
  return true;
}