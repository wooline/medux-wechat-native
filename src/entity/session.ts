export interface CurUser {
  id: string;
  username: string;
  avatar: string;
  loggedIn: boolean;
  latestSigned: string;
  signedDays: number;
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
