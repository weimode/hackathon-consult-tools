import React, { useRef } from 'react';
import styles from './index.less';

type LoadMoreListProps = {
  dataSource?: any[];
  id: string;
};

const LoadMoreList: React.FC<LoadMoreListProps> = (props) => {
  const { dataSource } = props;
  const lmList = useRef<HTMLDivElement>(null);
  const listContainer = useRef<HTMLDivElement>(null);

  return (
    <div
      className={styles['list-container']}
      ref={listContainer}
      onScroll={() => {
        const curList = lmList.current;
        const container = listContainer.current;
        if (
          (container?.scrollTop || 0) >=
          (curList?.scrollHeight || 0) - (container?.clientHeight || 0)
        ) {
          console.log('onEnd');
        }
      }}
    >
      <div className={styles['loadmore-list']} ref={lmList}>
        {dataSource?.map((item, i) => (
          <div key={i} className={styles['list-item']}>
            {item.des}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadMoreList;
