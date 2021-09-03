/*
 * @Author: Allen OYang
 * @Date: 2021-08-02 10:25:22
 * @Descripttion:
 * @LastEditTime: 2021-09-03 17:44:24
 * @FilePath: /plugin-core/packages/vpplayer/src/skin/constrols/volume/index.ts
 */

import Player from '@/core';
import { createDOM, findDom } from '@/util';


import cn from 'classname';

// import VolumeSmall from '@/skin/assets/VolumeSmall.svg';
// import volumeLarge from '@/skin/assets/volumeLarge.svg';
import volumeLarge from '@/skin/assets/iconvolumeLarge.svg';
import volumeMuted from '@/skin/assets/iconvolumeMuted.svg';

import selfStyle from '@/skin/controls/volume/index.scss';
import style from '@/skin/styles/index.scss';



// <div class="${cn(style.iconPlay, style.iconSwitch1)}">${VolumeSmall}</div>

const skip_volume = function (this: Player) {

  let btnEL: Element = createDOM({
    el: 'vp-volume',
    tpl: `
        <div class="${cn(style.iconSwitch1)}">${volumeLarge}</div>
        <div class="${cn(style.iconSwitch2)}">${volumeMuted}</div>
    `,
    cname: `${style.volume}`
  });

  const volumeEL = createDOM({
    el: 'vp-volume-content',
    tpl: `
      <vp-volume-container>
        <vp-volume-bar></vp-volume-bar>
        <vp-volume-btn></vp-volume-btn>
      </vp-volume-container>
    `
  });

  btnEL.appendChild(volumeEL);

  this.once('ready', () => {
    const vpFullscreenEL = findDom(this.controls, 'vp-fullscreen');
    vpFullscreenEL.parentNode.insertBefore(btnEL, vpFullscreenEL);
  });
}

Player.install('skip_volume', skip_volume);