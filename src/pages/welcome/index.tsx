import React from 'react';
import { Icon, Button } from 'antd-mobile';
import { history } from 'umi';
import styles from './index.less';
import robot_icon from '@/assets/image/robot.png';
import body_left from '@/assets/image/body-left.png';
import body_active from '@/assets/image/body.gif';
import body_right from '@/assets/image/body-right.png';
import body_bottom from '@/assets/image/body-bottom.png';

const Welcome = () => {
  return (
    <div className={styles.welcome}>
      <div className={styles.header}>
        <img
          className={styles.robot}
          src={robot_icon}
          alt=""
          onClick={() => {
            history.push('/consult');
          }}
        />
        <div
          className={styles.search}
          onClick={() => {
            history.push('/query');
          }}
        >
          <Icon className={styles['search-icon']} type="search" size="sm" />
        </div>
      </div>
      <div
        className={styles['active-images']}
        onClick={() => {
          history.push('/category');
        }}
      >
        <div>
          <img src={body_left} alt="" />
        </div>
        <div>
          <img src={body_active} alt="" />
        </div>
        <div>
          <img src={body_right} alt="" />
        </div>
      </div>
      <img className={styles['bottom-img']} src={body_bottom} alt="" />
      <div className={styles['entry-row']}>
        <Button
          activeStyle={false}
          className={styles['entry-btn']}
          onClick={() => {
            history.push('/report');
          }}
        >
          统计报告
        </Button>
        <Button
          activeStyle={false}
          className={styles['entry-btn']}
          onClick={() => {
            history.push('/experts');
          }}
        >
          专家推荐
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
