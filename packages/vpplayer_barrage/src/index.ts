// 弹幕
/*
 * @Author: Allen OYang
 * @Date: 2021-07-22 09:07:56
 * @Descripttion: 
 * @LastEditTime: 2021-09-13 17:23:42
 * @FilePath: /plugin-core/packages/vpplayer_barrage/src/index.ts
 */


import Player from 'vpplayer';
import style from './index.scss';

import BarrageCanvas from './core';

export interface Type {
  text: string;
  color: string;
  duration: number;
  interval: number;
  fontSize?: number;
  locationX?: string | number;
  locationY?: string | number;
}

const plugin_barrageCanvas = function (this: Player) {

  const canvasEL = Player.util.createDOM({
    el: 'canvas',
    cname: style.barrageCanvas
  });
  // 初始弹幕
  let bcClass: BarrageCanvas;

  this.on('ready', () => {
    this.root.appendChild(canvasEL);
    bcClass = new BarrageCanvas(canvasEL);
  })

  // 开始弹幕
  this.on('barrageCanvas_start', () => {
    bcClass.start();
  });

  // 添加弹幕信息
  this.on('barrageCanvas_push', (value) => {
    bcClass.pushBarrage(value[0]);
  })

  // 清除弹幕
  this.on('barrageCanvas_clean', () => {
    bcClass.clean();
  })

  // 开始弹幕
  this.on('barrageCanvas_open', () => {
    bcClass.open();
  })

}

Player.install('plugin_barrageCanvas', plugin_barrageCanvas);