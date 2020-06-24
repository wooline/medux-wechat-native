export interface CurUser {
  id: string;
  username: string;
  gender: number;
  nickName: string;
  avatar: string;
  loggedIn: boolean;
  latestSigned: string;
  signedDays: number;
  score: number;
}
export interface StartupPageConfig {
  linkUrl: string;
  imageUrl: string;
  times: number;
}
export interface ProjectConfig {
  clientPublishPath: string;
  cates: {[cid: string]: string};
  startupPage: StartupPageConfig;
}
export const guest: CurUser = {
  id: '',
  username: 'guest',
  nickName: '',
  gender: 0,
  avatar: '',
  loggedIn: false,
  latestSigned: '',
  signedDays: 0,
  score: 0,
};
