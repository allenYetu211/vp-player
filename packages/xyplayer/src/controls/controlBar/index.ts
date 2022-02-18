/*
 * @Author: Allen OYang
 * @Date: 2022-02-18 11:56:08
 * @LastEditTime: 2022-02-18 14:16:04
 */


import Player from '@/core';
import throttle from 'lodash.throttle';
import { addClass, removeClass } from '@/util';
import style from '@/skin/styles/index.scss';


const controlBar = function (this: Player) {
  let mouseTimer;
  this.root.addEventListener('mousemove',
    throttle(() => {
      clearTimeout(mouseTimer);
      addClass(this.root, style.showControlBar)
      mouseTimer = setTimeout(() => {
        removeClass(this.root, style.showControlBar)
      }, 5000)
    }, 1000));
}

Player.install('controlBar', controlBar);
