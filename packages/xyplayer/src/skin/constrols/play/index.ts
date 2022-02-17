/*
 * @Author: Allen OYang
 * @Date: 2021-07-08 17:16:07
 * @Descripttion: 
 * @LastEditTime: 2022-02-17 15:00:19
 * @FilePath: /plugin-core/packages/xyplayer/src/skin/constrols/play/index.ts
 */

import Player from '@/core';
import { createDOM, findDom } from '@/util';
import PlayIcon from '@/skin/assets/iconplay.svg';
import PauseIcon from '@/skin/assets/iconpause.svg';
import style from '@/skin/styles/index.scss';
import cn from 'classname';


const skin_play = function () {

  // let playBtn = this.config.playBtn ? this.config.playBtn : {}
  const btn: Element = createDOM({
    el: 'vp-play',
    tpl: `
      <div class="${cn(style.iconPlay, style.iconSwitch1)}">${PlayIcon}</div>
      <div class="${cn(style.iconPause, style.iconSwitch2)}">${PauseIcon}</div>`,
    cname: `${style.operate}`
  });


  const btnCenterEL: Element = createDOM({
    el: 'vp-play-center',
    tpl: `
      <div class="${cn(style.iconPlay, style.iconSwitch1)}">${PlayIcon}</div>`,
    cname: `${cn(style.operate, style.playCenter)}`
  });

  const tipsText: { [test: string]: string } = {}
  tipsText.play = '播放';
  tipsText.pause = '暂停';

  const tips = createDOM({
    el: 'vp-tip',
    tpl: `<span class="${cn(style.tipPlay, style.tipSwitch1)}">${tipsText.play}</span>
    <span class="${cn(style.tipPause, style.tipSwitch2)}">${tipsText.pause}</span>`,
    cname: `${style.tips}`,
  })

  btn.appendChild(tips);

  this.once('ready', () => {
    const controlsLeft = findDom(this.controls, 'vp-controls-left');
    controlsLeft.appendChild(btn);

    this.root.appendChild(btnCenterEL)
  });

  ['click', 'touchend'].forEach(item => {
    btn.addEventListener(item, (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.emit('playBtnClick');
    })

    btnCenterEL.addEventListener(item, (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.emit('playBtnClick');
    })
    
  })
}

Player.install('skin_play', skin_play)