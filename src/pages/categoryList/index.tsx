import React from 'react';
import { Button } from 'antd-mobile';
import styles from './index.less';
import body_active from '@/assets/image/body.gif';

const CategoryList = () => {
  return (
    <div className={styles['category-list']}>
      <div className={styles.left}>
        <Button>123</Button>
      </div>
      <div className={styles.body}>
        <img src={body_active} alt="" />
      </div>
      <div className={styles.right}>
        <Button>456</Button>
      </div>
    </div>
  );
};

export default CategoryList;
