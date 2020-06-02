import {ModelHandlers, initModelState} from './model';

import Welcome from './views/Welcome/view';
import {exportModule} from '@medux/wechat';

export default exportModule('app', initModelState, ModelHandlers, {Welcome});
