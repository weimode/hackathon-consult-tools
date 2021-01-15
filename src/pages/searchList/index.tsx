import React from 'react';
import { InputItem } from 'antd-mobile';
import styles from './index.less';

const SearchList = () => {
  return (
    <div className={styles['search-list']}>
      <div className={styles['search-bar']}>
        <InputItem
          className={styles.input}
          clear
          placeholder="请输入关键词搜索"
          onVirtualKeyboardConfirm={() => {}}
        />
        {/* <Button className={styles.search}>搜索</Button> */}
      </div>
    </div>
  );
};

export default SearchList;
