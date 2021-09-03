/*
 * @Author: Allen OYang
 * @Date: 2021-08-23 15:53:31
 * @Descripttion:
 * @LastEditTime: 2021-08-30 16:30:20
 * @FilePath: /plugin-core/packages/vpplayer/src/skin/controls/multiResolution/index.ts
 */


import Player from '@/core';
import { createDOM, findDom } from '@/util';
import style from '@/skin/styles/index.scss';
import currentStyle from './index.scss';
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
    tpl: `<div class="${currentStyle.multiResolutionContainer}">
            <div class="${cn(currentStyle.multiResolution)}">${list[defaultInit].text}</div>
         </div>`,
    cname: style.operate
  })

  const switchList = (() => {
    let liEl = ``;
    list.forEach((item, index) => {
      liEl += `<li data-src=${item.src} data-text=${item.text} data-index=${index}>${item.text}</li>`;
    });
    return createDOM({
      el: 'ul',
      cname: `${currentStyle.switchUl}`,
      tpl: liEl
    })
  })();


  const multiResolutionContainer = btnEl.querySelector(`.${currentStyle.multiResolutionContainer}`);
  const multiResolutionText = btnEl.querySelector(`.${currentStyle.multiResolution}`);
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