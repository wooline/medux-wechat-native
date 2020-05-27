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

export enum StartupStep {
  init = 'init',
  configLoaded = 'configLoaded',
  startupImageLoaded = 'startupImageLoaded',
  startupCountEnd = 'startupCountEnd',
  startupAnimateEnd = 'startupAnimateEnd',
}
