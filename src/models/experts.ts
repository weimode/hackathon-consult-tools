import type { Effect, Reducer } from 'umi';
import { searchAllScholars } from '@/services/index';

export type ExpertInfoType = {
  asjc1stCh: string;
  asjc2ndCh: string;
  hindex: string;
  id: number;
  logo: string;
  nameCh: string;
  nameEn: string;
  orgnNameCh: string;
  orgnNameEn: string;
};

export type ExpertsModelState = {
  expertsList: ExpertInfoType[];
};

export type ExpertsModelType = {
  namespace: string;
  state: ExpertsModelState;
  effects: {
    searchAllScholars: Effect;
  };
  reducers: {
    save: Reducer<ExpertsModelState>;
  };
};

const ExpertsModel: ExpertsModelType = {
  namespace: 'experts',
  state: {
    expertsList: [],
  },
  effects: {
    *searchAllScholars(_, { call, put }) {
      const res = yield call(searchAllScholars, {});
      if (res && res.code === 200) {
        yield put({
          type: 'save',
          payload: {
            expertsList: res.data,
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

export default ExpertsModel;
