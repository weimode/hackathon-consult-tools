import React, { useEffect } from 'react';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { ConnectState, ConsultModelState } from '@/models/connect';
import type { DiseaseItemType } from '@/models/consult';
import styles from './index.less';
import { RobotCard, UserCard } from './components/card';

type AutoConsultProps = ConsultModelState & {
  dispatch: Dispatch;
};

const AutoConsult: React.FC<AutoConsultProps> = (props) => {
  const { chatList, dispatch } = props;
  useEffect(() => {
    dispatch({
      type: 'consult/fetchDisease',
    });
    return () => {
      dispatch({
        type: 'consult/save',
        payload: {
          chatList: [],
        },
      });
    };
  }, []);
  return (
    <div className={styles['auto-consult']}>
      <div className={styles.tips}>您好，小A将为您答疑解惑！</div>
      {chatList.map((item, i) => {
        if (item.type === 'user') {
          return <UserCard key={i} {...item} />;
        }
        return (
          <RobotCard
            key={i}
            {...item}
            onSelect={(values: DiseaseItemType) => {
              dispatch({
                type: 'consult/selectList',
                payload: values,
              });
            }}
            onQuery={(values: { label: string; key: string }) => {
              dispatch({
                type: 'consult/selectGroup',
                payload: values,
              });
            }}
          />
        );
      })}
    </div>
  );
};

export default connect(({ consult }: ConnectState) => ({
  ...consult,
}))(AutoConsult);
