import {ListItem, ListSearch, ListSummary} from '~/entity/contact';

import {CommonResourceAPI} from '~/common/resource';

export class API extends CommonResourceAPI {
  public searchList(request: ListSearch): Promise<{list: ListItem[]; listSummary: ListSummary}> {
    return global.request('GET', '/api/contact', this._filterEmpty(request));
  }
  public deleteList(ids: string[]): Promise<void> {
    return Promise.resolve();
  }
}

export default new API();
