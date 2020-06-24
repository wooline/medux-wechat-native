declare module 'wechat-remote-redux-devtools';
declare module 'miniprogram-computed';

declare namespace WechatMiniprogram {
  namespace Component {
    interface OtherOption {
      watch: {[key: string]: Function};
      computed: {[key: string]: (data: any) => any};
    }
  }
}
