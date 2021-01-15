import React from 'react';
import styles from './index.less';

type OrgnItemProps = {
  org_name: string;
  persentor: string;
  org_type: string;
  industry: string;
  phone: string;
  org_address: string;
};

const OrgnItem: React.FC<OrgnItemProps> = (props) => {
  const { org_name, persentor, org_type, industry, phone, org_address } = props;
  const subItems = [
    {
      label: '法定代表人',
      value: persentor,
    },
    {
      label: '企业类型',
      value: org_type,
    },
    {
      label: '所属行业',
      value: industry,
    },
    {
      label: '联系电话',
      value: phone,
    },
    {
      label: '详细地址',
      value: org_address,
    },
  ];
  return (
    <div className={styles.item}>
      <div
        className={styles.title}
        dangerouslySetInnerHTML={{ __html: org_name }}
      />
      {subItems.map((item, i) => (
        <div
          key={i}
          dangerouslySetInnerHTML={{ __html: `${item.label}：${item.value}` }}
        />
      ))}
    </div>
  );
};

export default OrgnItem;
