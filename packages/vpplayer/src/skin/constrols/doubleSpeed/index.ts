/*
 * @Author: Allen OYang
 * @Date: 2021-09-08 09:26:17
 * @Descripttion:
 * @LastEditTime: 2021-09-09 18:57:57
 * @FilePath: /plugin-core/packages/vpplayer/src/skin/constrols/doubleSpeed/index.ts
 */
/**
 * 倍速
 * @param this Player
 */
import Player from '@/core';
import { createDOM, findDom, removeClass, addClass } from '@/util';
import cn from 'classname';
import style from './style.scss';
import globalStyle from '@/skin/styles/global.scss';


const skin_doubleSpeed = function (this: Player) {
  const { playbackRate } = this.config;

  if (!playbackRate) { return };

  const rateConfig = {
    defaultPlaybackRate: playbackRate.defaultPlaybackRate || 1,
    placeholder: playbackRate.placeholder || 'x',
  }

  const list = playbackRate.rate.map((item: number) => {
    return { rate: `${item}`, name: `${item}${rateConfig.placeholder}`, selected: false }
  })


  const temp = [`<ul class="${cn(style.ulContainer, globalStyle.floatLayerTipUiContainer)}">`];
  let currentPitchOn = '';
  list.forEach((item: { name: string, rate: string, selected: boolean }) => {
    if (rateConfig.defaultPlaybackRate.toString() === item.rate) {
      item.selected = true;
      currentPitchOn = item.name;
    }

    temp.push(`<li 
    data-name="${item.name}"
    data-rate="${item.rate}"
    class=${cn({
      [style.selected]: item.selected,
    })}>${item.name}</li>`)
  });
  temp.push(`</ul><div class="${cn(style.currentPitchOn)}">${currentPitchOn}</div>`);

  const container = createDOM({
    el: 'v-playback',
    cname: cn(style.container, globalStyle.floatLayerTipUiTrigger)
  })

  container.innerHTML = temp.join('');

  /**
   * 绑定点击速率切换事件
   */
  const ulEl = container.querySelector(`.${style.ulContainer}`);
  ['touch', 'click'].forEach((item: string) => {
    ulEl.addEventListener(item, (event: PointerEvent) => {
      const li = (<HTMLLIElement>event.target)
      if (li && li.nodeName === 'LI') {
        const oliEL = findDom(this.controls, `.${style.selected}`);
        const currentPitchOn = findDom(this.controls, `.${style.currentPitchOn}`);
        removeClass(oliEL, style.selected);
        addClass(li, style.selected);
        /**
         * 修改倍速
         */
        const { rate, name } = li.dataset;
        this.video.playbackRate = rate;
        currentPitchOn.textContent = name;
      }
    }, false);
  })




  this.on('ready', () => {
    const controlsRight = findDom(this.controls, 'vp-controls-right');
    const volumeEl = findDom(this.controls, 'vp-volume');
    controlsRight.insertBefore(container, volumeEl);
  })



}

Player.install('skin_doubleSpeed', skin_doubleSpeed);