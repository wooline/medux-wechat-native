import {BaseModelHandlers, BaseModelState, LoadingState, effect, reducer} from '@medux/wechat';

import {CurUser} from '../../entity/session';
import api from './api';

export interface State extends BaseModelState {
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
  public putCurUser(curUser: CurUser): State {
    return {...this.state, curUser};
  }

  @effect(null)
  protected async ['this.Init']() {
    const curUser = await api.getCurUser();
    this.dispatch(this.actions.putCurUser(curUser));
  }
}
