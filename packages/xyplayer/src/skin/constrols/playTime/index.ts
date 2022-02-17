/*
 * @Author: Allen OYang
 * @Date: 2021-07-31 15:41:01
 * @Descripttion:
 * @LastEditTime: 2022-02-17 18:31:21
 * @FilePath: /plugin-core/packages/xyplayer/src/skin/constrols/playTime/index.ts
 */

import Player from '@/core';
import { createDOM, findDom, format } from '@/util';
import style from './index.scss';


let updateState = true;

const skin_playTime = function (this: Player) {
  const playTimeEl = createDOM({
    el: 'vp-play-time',
    cname: style.playTime,
    tpl: `
     ${this.config.isMobile ?  
      `<vp-current-time class=${style.currentTime}>00:00</vp-current-time>
       <vp-duration class=${style.duration}></vp-duration>`
      : ''}
    `
  });

  this.on('ready', () => {
    const controlsLeft = findDom(this.controls, 'vp-controls-left');
    controlsLeft.appendChild(playTimeEl);
    // 通知插入
    if (this.config.isMobile) {
      this.emit('mobileInsertReady')
    }
  });

  // const currentEl  = playTimeEl.querySelector(`.${style.currentTime}`);
  const currentEl  = playTimeEl.querySelector(`vp-current-time`);
  // const durationEl = playTimeEl.querySelector(`.${style.duration}`);
  const durationEl = playTimeEl.querySelector(`vp-duration`);

  
  const onTimeupdate = (moveTime?: string) => {
    if (this.config.isLive) {
      playTimeEl.textContent  =  `${format(this.video.currentTime)}`
    }  else {
      if (this.config.isMobile) {
        currentEl.textContent = moveTime ? moveTime : format(this.video.currentTime);
        durationEl.textContent = moveTime ? moveTime : format(this.duration);
      } else {
        playTimeEl.textContent  = `${moveTime ? moveTime : format(this.video.currentTime)} / ${format(this.duration)}`;
      }
    }
  }

  this.on('timeupdate', () => {
    if (updateState) {
      onTimeupdate();
    }
  });


  this.on('progressMove', (parma) => {
    const { updateState: state, moveTime } = parma[0];
    updateState = state;
    moveTime && onTimeupdate(moveTime)
  })

  this.on('reSetStyle', () => {
    playTimeEl.textContent = `00 : 00`;
  });
}


Player.install('skin_playTime', skin_playTime);