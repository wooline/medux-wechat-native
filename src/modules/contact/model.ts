import {CommonResourceHandlers, CommonResourceState} from '~/common/resource';
import {Resource, defaultRouteParams} from '~/entity/contact';

import api from './api';

export interface State extends CommonResourceState<Resource> {}

export const initModelState: State = {routeParams: defaultRouteParams};

const newItem: Resource['ItemDetail'] = {
  id: '',
  name: '',
  gender: 0,
  mobile: '',
  birthday: '',
  iid: '',
  dressSize: 0,
  addr: '',
  createdTime: 0,
};
export class ModelHandlers extends CommonResourceHandlers<Resource, State, RootState> {
  constructor(moduleName: string, store: any) {
    super({defaultRouteParams, api, newItem}, moduleName, store);
  }
}
