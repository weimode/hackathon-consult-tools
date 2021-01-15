import React from 'react';
import { Button } from 'antd-mobile';
import type { DiseaseItemType } from '@/models/consult';
import type { ExpertInfoType } from '@/models/experts';
import styles from './index.less';
import robot_avatar from '@/assets/image/avatar-robot.png';
import user_avatar from '@/assets/image/avatar-user.png';
import { classCombs } from '@/utils/utils';
import { consultGroup } from '@/constant/index';

const UserCard = (props: { content: string }) => {
  const { content } = props;
  return (
    <div className={classCombs([styles.card, styles['user-card']])}>
      <div className={styles.bubble}>{content}</div>
      <img className={styles.avatar} src={user_avatar} alt="" />
    </div>
  );
};

type RobotCardType = {
  content: string;
  list?: DiseaseItemType[];
  experts?: ExpertInfoType[];
  chooseGroup?: boolean;
  onSelect?: (payload: DiseaseItemType) => void;
  onQuery?: (value: { label: string; key: string }) => void;
};

const RobotCard = (props: RobotCardType) => {
  const { content, list, chooseGroup, experts, onSelect, onQuery } = props;
  return (
    <div className={classCombs([styles.card, styles['robot-card']])}>
      <img className={styles.avatar} src={robot_avatar} alt="" />
      <div>
        <div className={styles.bubble}>
          <div>{content || '啊哦，查询失败！请重新选择。'}</div>
          {list?.map((item) => (
            <div
              key={item.preferredId}
              className={styles['list-item']}
              onClick={() => {
                if (onSelect) onSelect(item);
              }}
            >
              <span />
              {item.name}
            </div>
          ))}
        </div>
        {chooseGroup ? (
          <div className={styles['group-row']}>
            {consultGroup.map((item) => (
              <Button
                key={item.key}
                className={styles['group-item']}
                onClick={() => {
                  if (onQuery) onQuery(item);
                }}
              >
                {item.label}
              </Button>
            ))}
          </div>
        ) : null}
        {experts?.map((item) => (
          <div className={styles['personal-card']}>
            <img
              src={`http://gesimg.sstir.cn/expert/logo/${item.logo}`}
              alt=""
            />
            <div className={styles.info}>
              <div>{item.nameCh || item.nameEn}</div>
              <div>{item.orgnNameCh || item.orgnNameEn}</div>
              <div>学科领域：{[item.asjc1stCh, item.asjc2ndCh].join('、')}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { RobotCard, UserCard };
