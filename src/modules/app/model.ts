import {BaseModelHandlers, BaseModelState, LoadingState, effect, reducer} from '@medux/wechat';
import {CurUser, ProjectConfig} from '~/entity/session';

import api from './api';

export interface State extends BaseModelState {
  projectConfig?: ProjectConfig;
  curUser: CurUser;
  loading: {
    global: LoadingState;
  };
}
export const initModelState: State = {
  curUser: {
    id: '',
    username: 'guest',
    hasLogin: false,
    avatar: '',
  },
  loading: {
    global: LoadingState.Stop,
  },
};
// 定义本模块的Handlers
export class ModelHandlers extends BaseModelHandlers<State, RootState> {
  @reducer
  protected Loading(payload: {[group: string]: string}): State {
    const state = super.Loading(payload);
    const globalLoading = state.loading.global;
    if (globalLoading === LoadingState.Start || globalLoading === LoadingState.Depth) {
      wx.showLoading({title: '加载中', mask: true});
    } else {
      wx.hideLoading();
    }
    return state;
  }
  @effect(null)
  protected async ['this.Init']() {
    const [projectConfig, curUser] = await Promise.all([api.getProjectConfig(), api.getCurUser()]);
    this.updateState({curUser, projectConfig});
    global.historyActions.navigateTo({url: '/app/Welcome'});
  }
}
