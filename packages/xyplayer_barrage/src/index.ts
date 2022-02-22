// 弹幕
/*
 * @Author: Allen OYang
 * @Date: 2021-07-22 09:07:56
 * @Descripttion: 
 * @LastEditTime: 2022-01-04 19:04:24
 * @FilePath: /plugin-core/packages/xyplayer_barrage/src/index.ts
 */


import Player from '@xylink/xyplayer';
import style from './index.scss';
import BarrageCanvas from './core';

const plugin_barrageCanvas = function (this: Player) {

  const canvasEL = Player.util.createDOM({
    el: 'canvas',
    cname: style.barrageCanvas
  });
  // 初始弹幕
  let barrage: BarrageCanvas = new BarrageCanvas(canvasEL);

  this.on('ready', () => {
    this.root.appendChild(canvasEL);
    barrage = new BarrageCanvas(canvasEL);
  })

  // 开始弹幕
  this.on('barrage_start', () => {
    barrage.start();
  })

  // 添加弹幕信息
  this.on('barrage_push', (value) => {
    barrage.pushBarrage(value);
  })

  // 清除弹幕
  this.on('barrage_clean', () => {
    barrage.clean();
  })

  // 开始弹幕
  this.on('barrage_open', () => {
    barrage.open();
  })

}

Player.install('plugin_barrageCanvas', plugin_barrageCanvas);