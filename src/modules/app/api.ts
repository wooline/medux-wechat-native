import {CurUser, ProjectConfig, guest} from '~/entity/session';

import {DataSource} from '~/entity/home';
import {dateFormat} from '~/common/dateHelper';

export class API {
  public getProjectConfig(): Promise<ProjectConfig> {
    return global.request('GET', '/api/projectConfig');
  }
  public getCurUser(): Promise<CurUser> {
    return Promise.resolve(guest);
  }
  public login(request: {username: string; password: string}): Promise<CurUser> {
    return Promise.resolve({
      id: 'admin',
      username: 'admin',
      nickName: 'admin',
      gender: 0,
      loggedIn: true,
      avatar: '',
      latestSigned: '2020/06/16',
      signedDays: 2,
      score: 234,
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
