import type { Effect, Reducer } from 'umi';
import { queryNameList, query } from '@/services/index';

export type QueryModelState = {
  nameList: {
    preferredId: string;
    keyword: string;
    translation: string;
  }[];
  allList: any;
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
    *query({ payload }, { call, put }) {
      const res = yield call(query, { ...payload });
      if (res && res.code === 200) {
        yield put({
          type: 'save',
          payload: {
            allList: res.data || {},
          },
        });
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
