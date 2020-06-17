import {ListItem, ListSearch, ListSummary} from '~/entity/article';

import {CommonResourceAPI} from '~/common/resource';

export class API extends CommonResourceAPI {
  public searchList(request: ListSearch): Promise<{list: ListItem[]; listSummary: ListSummary}> {
    return global.request('GET', '/api/article', this._filterEmpty(request));
  }
  public getDetailItem(id: string): Promise<any> {
    return global.request('GET', '/api/article/:id', {id});
  }
}

export default new API();
