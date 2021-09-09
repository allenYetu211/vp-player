/**
 * 清晰度
 */

/*
 * @Author: Allen OYang
 * @Date: 2021-08-23 15:53:31
 * @Descripttion: 
 * @LastEditTime: 2021-09-09 19:06:26
 * @FilePath: /plugin-core/packages/vpplayer/src/skin/constrols/multiResolution/index.ts
 */



import Player from '@/core';
import { createDOM, findDom } from '@/util';
import basisStyle from '@/skin/styles/index.scss';
import globalStyle from '@/skin/styles/global.scss';
import style from './index.scss';
import cn from 'classname';

const multiResolutionConfig = [{
  text: '标清',
  src: 'http://1',
}, {
  text: '高清',
  src: 'http://2',
}, {
  text: '超高清',
  src: 'http://3',
}]

const multiResolutionIndex = 1;


const skin_multiResolution = function () {
  if (!this.config.multiResolution) {
    return
  }

  const { list, defaultInit } = this.config.multiResolution

  const btnEl: Element = createDOM({
    el: 'vp-multiResolution',
    tpl: `<div class="${cn(style.multiResolutionContainer, globalStyle.floatLayerTipUiTrigger)}">
            <div class="${cn(style.multiResolution)}">${list[defaultInit].text}</div>
         </div>`,
    cname: basisStyle.operate
  })

  const switchList = (() => {
    let liEl = ``;
    list.forEach((item, index) => {
      liEl += `<li data-src=${item.src} data-text=${item.text} data-index=${index}>${item.text}</li>`;
    });
    return createDOM({
      el: 'ul',
      cname: cn(style.ulContainer, globalStyle.floatLayerTipUiContainer),
      tpl: liEl
    })
  })();


  const multiResolutionContainer = btnEl.querySelector(`.${style.multiResolutionContainer}`);
  const multiResolutionText = btnEl.querySelector(`.${style.multiResolution}`);
  multiResolutionContainer.appendChild(switchList);

  this.once('ready', () => {
    const controlsRight = findDom(this.controls, 'vp-controls-right');
    const volumeEl = findDom(this.controls, 'vp-volume');
    controlsRight.insertBefore(btnEl, volumeEl);
  });


  ['click', 'touchend'].forEach(item => {
    switchList.addEventListener(item, (event) => {
      const target: EventTarget = event.target;

      if ((<HTMLLIElement>target).nodeName !== 'LI') {
        return
      }

      const { index, src, text } = (<HTMLLIElement>target).dataset;
      console.log(index, src, text);

      multiResolutionText.textContent = text;

      if (!src || src === '') {
        this.emit('urlNull')
      }

      /**
       * TODO: 切换视频过程，需要把进度条复原、时间戳复原
       */
      this.video.src = src;
      this.videoStateOrder.canPlayFunc();

      this.emit('reSetStyle');

      // this.emit('multiResolutionBtnClick', event);
    })
  });

}



Player.install('skin_multiResolution', skin_multiResolution)