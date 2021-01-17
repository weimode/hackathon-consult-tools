import React, { useRef, useState } from 'react';
import { debounce } from 'lodash';
import { FundItem, PaperItem, PatentItem } from '../items';
import OrgnItem from '../items/orgnItem';
import styles from './index.less';

type LoadMoreListProps = {
  dataSource?: any[];
  id: string;
  onEnd: (cb: () => void) => void;
};

const LoadMoreList: React.FC<LoadMoreListProps> = (props) => {
  const { dataSource, id, onEnd } = props;
  const lmList = useRef<HTMLDivElement>(null);
  const listContainer = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const diffItems = (item: any) => {
    switch (id) {
      case 'fund':
        return <FundItem {...item} />;
      case 'orgn':
        return <OrgnItem {...item} />;
      case 'patent':
        return <PatentItem {...item} />;
      case 'paper':
      default:
        return <PaperItem {...item} />;
    }
  };

  return (
    <div
      className={styles['list-container']}
      ref={listContainer}
      onScroll={debounce(() => {
        const curList = lmList.current;
        const container = listContainer.current;
        if (
          (container?.scrollTop || 0) >=
          (curList?.scrollHeight || 0) - (container?.clientHeight || 0)
        ) {
          // setLoading(true);
          if (onEnd) {
            onEnd(() => {
              setLoading(false);
            });
          }
        }
      }, 500)}
    >
      <div className={styles['loadmore-list']} ref={lmList}>
        {dataSource?.map((item, i) => (
          <div key={i} className={styles['list-item']}>
            {diffItems(item)}
          </div>
        ))}
        {loading ? <div className={styles.loading}>Loading...</div> : null}
      </div>
    </div>
  );
};

export default LoadMoreList;
