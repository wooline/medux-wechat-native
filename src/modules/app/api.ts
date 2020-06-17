import {CurUser, ProjectConfig} from '~/entity/session';

import {DataSource} from '~/entity/home';
import {dateFormat} from '~/common/dateHelper';

export class API {
  public getProjectConfig(): Promise<ProjectConfig> {
    return global.request('GET', '/api/projectConfig');
  }
  public getCurUser(): Promise<CurUser> {
    return Promise.resolve({
      id: '',
      username: 'guest',
      loggedIn: false,
      avatar: '',
      latestSigned: '',
      signedDays: 0,
    });
  }
  public login(request: {username: string; password: string}): Promise<CurUser> {
    return Promise.resolve({
      id: 'admin',
      username: 'admin',
      loggedIn: true,
      avatar: '',
      latestSigned: '2020/06/16',
      signedDays: 2,
    });
  }
  public sign(): Promise<{latestSigned: string; signedDays: number}> {
    return Promise.resolve({latestSigned: dateFormat(), signedDays: 3});
  }
  public getHomeData(): Promise<DataSource> {
    return global.request('GET', '/api/home');
  }
}

export default new API();
