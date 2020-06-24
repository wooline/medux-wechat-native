import {CommonResourceHandlers, CommonResourceState} from '~/common/resource';
import {Resource, defaultRouteParams} from '~/entity/signed';

import {ListItem as Master} from '~/entity/contact';
import api from './api';

export interface State extends CommonResourceState<Resource> {}

export const initModelState: State = {routeParams: defaultRouteParams};

export class ModelHandlers extends CommonResourceHandlers<Resource, State, RootState> {
  constructor(moduleName: string, store: any) {
    super({defaultRouteParams, api}, moduleName, store);
  }
  protected createNewItem(): Promise<Resource['ItemDetail']> {
    const {cid, cgid} = this.state.routeParams!;
    const curContest = this.rootState.contest!.detail!.itemDetail;
    const {title, thumb, signUpTime, activeTime} = curContest;
    const group = curContest.groups.find((item) => item.id === cgid);
    const master: Master = {
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
    return Promise.resolve({id: '', cid, cname: title, cgid, cgname: group!.name, price: group!.price, thumb, signUpTime, activeTime, master, createdTime: 0});
  }
}
