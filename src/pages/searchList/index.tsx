import React, { useEffect, useState } from 'react';
import { InputItem, Button, Icon, Flex } from 'antd-mobile';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type {
  RouteComponentProps,
  ConnectState,
  QueryModelState,
} from '@/models/connect';
import LoadMoreList from '@/components/loadMoreList';
import { queryIndex } from '@/constant/index';
import styles from './index.less';
import { classCombs } from '@/utils/utils';

type SearchListProps = RouteComponentProps<any> &
  QueryModelState & {
    dispatch: Dispatch;
  };

const SearchList: React.FC<SearchListProps> = (props) => {
  const { location, nameList, dispatch, allList } = props;
  const { name, nameEn }: { name?: string; nameEn?: string } =
    location.query || {};
  const [inputVal, setInputVal] = useState(name);
  const [activeIndex, setActiveIndex] = useState(queryIndex[0].key);
  const [searching, setSearching] = useState(true);
  const [list, setList] = useState<{ data?: any[]; total?: number }>({});
  const [searchParams, setSearchParams] = useState({});

  const onSearch = async (params?: {
    name?: string;
    nameEn?: string;
    loadmore?: boolean;
  }) => {
    setSearching(false);
    await dispatch({
      type: 'query/query',
      payload: {
        query: params?.name || inputVal,
        queryEn: params?.nameEn || '',
      },
    });
  };

  const fetchNameList = (val: string) => {
    dispatch({
      type: 'query/queryNameList',
      payload: val,
    });
  };

  useEffect(() => {
    setInputVal(name || '');
    if (name) {
      setSearchParams({ name, nameEn });
      onSearch({ name, nameEn });
    }
  }, [name]);

  useEffect(() => {
    setList(allList[activeIndex]);
  }, [activeIndex, allList]);

  return (
    <div className={styles['search-list']}>
      <div className={styles['search-bar']}>
        <InputItem
          className={styles.input}
          clear
          placeholder="请输入关键词搜索"
          autoFocus={!name}
          onChange={(val) => {
            setInputVal(val);
            setSearchParams({});
            fetchNameList(val);
          }}
          value={inputVal}
          onFocus={() => setSearching(true)}
          onVirtualKeyboardConfirm={() => {
            onSearch();
          }}
        />
        <Button className={styles.search} onClick={() => onSearch()}>
          搜索
        </Button>
      </div>
      {searching ? (
        <div className={styles['match-list']}>
          {nameList?.map((item) => (
            <div
              key={item.preferredId}
              className={styles['list-item']}
              onClick={() => {
                setInputVal(item.translation || item.keyword);
                setSearchParams({
                  name: item.translation,
                  nameEn: item.keyword,
                });
                onSearch({ name: item.translation, nameEn: item.keyword });
              }}
            >
              <Icon className={styles.icon} type="search" size="xxs" />
              {item.translation || item.keyword}
            </div>
          ))}
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
          <div className={styles.tips}>共{list?.total || 0}条数据</div>
          <LoadMoreList
            dataSource={list?.data || []}
            id={activeIndex}
            onEnd={async (callback) => {
              await onSearch({ ...searchParams, loadmore: true });
              callback();
            }}
          />
        </div>
      )}
    </div>
  );
};

export default connect(({ query }: ConnectState) => ({
  ...query,
}))(SearchList);
