import * as module from '../../module';

import {connectComponent} from '@medux/wechat';

interface StoreProps {
  term: string;
}
interface OwnerProps {}
interface ComponentState {}

type Data = StoreProps & OwnerProps & ComponentState;

const component = connectComponent<RootState, StoreProps, {}>(
  module,
  (state) => {
    return {
      curPathname: state.route.location.pathname,
      term: state.post?.routeParams?.listSearch.term || '',
    };
  },
  (dispatch) => {
    return {
      onSearch({detail}: {detail: string}) {
        dispatch(global.actions.post.doListSearch({term: detail}));
      },
    };
  }
);

component<Data, {}, {}>({});
