import React, { useEffect } from 'react';
import F2 from '@antv/f2';
import styles from './index.less';

type BarChartProps = {
  id: string;
  dataSource?: {
    title: string;
    count: string;
  }[];
};

const BarChart: React.FC<BarChartProps> = (props) => {
  const { id, dataSource = [] } = props;
  const data = dataSource.map((item) => ({
    ...item,
    count: Number(item.count),
  }));
  useEffect(() => {
    const chart = new F2.Chart({
      id: `chart-container-${id}`,
      pixelRatio: window.devicePixelRatio,
      padding: [0, 'auto', 'auto', 'auto'],
    });
    chart.source(data, {
      count: {
        nice: true,
      },
    });
    chart.legend(false);
    chart.coord({
      transposed: true,
    });
    // chart.tooltip({
    //   showItemMarker: false,
    //   onShow: function onShow(ev) {
    //     const {items} = ev;
    //     items[0].name = null;
    //     items[0].name = items[0].title;
    //     items[0].value = `¥ ${items[0].value}`;
    //   }
    // });
    chart.interval().position('title*count').color('title');

    chart.render();

    return () => {
      chart.clear();
      // chart.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource]);
  return <canvas id={`chart-container-${id}`} className={styles.bar} />;
};

export default BarChart;
