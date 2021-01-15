import React from 'react';
import styles from './index.less';

type PaperItemProps = {
  TI: string;
  author: {
    'Full Author Name': string;
  }[];
  'Publication Date': string;
  Journal: string;
  Abstract: string;
};

const PaperItem: React.FC<PaperItemProps> = (props) => {
  const { TI, author, Journal, Abstract } = props;
  const subItems = [
    {
      label: '作者',
      value: author && author[0] ? author[0]['Full Author Name'] : '',
    },
    {
      label: '发表日期',
      value: props['Publication Date'],
    },
    {
      label: '期刊',
      value: Journal,
    },
  ];
  return (
    <div className={styles.item}>
      <div className={styles.title} dangerouslySetInnerHTML={{ __html: TI }} />
      {subItems.map((item, i) => (
        <div
          key={i}
          className={styles.tips}
          dangerouslySetInnerHTML={{ __html: `${item.label}：${item.value}` }}
        />
      ))}
      <div
        className={styles.desc}
        dangerouslySetInnerHTML={{ __html: Abstract }}
      />
    </div>
  );
};

export default PaperItem;
