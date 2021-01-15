import React from 'react';
import type { ExpertInfoType } from '@/models/experts';
import styles from './index.less';

const ExpertItem: React.FC<ExpertInfoType> = (props) => {
  const {
    logo,
    nameCh,
    nameEn,
    orgnNameCh,
    orgnNameEn,
    asjc1stCh,
    asjc2ndCh,
    hindex,
  } = props;
  const subItems = [
    {
      label: '机构',
      value: orgnNameCh || orgnNameEn,
    },
    {
      label: '学科领域',
      value: [asjc1stCh, asjc2ndCh].join('、'),
    },
    {
      label: 'H指数',
      value: hindex,
    },
  ];
  return (
    <div className={styles['expert-item']}>
      <img src={`http://gesimg.sstir.cn/expert/logo/${logo}`} alt="" />
      <div className={styles['info-list']}>
        <div className={styles.title}>{nameCh || nameEn}</div>
        {subItems.map((item, i) => (
          <div key={i}>{`${item.label}：${item.value}`}</div>
        ))}
      </div>
    </div>
  );
};

export default ExpertItem;
