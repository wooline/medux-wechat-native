export type Method = 'GET' | 'DELETE' | 'POST' | 'PUT';

export default function request<T>(method: Method, url: string, params: {[key: string]: any} = {}, args?: {[key: string]: any}): Promise<T> {
  const apiServerPath: {[key: string]: string} = {'/api/': global.metaKeys.ApiServerPath + '/'};
  url = url.replace(/:\w+/g, (flag) => {
    const key = flag.substr(1);
    if (params[key]) {
      const val: string = params[key];
      delete params[key];
      return encodeURIComponent(val);
    } else {
      return '';
    }
  });
  Object.keys(apiServerPath).some((key) => {
    const reg = new RegExp(key);
    if (reg.test(url)) {
      url = url.replace(reg, apiServerPath[key]);
      return true;
    } else {
      return false;
    }
  });
  const data = args || params;
  return new Promise<T>((resolve, reject) => {
    wx.request({
      method,
      url,
      data: Object.keys(data).reduce((prev, cur) => {
        if (data[cur] !== undefined) {
          prev[cur] = data[cur];
        }
        return prev;
      }, {}),
      success(res) {
        if (res.statusCode === 200) {
          resolve(res.data as any);
        } else {
          reject(res.data);
        }
      },
      fail() {
        reject({
          msg: '请求失败',
          url,
          method,
        });
      },
    });
  });
}
