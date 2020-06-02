import {BaseModelHandlers, BaseModelState, LoadingState, effect, reducer} from '@medux/wechat';

import {CurUser, ProjectConfig, StartupStep} from '~/entity/session';
import api from './api';

export interface State extends BaseModelState {
  projectConfig?: ProjectConfig;
  curUser: CurUser;
  startupStep: StartupStep;
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
  startupStep: StartupStep.init,
  loading: {
    global: LoadingState.Stop,
  },
};
// 定义本模块的Handlers
export class ModelHandlers extends BaseModelHandlers<State, RootState> {
  @effect(null)
  protected async ['this.Init']() {
    const [projectConfig, curUser] = await Promise.all([api.getProjectConfig(), api.getCurUser()]);
    this.updateState({curUser, projectConfig, startupStep: StartupStep.configLoaded});
    global.historyActions.navigateTo({url: '/app/Welcome'});
  }
}
