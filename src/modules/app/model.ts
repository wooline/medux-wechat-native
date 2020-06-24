import {ActionTypes, BaseModelHandlers, BaseModelState, LoadingState, effect, reducer} from '@medux/wechat';
import {CurUser, ProjectConfig, guest} from '~/entity/session';

import {DataSource} from '~/entity/home';
import api from './api';

export interface State extends BaseModelState {
  projectConfig?: ProjectConfig;
  curUser: CurUser;
  dataSource?: DataSource;
  showLoginPopup: boolean;
  steps: number[];
  loading: {
    global: LoadingState;
  };
}
export const initModelState: State = {
  showLoginPopup: false,
  curUser: guest,
  steps: [364, 1234, 7867, 433, 0, 645, 10867, 345, 8620, 2124, 13656, 364, 1234, 7867, 433, 0, 645, 10867, 345, 8620, 2124, 364, 1234, 7867, 433, 0, 645, 10867, 345, 8620, 2124].slice(0, 30),
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
  protected putSteps(steps: number[]): State {
    return {...this.state, steps};
  }
  @reducer
  public showLoginPopup(showLoginPopup: boolean): State {
    return {...this.state, showLoginPopup};
  }
  @effect()
  public async getTodaySteps() {
    const data: any = await wx.getWeRunData();
    const result: Promise<WechatMiniprogram.GetWeRunDataSuccessCallbackResult> = data;
    console.log(result);
    this.dispatch(
      this.callThisAction(
        this.putSteps,
        [364, 1234, 7867, 433, 0, 645, 10867, 345, 8620, 2124, 13656, 364, 1234, 7867, 433, 0, 645, 10867, 345, 8620, 2124, 364, 1234, 7867, 433, 0, 645, 10867, 345, 8620, 2124].slice(0, 30)
      )
    );
    global.historyActions.navigateTo('/app/steps');
  }
  @effect()
  public async refreshDataSource() {
    const dataSource = await api.getHomeData();
    this.dispatch(this.callThisAction(this.putDatasource, dataSource));
  }
  @effect()
  public async sign() {
    const location = await wx.getLocation({});
    console.log(location);
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
  public async logout() {
    this.updateState({curUser: guest});
  }
  @effect()
  public async loginWithWechat(wuser: {avatarUrl: string; gender: number; nickName: string}) {
    const curUser: CurUser = {
      id: 'admin',
      username: wuser.nickName,
      nickName: wuser.nickName,
      gender: wuser.gender,
      loggedIn: true,
      avatar: wuser.avatarUrl,
      latestSigned: '2020/06/16',
      signedDays: 2,
      score: 234,
    };
    this.updateState({curUser, showLoginPopup: false});
    global.message.success('登录成功！');
  }
  @effect(null) // 不需要loading，设置为null
  protected async [ActionTypes.Error](error: {code: string; message?: string}) {
    if (error.code === global.commonErrorCode.unauthorized) {
      const curUser = this.state.curUser;
      if (curUser.loggedIn) {
        this.dispatch(this.actions.logout());
      }
      this.dispatch(this.actions.showLoginPopup(true));
    }
  }
  @effect()
  protected async ['this.Init']() {
    // const {authSetting} = await wx.getSetting({});
    // if (!authSetting['scope.userInfo']) {
    //   debugger;
    //   const userScope = await wx.authorize({scope: 'scope.record'});
    //   console.log(userScope);
    // }

    const [projectConfig, curUser] = await Promise.all([api.getProjectConfig(), api.getCurUser()]);
    this.updateState({curUser, projectConfig});
    global.historyActions.navigateTo({url: '/app/Welcome'});
    this.refreshDataSource();
  }
}
