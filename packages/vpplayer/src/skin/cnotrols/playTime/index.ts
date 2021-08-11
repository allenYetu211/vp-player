/*
 * @Author: Allen OYang
 * @Date: 2021-07-31 15:41:01
 * @Descripttion:
 * @LastEditTime: 2021-08-02 10:22:49
 * @FilePath: /plugin-core/packages/vpplayer/src/skin/cnotrols/playTime/index.ts
 */

import Player from '@/core';
import { createDOM, findDom, format } from '@/util';

const skin_playTime = function () {
  const playTimeEl = createDOM({
    el: 'vp-play-time',
    tpl: `00:00 / 00:00`
  });

  this.on('ready', () => {
    const controlsLeft = findDom(this.controls, 'vp-controls-left');
    controlsLeft.appendChild(playTimeEl);
  });

  const onTimeupdate = () => {
    playTimeEl.textContent = `${format(this.video.currentTime)} / ${format(this.duration)}`
  }
  this.on('timeupdate', onTimeupdate);
}


Player.install('skin_playTime', skin_playTime);