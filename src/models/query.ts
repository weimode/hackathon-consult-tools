import type { Effect, Reducer } from 'umi';
import { queryNameList, query } from '@/services/index';
import type { ConnectState } from './connect';

export type QueryModelState = {
  nameList: {
    preferredId: string;
    keyword: string;
    translation: string;
  }[];
  allList: any;
  pageNum: number;
};

export type QueryModelType = {
  namespace: string;
  state: QueryModelState;
  effects: {
    query: Effect;
    queryNameList: Effect;
  };
  reducers: {
    save: Reducer<QueryModelState>;
  };
};

const QueryModel: QueryModelType = {
  namespace: 'query',
  state: {
    nameList: [],
    allList: {},
    pageNum: 1,
  },
  effects: {
    *queryNameList({ payload }, { call, put }) {
      const res = yield call(queryNameList, payload);
      if (res && res.code === 200) {
        yield put({
          type: 'save',
          payload: {
            nameList: res.data || [],
          },
        });
      }
    },
    *query({ payload }, { call, put, select }) {
      const { loadmore, ...otherParams } = payload;
      if (loadmore) {
        const { pageNum, allList } = yield select(
          (state: ConnectState) => state.query,
        );
        const res = yield call(query, {
          ...otherParams,
          pageSize: 20,
          pageNum: pageNum + 1,
        });
        if (res && res.code === 200) {
          const nAll = res.data || {};
          yield put({
            type: 'save',
            payload: {
              allList: {
                fund: {
                  ...nAll.fund,
                  data: [...allList.fund?.data, ...nAll.fund?.data],
                },
                orgn: {
                  ...nAll.orgn,
                  data: [...allList.orgn?.data, ...nAll.orgn?.data],
                },
                paper: {
                  ...nAll.paper,
                  data: [...allList.paper?.data, ...nAll.paper?.data],
                },
                patent: {
                  ...nAll.patent,
                  data: [...allList.patent?.data, ...nAll.patent?.data],
                },
              },
              pageNum: pageNum + 1,
            },
          });
        }
      } else {
        const res = yield call(query, {
          ...otherParams,
          pageSize: 20,
          pageNum: 1,
        });
        if (res && res.code === 200) {
          yield put({
            type: 'save',
            payload: {
              allList: res.data || {},
              pageNum: 1,
            },
          });
        }
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default QueryModel;
