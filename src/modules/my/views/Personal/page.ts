import * as module from '../../module';

import {connectComponent, errorAction} from '@medux/wechat';

import computedBehavior from 'miniprogram-computed';

global.historyActions.block((location) => {
  const state: RootState = global.store.getState();
  if (!state.app!.curUser.loggedIn) {
    if (location.pathname === '/modules/my/views/Home/page') {
      global.store.dispatch(errorAction({code: global.commonErrorCode.unauthorized}));
      return false;
    }
  }
  return true;
});

interface StoreProps {
  nickName: string;
  gender: number;
  avatar: string;
  score: number;
  birthday: string;
}

interface OwnerProps {}
interface ComponentState {
  genderOptions: {id: number; name: string}[];
  _gender: number;
  _birthday: string;
  avatarUpload: {url: string}[];
}
type Data = StoreProps & OwnerProps & ComponentState;

interface Methods {
  [key: string]: any;
}

const component = connectComponent<RootState, StoreProps>(module, (state) => {
  const {nickName, gender, avatar, score} = state.app!.curUser;
  return {nickName, gender, avatar, score, birthday: ''};
});

const initData: Partial<Data> = {
  gender: 0,
  avatar: '',
  genderOptions: [
    {
      id: 0,
      name: '女',
    },
    {
      id: 1,
      name: '男',
    },
  ],
};
component<Data, {}, Methods>({
  behaviors: [computedBehavior],
  data: initData as Data,
  computed: {
    _gender(data: Data) {
      return data.gender;
    },
    _birthday(data: Data) {
      return data.birthday;
    },
    avatarUpload(data: Data) {
      return [{url: data.avatar, isImage: true, name: 'avatar'}];
    },
  },
  methods: {
    navBack() {
      global.historyActions.navigateBack(1);
    },
    submit() {
      global.historyActions.navigateBack(1);
    },
    onGenderChange(e: any) {
      this.setData({_gender: parseInt(e.detail.value)});
    },
    onBirthdayChange(e: any) {
      this.setData({
        _birthday: e.detail.value,
      });
    },
  },
});
