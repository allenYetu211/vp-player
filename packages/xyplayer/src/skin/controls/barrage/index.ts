// 弹幕
/*
 * @Author: Allen OYang
 * @Date: 2021-07-22 09:07:56
 * @Descripttion: 
 * @LastEditTime: 2022-02-21 19:12:08
 * @FilePath: /plugin-core/packages/xyplayer/src/skin/constrols/barrage/index.ts
 */


import Player from '@/core';
import BarrageCanvas from './core';
import { addClass, createDOM, findDom } from '@/util';
import debounce from 'lodash.debounce';

import barrageOpen from '@/skin/assets/barrageOpen.svg';
import barrageClean from '@/skin/assets/barrageClean.svg';

import cn from 'classname';

import style from './index.scss';
import publicStyle from '@/skin/styles/index.scss';

const plugin_barrageCanvas = function (this: Player) {

  let barrageClass: BarrageCanvas;

  if (!this.config.barrage) {
    return
  }

  const {
    defaultBarrageState,
    autoEmpty = true
  } = this.config.barrage;


  const canvasEL: any = createDOM({
    el: 'canvas',
    cname: style.barrageCanvas
  });

  const barrageEL: Element = createDOM({
    el: 'vp-barrage',
    tpl: `
      <div class="${cn(style.barrageStateOpen)}">${barrageOpen}</div>
      <div class="${cn(style.barrageStateOff)}">${barrageClean}</div>`,
    cname: `${publicStyle.operate, publicStyle.controlsItemContent}`
  });

  this.on('ready', () => {
    const controlsRight = findDom(this.controls, 'vp-controls-right');
    controlsRight.appendChild(barrageEL);
    this.root.appendChild(canvasEL);
    addClass(this.root, defaultBarrageState ? style.containerBarrageOpen : style.containerBarrageOff);
    barrageClass =  new BarrageCanvas({ element: canvasEL, ...this.config.barrage });

    if (autoEmpty) {
      //  监听窗口大小变化
      window!.addEventListener('resize', debounce(() => {
        console.log('窗口发生改变')
        resetView();
      }, 300))
    }

   
  })

  // 重置窗口
  const resetView = () => {
    const { offsetWidth: contentWidth } = this.root;

    canvasEL.style.width = `${contentWidth}px`;
    canvasEL.setAttribute('width', `${contentWidth}`);
    barrageClass.resetCanvas();
    barrageClass.restart();
  }

  // 开始弹幕
  this.on('barrage_start', () => {
    barrageClass.start();
  })

  // 添加弹幕信息
  this.on('barrage_push', (value) => {
    barrageClass.pushBarrage(value[0]);
  })

  // 清除弹幕
  this.on('barrage_clean', () => {
    barrageClass.clean();
  })

  // 开始弹幕
  this.on('barrage_open', () => {
    barrageClass.open();
  });

  // 重置窗口
  this.on('barrage_reset_view', () => {
    resetView();
  });



  ['click', 'touchend'].forEach((item) => {
    barrageEL.addEventListener(item, () => {
      console.log('barrageEL, item', item);
      this.emit('barrageBtnClick')
    })
  })

}

Player.install('plugin_barrageCanvas', plugin_barrageCanvas);