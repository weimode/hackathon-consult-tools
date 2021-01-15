import type { Effect, Reducer } from 'umi';
import { fetchDisease, searchScholarByPreId } from '@/services/index';
import type { ConnectState } from './connect';
import type { ExpertInfoType } from './experts';

export type DiseaseItemType = {
  preferredId: string;
  name: string;
  symptoms?: string;
  cause?: string;
  prevention?: string;
};

export type ConsultModelState = {
  chatList: {
    type: 'robot' | 'user';
    content: string;
    list?: DiseaseItemType[];
    chooseGroup?: boolean;
    experts?: ExpertInfoType[];
  }[];
  diseaseList?: DiseaseItemType[];
  activedId?: string;
};

export type ConsultModelType = {
  namespace: string;
  state: ConsultModelState;
  effects: {
    fetchDisease: Effect;
    selectGroup: Effect;
  };
  reducers: {
    save: Reducer<ConsultModelState>;
    selectList: Reducer<ConsultModelState>;
  };
};

const ConsultModel: ConsultModelType = {
  namespace: 'consult',
  state: {
    diseaseList: [],
    chatList: [],
    activedId: '',
  },
  effects: {
    *fetchDisease(_, { call, put }) {
      const res = yield call(fetchDisease, {});
      if (res && res.code === 200) {
        yield put({
          type: 'save',
          payload: {
            diseaseList: res.data || [],
            chatList: [
              {
                type: 'robot',
                content: '你可以在下方点击你想了解的慢性疾病',
                list: res.data || [],
                chooseGroup: false,
              },
            ],
          },
        });
      }
    },
    *selectGroup({ payload }, { put, call, select }) {
      const { activedId, diseaseList, chatList } = yield select(
        (state: ConnectState) => state.consult,
      );
      const userSay = {
        type: 'user',
        content: payload.label,
      };
      if (payload.key === 'expert') {
        const res = yield call(searchScholarByPreId, activedId);
        if (res && res.code === 200) {
          const newChat = [
            ...chatList,
            userSay,
            {
              type: 'robot',
              content: '专家推荐如下',
              experts: res.data || [],
              chooseGroup: false,
            },
          ];
          yield put({
            type: 'save',
            payload: {
              chatList: newChat,
            },
          });
        }
      } else {
        const curDisease = diseaseList.find(
          (dl: DiseaseItemType) => dl.preferredId === activedId,
        );
        const newChat = [
          ...chatList,
          userSay,
          {
            type: 'robot',
            content: curDisease[payload.key],
            chooseGroup: false,
          },
        ];
        yield put({
          type: 'save',
          payload: {
            chatList: newChat,
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
    selectList(state, { payload }) {
      const { chatList = [] } = state || {};
      const newChat = [...chatList];
      newChat.push(
        {
          type: 'user',
          content: payload.name,
        },
        {
          type: 'robot',
          content: '请选择',
          chooseGroup: true,
        },
      );
      // const pushGroup = setTimeout(async () => {
      //   newChat.push({
      //     type: 'robot',
      //     content: '请选择',
      //     chooseGroup: true,
      //   })
      //   clearTimeout(pushGroup);
      // }, 500);
      return {
        ...state,
        activedId: payload.preferredId,
        chatList: newChat,
      };
    },
  },
};

export default ConsultModel;
