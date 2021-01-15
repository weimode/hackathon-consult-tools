import React, { useEffect, useState } from 'react';
import { InputItem, Button, Icon, Flex } from 'antd-mobile';
import type { RouteComponentProps } from '@/models/connect';
import LoadMoreList from '@/components/loadMoreList';
import { queryIndex } from '@/constant/index';
import styles from './index.less';
import { classCombs } from '@/utils/utils';

const data = new Array(50).fill({}).map((item, i) => ({
  img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
  title: `${i + 1} McDonald's invites you`,
  des: '不是所有的兼职汪都需要风吹日晒',
}));

type SearchListProps = RouteComponentProps<any> & {};

const SearchList: React.FC<SearchListProps> = (props) => {
  const { location } = props;
  const { name } = location.query || {};
  const [inputVal, setInputVal] = useState(name);
  const [activeIndex, setActiveIndex] = useState(queryIndex[0].key);
  const [searching, setSearching] = useState(true);

  useEffect(() => {
    setInputVal(name);
  }, [name]);

  const onSearch = () => {
    console.log(inputVal);
    setSearching(false);
  };

  return (
    <div className={styles['search-list']}>
      <div className={styles['search-bar']}>
        <InputItem
          className={styles.input}
          clear
          placeholder="请输入关键词搜索"
          autoFocus
          onChange={(val) => {
            setInputVal(val);
          }}
          onFocus={() => setSearching(true)}
          onVirtualKeyboardConfirm={onSearch}
        />
        <Button className={styles.search} onClick={onSearch}>
          搜索
        </Button>
      </div>
      {searching ? (
        <div className={styles['match-list']}>
          <div className={styles['list-item']}>
            <Icon className={styles.icon} type="search" size="xxs" />
            {inputVal}1233
          </div>
        </div>
      ) : (
        <div>
          <Flex justify="start" align="center">
            {queryIndex.map((item) => (
              <Button
                className={classCombs([
                  styles['index-btn'],
                  activeIndex === item.key ? styles['active-btn'] : '',
                ])}
                key={item.key}
                activeStyle={false}
                onClick={() => setActiveIndex(item.key)}
              >
                {item.label}
              </Button>
            ))}
          </Flex>
          <LoadMoreList dataSource={data} />
        </div>
      )}
    </div>
  );
};

export default SearchList;
