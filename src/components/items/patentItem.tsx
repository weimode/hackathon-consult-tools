import React from 'react';
import styles from './index.less';

type PatentItemProps = {
  title: {
    text_zh: string;
  };
  pubdate: string;
  appno: string;
  inventors: {
    name_zh: string;
  };
  applicants: {
    name_zh: string;
  };
  abstract: {
    text_zh: string;
  };
  ipcs: {
    mainclass: string[];
  };
};

const PatentItem: React.FC<PatentItemProps> = (props) => {
  const {
    title,
    abstract,
    pubdate,
    appno,
    inventors,
    applicants,
    ipcs,
  } = props;
  const subItems = [
    {
      label: '发布时间',
      value: pubdate,
    },
    {
      label: '专利号',
      value: appno,
    },
    {
      label: '发明人',
      value: inventors?.name_zh || '-',
    },
    {
      label: '申请人',
      value: applicants?.name_zh || '-',
    },
    {
      label: '分类号',
      value: ipcs?.mainclass[0] || '-',
    },
  ];
  return (
    <div className={styles.item}>
      <div
        className={styles.title}
        dangerouslySetInnerHTML={{ __html: title?.text_zh }}
      />
      {subItems.map((item, i) => (
        <div
          key={i}
          className={styles.tips}
          dangerouslySetInnerHTML={{ __html: `${item.label}：${item.value}` }}
        />
      ))}
      <div
        className={styles.desc}
        dangerouslySetInnerHTML={{ __html: abstract?.text_zh }}
      />
    </div>
  );
};

export default PatentItem;
