import {BaseModelHandlers, BaseModelState, LoadingState, effect, reducer} from '@medux/wechat';

import api from './api';

export interface State extends BaseModelState {}

export const initModelState: State = {};

export class ModelHandlers extends BaseModelHandlers<State, RootState> {}
