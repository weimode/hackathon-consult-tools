// import { Subscription } from 'umi';

export type GlobalModelState = any;

export type GlobalModelType = {
  namespace: string;
  state: GlobalModelState;
  // subscriptions: { setup: Subscription };
};

const GlobalModel: GlobalModelType = {
  namespace: 'global',
  state: {},
  // subscriptions: {
  //   setup({ dispatch, history }) {
  //     return history.listen(({ pathname, search }) => {
  //       console.log(pathname, search);
  //       dispatch({
  //         type: 'report/fetchReport',
  //       });
  //     });
  //   },
  // },
};

export default GlobalModel;
