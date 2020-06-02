import {connectComponent} from '@medux/wechat';

interface Props {
  term: string;
}
interface Data {}

interface Method {
  [key: string]: any;
}

export const component = connectComponent<RootState, Props>(
  (state) => {
    return {
      curPathname: state.route.location.pathname,
      term: state.post?.routeParams?.listSearch.term || '',
    };
  },
  (dispatch) => {
    return {
      onSearch(this: {data: Data & Props}, {detail}: {detail: string}) {
        dispatch(global.actions.post.doListSearch({term: detail}));
      },
    };
  }
);

const view: any = component<Data & Props, any, Method>({});

export default view;
