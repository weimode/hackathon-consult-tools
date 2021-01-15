import React, { useEffect } from 'react';
import F2 from '@antv/f2';
import styles from './index.less';

type LineChartProps = {
  id: string;
  dataSource?: {
    title: string;
    count: string;
  }[];
};

const LineChart: React.FC<LineChartProps> = (props) => {
  const { id, dataSource = [] } = props;
  const data = dataSource
    .map((item) => ({ ...item, count: Number(item.count) }))
    .slice(0, 5);
  useEffect(() => {
    const chart = new F2.Chart({
      id: `chart-container-${id}`,
      pixelRatio: window.devicePixelRatio,
      // padding: [0, 'auto', 'auto', 'auto']
    });
    chart.source(data, {
      count: {
        // tickCount: 5,
        min: 0,
      },
      title: {
        // type: 'timeCat',
        range: [0, 1],
        // tickCount: 3
      },
    });
    chart.axis('title', {
      label: function label(text, index, total) {
        const textCfg = {} as { textAlign: 'left' | 'right' };
        if (index === 0) {
          textCfg.textAlign = 'left';
        } else if (index === total - 1) {
          textCfg.textAlign = 'right';
        }
        return textCfg;
      },
    });
    chart.line().position('title*count');

    chart.render();

    return () => {
      chart.clear();
      // chart.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSource]);
  return <canvas id={`chart-container-${id}`} className={styles.line} />;
};

export default LineChart;
