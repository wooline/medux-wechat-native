import {CurUser} from '../../entity/session';

export class API {
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
