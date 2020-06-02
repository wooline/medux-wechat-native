import {CurUser, ProjectConfig} from '~/entity/session';

export class API {
  public getProjectConfig(): Promise<ProjectConfig> {
    return Promise.resolve({
      startupPage: {linkUrl: 'aaa', imageUrl: '', times: 9},
    });
  }
  public getCurUser(): Promise<CurUser> {
    return Promise.resolve({
      id: 'admin',
      username: 'admin',
      hasLogin: true,
      avatar: '',
    });
  }
}

export default new API();
