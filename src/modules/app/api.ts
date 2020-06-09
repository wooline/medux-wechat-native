import {CurUser, ProjectConfig} from '~/entity/session';

export class API {
  public getProjectConfig(): Promise<ProjectConfig> {
    return global.request('GET', '/api/projectConfig');
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
