export interface CurUser {
  id: string;
  username: string;
  hasLogin: boolean;
  avatar: string;
  expired?: number;
}
export interface StartupPageConfig {
  linkUrl: string;
  imageUrl: string;
  times: number;
}
export interface ProjectConfig {
  startupPage: StartupPageConfig;
}
