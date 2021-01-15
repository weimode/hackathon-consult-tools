import React from 'react';
// import { Button } from 'antd-mobile';
import BarChart from '@/components/chart/barChart';
import PieChart from '@/components/chart/pieChart';
import LineChart from '@/components/chart/lineChart';
import styles from './index.less';

const report = require('@/assets/report.json');

const Report = () => {
  const reportObj = report;
  const allTitle = Object.keys(reportObj);
  return (
    <div className={styles.report}>
      {allTitle.map((item, i) => (
        <div key={item} className={styles['single-part']}>
          <div className={styles['chart-title']}>{item}</div>
          <div className={styles.split} />
          {
            // eslint-disable-next-line no-nested-ternary
            i === 0 ? (
              <LineChart id={item} dataSource={reportObj[item]} />
            ) : i === allTitle.length - 1 ? (
              <BarChart id={item} dataSource={reportObj[item]} />
            ) : (
              <PieChart id={item} dataSource={reportObj[item]} />
            )
          }
        </div>
      ))}
    </div>
  );
};

export default Report;
