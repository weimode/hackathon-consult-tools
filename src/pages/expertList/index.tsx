import React, { useEffect, useState } from 'react';
import { Button } from 'antd-mobile';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { ConnectState, ExpertsModelState } from '@/models/connect';
import { ExpertItem } from '@/components/items';
import styles from './index.less';

type ExpertListProps = ExpertsModelState & {
  dispatch: Dispatch;
};

const ExpertList: React.FC<ExpertListProps> = (props) => {
  const { expertsList, dispatch } = props;
  const [startIndex, setStartIndex] = useState(0);
  useEffect(() => {
    dispatch({
      type: 'experts/searchAllScholars',
    });
  }, []);
  return (
    <div className={styles['expert-list']}>
      <div className={styles.header}>
        <Button
          className={styles.change}
          onClick={() => {
            setStartIndex(startIndex < 14 ? startIndex + 5 : 0);
          }}
        >
          换一批
        </Button>
      </div>
      <div>
        {expertsList?.slice(startIndex, startIndex + 5).map((item) => (
          <ExpertItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default connect(({ experts }: ConnectState) => ({
  ...experts,
}))(ExpertList);
