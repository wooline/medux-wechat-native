import {ListItem, ListSearch, ListSummary} from '~/entity/my';

import {CommonResourceAPI} from '~/common/resource';

export class API extends CommonResourceAPI {
  public searchList(request: ListSearch): Promise<{list: ListItem[]; listSummary: ListSummary}> {
    const result = {
      list: [{title: '', summary: '', thumb: '', link: '', id: ''}],
      listSummary: {
        pageCurrent: 1,
        pageSize: 10,
        totalItems: 0,
        totalPages: 1,
      },
    };
    return Promise.resolve(result);
  }
}

export default new API();
