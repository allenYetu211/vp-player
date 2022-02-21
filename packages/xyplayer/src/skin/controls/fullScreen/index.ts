/*
 * @Author: Allen OYang
 * @Date: 2021-07-21 18:43:16
 * @Descripttion: 
 * @LastEditTime: 2022-02-21 11:25:10
 * @FilePath: /plugin-core/packages/xyplayer/src/skin/controls/fullScreen/index.ts
 */



import Player from '@/core';
import { createDOM, findDom } from '@/util';

// import requestFull from '@/skin/assets/requestFull.svg';
// import exitFullIcon from '@/skin/assets/exitFull.svg';

import requestFull from '@/skin/assets/iconrequestFull.svg';
import exitFullIcon from '@/skin/assets/iconexitFull.svg';

import publicStyle from '@/skin/styles/index.scss';
import cn from 'classname';

const skin_fullScreen = function () {

  const btnEl: Element = createDOM({
    el: 'vp-fullScreen',
    tpl: `
    <div class="${cn( publicStyle.iconFullscreen,  publicStyle.iconSwitch1)}">${requestFull}</div>
    <div class="${cn( publicStyle.iconExitFullscreen,  publicStyle.iconSwitch2)}">${exitFullIcon}</div>
   `,
    cname:  cn(publicStyle.operate,  publicStyle.controlsItemContent)
  })


  let tipsText: { [test: string]: string } = {}
  tipsText.fullscreen = '全屏'
  tipsText.exitfullscreen = '退出全屏'

  const tips = createDOM({
    el: 'vp-tip',
    tpl: `<span class="${cn( publicStyle.tipFullscreen,  publicStyle.tipSwitch1)}">${tipsText.fullscreen}</span>
    <span class="${cn( publicStyle.tipExitFullscreen,  publicStyle.tipSwitch2)}">${tipsText.exitfullscreen}</span>`,
    cname:  publicStyle.tips,
  })

  btnEl.appendChild(tips);

  this.once('ready', () => {
    const controlsRight = findDom(this.controls, 'vp-controls-right');
    controlsRight.appendChild(btnEl);
  });

  ['click', 'touchend'].forEach(item => {
    btnEl.addEventListener(item, (e) => {
      e.preventDefault()
      e.stopPropagation()
      this.emit('fullScreenBtnClick')
    })
  })
}

Player.install('skin_fullScreen', skin_fullScreen)