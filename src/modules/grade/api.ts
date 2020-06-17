import {ListItem, ListSearch, ListSummary} from '~/entity/grade';

import {CommonResourceAPI} from '~/common/resource';

export class API extends CommonResourceAPI {
  public searchList(request: ListSearch): Promise<{list: ListItem[]; listSummary: ListSummary}> {
    return global.request('GET', '/api/grade', this._filterEmpty(request));
  }
  public getDetailItem(id: string): Promise<any> {
    return global.request('GET', '/api/grade/:id', {id});
  }
}

export default new API();
