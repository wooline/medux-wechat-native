import {BaseModelHandlers, BaseModelState, LoadingState, effect, reducer} from '@medux/wechat';
import {CurUser, ProjectConfig} from '~/entity/session';

import {DataSource} from '~/entity/home';
import api from './api';

export interface State extends BaseModelState {
  projectConfig?: ProjectConfig;
  curUser: CurUser;
  dataSource?: DataSource;
  showLoginPopup: boolean;
  loading: {
    global: LoadingState;
  };
}
export const initModelState: State = {
  showLoginPopup: false,
  curUser: {
    id: '',
    username: 'guest',
    avatar: '',
    loggedIn: false,
    latestSigned: '',
    signedDays: 0,
  },
  loading: {
    global: LoadingState.Stop,
  },
};
// 定义本模块的Handlers
export class ModelHandlers extends BaseModelHandlers<State, RootState> {
  @reducer
  protected putDatasource(dataSource: DataSource): State {
    return {...this.state, dataSource};
  }
  @reducer
  protected putCurUser(curUser: CurUser): State {
    return {...this.state, curUser};
  }
  @reducer
  public showLoginPopup(showLoginPopup: boolean): State {
    return {...this.state, showLoginPopup};
  }

  @effect()
  public async refreshDataSource() {
    const dataSource = await api.getHomeData();
    this.dispatch(this.callThisAction(this.putDatasource, dataSource));
  }
  @effect()
  public async sign() {
    const data = await api.sign();
    const curUser = this.state.curUser;
    this.dispatch(this.callThisAction(this.putCurUser, {...curUser, ...data}));
    global.historyActions.navigateTo('/app/signed');
  }
  @effect()
  public async login(data: {username: string; password: string}) {
    const curUser = await api.login(data);
    this.updateState({curUser, showLoginPopup: false});
  }
  @effect()
  protected async ['this.Init']() {
    const [projectConfig, curUser] = await Promise.all([api.getProjectConfig(), api.getCurUser()]);
    this.updateState({curUser, projectConfig});
    global.historyActions.navigateTo({url: '/app/Welcome'});
    this.refreshDataSource();
  }
}
