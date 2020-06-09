//修改自 https://github.com/lingxiaoyi/navigation-bar

const App = getApp<APP>();

interface StoreProps {}
interface OwnerProps {
  extClass: string;
  background: string;
  color: string;
  title: string;
  showBack: boolean;
  show: boolean;
}
interface ComponentState {
  navHeight: number;
  navPaddingTop: number;
}

interface Methods {
  [key: string]: any;
}
type Data = StoreProps & OwnerProps & ComponentState;
type Properties = Record<keyof OwnerProps, {type: any; value: any}>;

const properties: Properties = {
  extClass: {
    type: String,
    value: '',
  },
  background: {
    type: String,
    value: '#0089ff',
  },
  color: {
    type: String,
    value: '#fff',
  },
  title: {
    type: String,
    value: '',
  },
  showBack: {
    type: Boolean,
    value: true,
  },
  show: {
    type: Boolean,
    value: true,
  },
};

Component<Data, {}, Methods>({
  options: {
    addGlobalClass: true,
  },
  properties,
  lifetimes: {
    attached() {
      this.data.show &&
        this.setData({
          navHeight: App.globalData.navHeight,
          navPaddingTop: App.globalData.navPaddingTop,
        });
    },
  },
  // pageLifetimes: {
  //   show() {
  //     if (_globalSystemInfo!.ios) {
  //       this.data.show && this.setData(getState(this.data));
  //     }
  //   },
  // },
  methods: {
    back() {
      global.historyActions.navigateBack(5);
      //this.triggerEvent('back', {delta: this.data.delta});
    },
  },
});

export {};
