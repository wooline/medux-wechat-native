interface StoreProps {
  dataSource?: any;
}
interface OwnerProps {}
interface ComponentState {
  refreshing: boolean;
}

type Data = StoreProps & OwnerProps & ComponentState;

interface Methods extends DispatchProp {
  [key: string]: any;
}

export default function (actions: {refreshDataSource: Function}) {
  return Behavior<Data, {}, Methods>({
    behaviors: [],
    data: {
      refreshing: false,
    },
    methods: {
      onRefresh() {
        if (this.data.refreshing) {
          return;
        }
        this.setData({
          refreshing: true,
        });
        this.dispatch!(actions.refreshDataSource());
        setTimeout(() => {
          this.setData({
            refreshing: false,
          });
        }, 1000);
      },
    },
  });
}
