/*
 * @Author: Allen OYang
 * @Date: 2021-07-22 09:07:56
 * @Descripttion: 
 * @LastEditTime: 2021-09-13 16:03:22
 * @FilePath: /plugin-core/packages/vpplayer_antiscreenrecording/src/index.ts
 */


import Player from 'vpplayer';
import style from './index.scss';

import AntiScreenRecording from './core';

export interface Type {
  text: string;
  color: string;
  duration: number;
  interval: number;
  fontSize?: number;
  locationX?: string | number;
  locationY?: string | number;
}

const plugin_antiScreenRecording = function (this: Player) {
  const canvasEL = Player.util.createDOM({
    el: 'canvas',
    cname: style.antiScreenRecording
  });

  this.on('ready', () => {
    console.log('plugin_antiScreenRecording , ready', canvasEL);
    this.root.appendChild(canvasEL);
  })

  this.on('antiScreenRecording_start', (config: Type[]) => {
    const asClass = new AntiScreenRecording(canvasEL, config[0]);
    asClass.start();
  });
}

Player.install('plugin_antiScreenRecording', plugin_antiScreenRecording);