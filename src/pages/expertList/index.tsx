import React from 'react';
import { Button } from 'antd-mobile';
import styles from './index.less';

const ExpertList = () => {
  return (
    <div>
      <Button className={styles.change}>换一批</Button>
      <div></div>
    </div>
  );
};

export default ExpertList;
