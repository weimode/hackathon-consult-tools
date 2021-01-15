import type { Effect, Reducer } from 'umi';
import { categoryByParentId } from '@/services/index';

export type CategoryModelState = {
  categoryList: {
    parent_id: string;
    parent_name: string;
    parent_name_en: string;
    name: string;
    nameEn: string;
  }[];
};

type CategoryModelType = {
  namespace: string;
  state: CategoryModelState;
  effects: {
    categoryByParentId: Effect;
  };
  reducers: {
    save: Reducer<CategoryModelState>;
  };
};

const CategoryModel: CategoryModelType = {
  namespace: 'category',
  state: {
    categoryList: [],
  },
  effects: {
    *categoryByParentId({ payload }, { call, put }) {
      const res = yield call(categoryByParentId, payload);
      if (res && res.code === 200) {
        yield put({
          type: 'save',
          payload: {
            categoryList: res.data || [],
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

export default CategoryModel;
