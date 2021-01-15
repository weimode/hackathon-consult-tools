import React, { useEffect } from 'react';
import { Button } from 'antd-mobile';
import type { Dispatch } from 'umi';
import { connect, history } from 'umi';
import type {
  RouteComponentProps,
  ConnectState,
  CategoryModelState,
} from '@/models/connect';
import styles from './index.less';
import body_active from '@/assets/image/body.gif';

type CategoryListProps = RouteComponentProps<any> &
  CategoryModelState & {
    dispatch: Dispatch;
  };

const CategoryList: React.FC<CategoryListProps> = (props) => {
  const { dispatch, location, categoryList } = props;
  const { parentId }: { parentId?: string } = location.query || {};
  useEffect(() => {
    dispatch({
      type: 'category/categoryByParentId',
      payload: parentId,
    });
  }, []);
  const halfCount = Math.ceil(categoryList?.length / 2);
  return (
    <div className={styles['category-list']}>
      <div className={styles.left}>
        {categoryList?.slice(0, halfCount).map((item, i) => (
          <Button
            key={i}
            className={styles.btn}
            onClick={() => {
              history.push(`/query?name=${item.name}&nameEn=${item.nameEn}`);
            }}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <div className={styles.body}>
        <img src={body_active} alt="" />
      </div>
      <div className={styles.right}>
        {categoryList?.slice(halfCount).map((item, i) => (
          <Button
            key={i + halfCount}
            className={styles.btn}
            onClick={() => {
              history.push(`/query?name=${item.name}&nameEn=${item.nameEn}`);
            }}
          >
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default connect(({ category }: ConnectState) => ({
  ...category,
}))(CategoryList);
