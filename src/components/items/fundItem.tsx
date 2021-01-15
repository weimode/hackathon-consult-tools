import React from 'react';
import styles from './index.less';

type FundItemProps = {
  title: string;
  appro_year: string;
  exec_date: {
    start: string;
    end: string;
  };
  pid: string;
  project_money: string;
  leader: string;
  unit: string;
  subj_code: string;
  subj_dept: string;
  subj_desc: string;
};

const FundItem: React.FC<FundItemProps> = (props) => {
  const {
    title,
    exec_date,
    pid,
    project_money,
    leader,
    unit,
    subj_code,
    subj_dept,
    subj_desc,
  } = props;
  const subItems = [
    {
      label: '项目批准号',
      value: pid,
    },
    {
      label: '批准金额',
      value: project_money,
    },
    {
      label: '负责人',
      value: leader,
    },
    {
      label: '依托单位',
      value: unit,
    },
    {
      label: '学科分类',
      value: [subj_code, subj_dept, subj_desc].join(' '),
    },
  ];
  return (
    <div className={styles.item}>
      <div
        className={styles.title}
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div className={styles.tips}>
        {[exec_date?.start, exec_date?.end].join(' ~ ')}
      </div>
      {subItems.map((item, i) => (
        <div
          key={i}
          dangerouslySetInnerHTML={{ __html: `${item.label}：${item.value}` }}
        />
      ))}
    </div>
  );
};

export default FundItem;
