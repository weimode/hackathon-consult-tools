import React, { useEffect } from 'react';
import F2 from '@antv/f2';
import styles from './index.less';

type PieChartProps = {
  id: string;
  dataSource?: {
    title: string;
    count: string;
  }[];
};

const PieChart: React.FC<PieChartProps> = (props) => {
  const { id, dataSource = [] } = props;
  useEffect(() => {
    // const total = dataSource.reduce(
    //   (acc: number, cur: { count: string }) => acc + (Number(cur.count) || 0),
    //   0,
    // )
    const data = dataSource.map((item) => ({
      ...item,
      count: Number(item.count),
      a: '1',
    }));
    console.log(data);
    const chart = new F2.Chart({
      id: `chart-container-${id}`,
      pixelRatio: window.devicePixelRatio,
    });
    chart.source(data);
    chart.legend({
      position: 'bottom',
      itemWidth: 375,
      // itemFormatter: function itemFormatter(val) {
      //   return <div>{val}</div>;
      // }
    });
    // chart.legend(false);
    chart.tooltip(false);
    chart.coord('polar', {
      transposed: true,
      radius: 0.85,
    });
    chart.axis(false);
    chart.interval().position('a*count').color('title').adjust('stack');

    chart.render();

    return () => {
      chart.clear();
      // chart.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource]);
  return <canvas id={`chart-container-${id}`} className={styles.pie} />;
};

export default PieChart;
