// 弹幕
/*
 * @Author: Allen OYang
 * @Date: 2021-07-22 09:07:56
 * @Descripttion: 
 * @LastEditTime: 2022-02-18 16:31:30
 * @FilePath: /plugin-core/packages/xyplayer/src/skin/constrols/barrage/index.ts
 */


import Player from '@/core';
import BarrageCanvas from './core';
import { addClass, createDOM, findDom } from '@/util';

import barrageOpen from '@/skin/assets/barrageOpen.svg';
import barrageClean from '@/skin/assets/barrageClean.svg';

import cn from 'classname';

import style from './index.scss';
import publicStyle from '@/skin/styles/index.scss';

const plugin_barrageCanvas = function (this: Player) {

  if (!this.config.barrage) {
    return
  }

  const {
    defaultBarrageState,
  } = this.config.barrage;


  const canvasEL: any = createDOM({
    el: 'canvas',
    cname: style.barrageCanvas,
    attrs: {
      height: '100%',
      width: '100%',
    }
  });

  const barrageEL: Element = createDOM({
    el: 'vp-barrage',
    tpl: `
      <div class="${cn(style.barrageStateOpen)}">${barrageOpen}</div>
      <div class="${cn(style.barrageStateOff)}">${barrageClean}</div>`,
    cname: `${publicStyle.operate}`
  });

  // 初始弹幕
  let barrage: BarrageCanvas;

  this.on('ready', () => {
    const controlsRight = findDom(this.controls, 'vp-controls-right');
    controlsRight.appendChild(barrageEL);
    this.root.appendChild(canvasEL);
    addClass(this.root, defaultBarrageState ? style.containerBarrageOpen : style.containerBarrageClean);
  })

  // 开始弹幕
  this.on('barrage_start', (barrageConfig: any) => {
    barrage = new BarrageCanvas({ element: canvasEL, ...barrageConfig });
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
  });


  ['click', 'touchend'].forEach((item) => {
    barrageEL.addEventListener(item, () => {
      console.log('barrageEL, item', item);
      this.emit('barrageBtnClick')
    })
  })

}

Player.install('plugin_barrageCanvas', plugin_barrageCanvas);