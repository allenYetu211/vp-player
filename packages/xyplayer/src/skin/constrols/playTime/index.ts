/*
 * @Author: Allen OYang
 * @Date: 2021-07-31 15:41:01
 * @Descripttion:
 * @LastEditTime: 2022-02-16 20:00:41
 * @FilePath: /plugin-core/packages/xyplayer/src/skin/constrols/playTime/index.ts
 */

import Player from '@/core';
import { createDOM, findDom, format } from '@/util';


let updateState = true;

const skin_playTime = function (this: Player) {
  const playTimeEl = createDOM({
    el: 'vp-play-time',
    tpl: `00:00`
  });

  this.on('ready', () => {
    const controlsLeft = findDom(this.controls, 'vp-controls-left');
    controlsLeft.appendChild(playTimeEl);
  });


  // TODO
  const onTimeupdate = (moveTime?: string) => {
    playTimeEl.textContent = this.config.isLive ?
      `${format(this.video.currentTime)}` :
      `${moveTime ? moveTime : format(this.video.currentTime)} / ${format(this.duration)}`;
  }

  this.on('timeupdate', () => {
    if (updateState) {
      onTimeupdate();
    }
  });


  this.on('progressMove', (parma) => {
    const { updateState: state, moveTime } = parma[0];
    console.log('state', state);
    updateState = state;
    moveTime && onTimeupdate(moveTime)
  })

  this.on('reSetStyle', () => {
    playTimeEl.textContent = `00 : 00`;
  });
}


Player.install('skin_playTime', skin_playTime);