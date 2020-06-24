import {ListItem, ListSearch, ListSummary} from '~/entity/signed';

import {CommonResourceAPI} from '~/common/resource';

export class API extends CommonResourceAPI {
  public searchList(request: ListSearch): Promise<{list: ListItem[]; listSummary: ListSummary}> {
    return global.request('GET', '/api/signed', this._filterEmpty(request));
  }
}

export default new API();
