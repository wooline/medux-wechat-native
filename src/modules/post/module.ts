import {ModelHandlers, initModelState} from './model';

import List from './views/List/view';
import Search from './views/Search/view';
import {exportModule} from '@medux/wechat';

export default exportModule('post', initModelState, ModelHandlers, {List, Search});
