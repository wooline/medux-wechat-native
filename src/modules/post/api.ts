import {ListItem, ListSearch, ListSummary} from '~/entity/post';

import {CommonResourceAPI} from '~/common/resource';

export class API extends CommonResourceAPI {
  public searchList(request: ListSearch): Promise<{list: ListItem[]; listSummary: ListSummary}> {
    const result = {
      list: [
        {
          id: '1',
          title: '不忘初心、牢记使命”2019“祁阳农商银行杯”陶铸故里·红军行暨“大美永州”大穿越活动（祁阳站）圆满落幕',
          summary:
            '11月24日上午，“不忘初心、牢记使命”2019“祁阳农商银行杯”陶铸故里·红军行暨“大美永州”大穿越活动（祁阳站）在永州市祁阳县火热开赛。共有2000多名来自全国各地的徒步、跑步爱好者以及周边群众共同见证了本次赛事的开幕盛况。',
          thumb: 'http://www.zetutiyu.com/wp-content/uploads/2020/03/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20200313153318.png',
          link: '',
        },
        {
          id: '2',
          title: '不忘初心、牢记使命”2019“祁阳农商银行杯”陶铸故里·红军行暨“大美永州”大穿越活动',
          summary:
            '11月24日上午，“不忘初心、牢记使命”2019“祁阳农商银行杯”陶铸故里·红军行暨“大美永州”大穿越活动（祁阳站）在永州市祁阳县火热开赛。共有2000多名来自全国各地的徒步、跑步爱好者以及周边群众共同见证了本次赛事的开幕盛况。',
          thumb: 'http://www.zetutiyu.com/wp-content/uploads/2020/03/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20200313153318.png',
          link: '',
        },
        {
          id: '3',
          title: '不忘初心、牢记使命”2019“祁阳农商银行杯”陶铸故里·红军行暨“大美永州”大穿越活动（祁阳站）圆满落幕',
          summary:
            '11月24日上午，“不忘初心、牢记使命”2019“祁阳农商银行杯”陶铸故里·红军行暨“大美永州”大穿越活动（祁阳站）在永州市祁阳县火热开赛。共有2000多名来自全国各地的徒步、跑步爱好者以及周边群众共同见证了本次赛事的开幕盛况。',
          thumb: '',
          link: '',
        },
        {
          id: '4',
          title: '不忘初心、牢记使命”2019“祁阳农商银行杯”陶铸故里·红军行暨“大美永州”大穿越活动（祁阳站）圆满落幕',
          summary:
            '11月24日上午，“不忘初心、牢记使命”2019“祁阳农商银行杯”陶铸故里·红军行暨“大美永州”大穿越活动（祁阳站）在永州市祁阳县火热开赛。共有2000多名来自全国各地的徒步、跑步爱好者以及周边群众共同见证了本次赛事的开幕盛况。',
          thumb: '',
          link: '',
        },
      ],
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
