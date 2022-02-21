/*
 * @Author: Allen OYang
 * @Date: 2021-08-02 10:25:22
 * @Descripttion:
 * @LastEditTime: 2022-02-21 11:24:45
 * @FilePath: /plugin-core/packages/xyplayer/src/skin/constrols/volume/index.ts
 */

import Player from '@/core';
import { createDOM, findDom } from '@/util';
import cn from 'classname';
import volumeLarge from '@/skin/assets/iconvolumeLarge.svg';
import volumeMuted from '@/skin/assets/iconvolumeMuted.svg';
import style from './index.scss';
import publicStyle from '@/skin/styles/index.scss';
import deviceInfo from '@/util/deviceInfo';

const isPC = deviceInfo.pc;

// <div class="${cn(publicStyle.iconPlay, publicStyle.iconSwitch1)}">${VolumeSmall}</div>

const skip_volume = function (this: Player) {

  /**
   * UI 部分
   */
  const btnContainerEL: Element = createDOM({
    el: 'vp-volume',
    cname: cn(style.volume, publicStyle.controlsItemContent),
    tpl: `
        <div class="vp_volumeLarge ${cn(publicStyle.iconSwitch1)}">${volumeLarge}</div>
        <div class="vp_volumeMuted ${cn(publicStyle.iconSwitch2)}">${volumeMuted}</div>
    `,
  });
  const volumeEL = createDOM({
    el: 'vp-volume-content',
    cname: style.volumeContent,
    tpl: `
        <vp-volume-text>${(this.volume * 100)}%</vp-volume-text>
        <vp-volume-bar class="${style.volumeBar}">
          <vp-volume-drag  class="${style.volumeDrag}"></vp-volume-drag>
        </vp-volume-bar>
    `
  });

  if (isPC) {
    btnContainerEL.appendChild(volumeEL);
  }

  this.once('ready', () => {
    const vpFullscreenEL = findDom(this.controls, 'vp-fullscreen');
    vpFullscreenEL.parentNode.insertBefore(btnContainerEL, vpFullscreenEL);
  });

  /**
   * 功能操作部分
   */

  const volumeLargeEL: HTMLDivElement = btnContainerEL.querySelector(`.vp_volumeLarge`);
  const volumeMutedEL: HTMLDivElement = btnContainerEL.querySelector(`.vp_volumeMuted`);
  const vpVolumeTextEL: HTMLDivElement = volumeEL.querySelector(`vp-volume-text`);
  const vpVolumeBarEL: HTMLDivElement = volumeEL.querySelector(`vp-volume-bar`);
  const vpVolumeDragEL: HTMLDivElement = volumeEL.querySelector(`vp-volume-drag`);

  /**
   * 处理声音能量条状态
   * @param value 
   */
  const handleDragUI = (value: string) => {
    vpVolumeDragEL.style.height = value;
  }

  // 初始高度
  handleDragUI(`${this.volume * 100}%`);

  volumeLargeEL.addEventListener('click', () => {
    this.volume = 0;
  }, false);

  volumeMutedEL.addEventListener('click', () => {
    this.volume = 0.6;
  }, false);

  // if (deviceInfo.pc) {
  //   return 
  // }



  /**
   * 音量点击事件绑定
   */
  ['click', 'touch'].forEach((item) => {
    vpVolumeBarEL.addEventListener(item, (e: MouseEvent) => {
      const { height } = vpVolumeBarEL.getBoundingClientRect();
      const volumeEnergy = (height - e.offsetY) / height;
      this.volume = volumeEnergy;
      handleDragUI(`${volumeEnergy * 100}%`);
    }, false);
  })

  /**
   * 绑定拖拽时间
   */
  vpVolumeBarEL.addEventListener('mousedown', (e: MouseEvent) => {
    handleVolumeBarMousedown(e)
  }, false)

  /**
   * 处理函数内容
   * @param e MouseEvent
   */
  const handleVolumeBarMousedown = (e: MouseEvent) => {
    let barRect = vpVolumeBarEL.getBoundingClientRect();
    let pos = { x: e.clientX, y: e.clientY }
    let height = vpVolumeDragEL.getBoundingClientRect().height;
    const onMove = (event) => {
      event.preventDefault();
      event.stopPropagation();
      let w = height - event.clientY + pos.y;
      let now = w / barRect.height;
      if (w >= 0 && w <= 100) {
        handleDragUI(`${w}px`);
        this.volume = Math.max(Math.min(now, 1), 0);
      }
    };

    const onUp = (event) => {
      event.preventDefault();
      event.stopPropagation();
      window.removeEventListener('mousemove', onMove, false);
      window.removeEventListener('mouseup', onUp, false);
    }
    window.addEventListener('mousemove', onMove, false);
    window.addEventListener('mouseup', onUp, false);
  }

  /**
   * 监听音量变化
   */
  this.video.addEventListener('volumechange', () => {
    const videoVolume = Number(this.volume.toFixed(1));
    vpVolumeTextEL.textContent = `${videoVolume * 100}%`;
    handleDragUI(`${this.volume * 100}%`);

    if (videoVolume <= 0) {
      handleVolumeUIstyle('none', 'flex');
      return
    }
    handleVolumeUIstyle('flex', 'none');
  })


  /**
   * 修改样式
   * @param largeStyle string
   * @param mutedStyle string
   */
  const handleVolumeUIstyle = (largeStyle: string, mutedStyle: string) => {
    volumeLargeEL.style.display = largeStyle;
    volumeMutedEL.style.display = mutedStyle;
  }
}

Player.install('skip_volume', skip_volume);