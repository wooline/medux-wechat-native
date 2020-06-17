import {navToItem, navToList, navToSubList} from '~/common/base';

export default Behavior({
  behaviors: [],
  methods: {
    navToSubList(e: any) {
      const {type, sid} = e.currentTarget.dataset;
      navToSubList(type, sid);
    },
    navToItem(e: any) {
      const {type, id} = e.currentTarget.dataset;
      navToItem(type, id);
    },
    navToList(e: any) {
      const {type} = e.currentTarget.dataset;
      navToList(type);
    },
  },
});
