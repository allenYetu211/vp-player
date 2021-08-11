/*
 * @Author: Allen OYang
 * @Date: 2021-07-30 16:30:38
 * @Descripttion: 
 * @LastEditTime: 2021-07-31 16:09:53
 * @FilePath: /plugin-core/packages/vpplayer/src/skin/cnotrols/progress/index.ts
 */

import Player from '@/core';
import { createDOM } from '@/util';
import { format } from '@/util';
import style from './index.scss';
import globalStyle from '@/skin/styles/global.scss';
import cn from 'classname';



const skin_progress = function () {
  const containerEl = createDOM({
    el: 'vp-progress',
    cname: style.progress,
    tpl: `
            <vp-outer class="${style.progressOuter}">
              <vp-cache class="${style.progressCache}"></vp-cache>
              <vp-played class="${style.progressPlayed}"></vp-played>
              <vp-progress-btn class="${style.progressBtn}"></vp-progress-btn>
              <vp-point class="${cn(style.progressPoint)}">
                <div class="${cn(style.progressPointContent, globalStyle.tips)}"></div>
              </vp-point>
              <vp-thumbnail class="${cn(style.progressThumbnail, style.tips)}"></vp-thumbnail>
            </vp-outer>
          `
  });

  this.controls.appendChild(containerEl);

  const btn: HTMLDivElement = containerEl.querySelector(`.${style.progressBtn}`);
  // const outer: HTMLDivElement = containerEl.querySelector(`.${style.progressOuter}`);
  const cache: HTMLDivElement = containerEl.querySelector(`.${style.progressCache}`);
  const point: HTMLDivElement = containerEl.querySelector(`.${style.progressPoint}`);
  const pointContent: HTMLDivElement = containerEl.querySelector(`.${style.progressPointContent}`);
  const progressPlayed: HTMLDivElement = containerEl.querySelector(`.${style.progressPlayed}`);
  const thumbnail: HTMLDivElement = containerEl.querySelector(`.${style.progressThumbnail}`);
  /**
   * 监听播放进度
   */
  const onTimeupdate = () => {
    UIHandlerProgressAndBtn();
    UIHnadlerBuffer();
  }
  /**
   * 处理播放进度
   */
  const UIHandlerProgressAndBtn = () => {
    if (this.isProgressMoving) {
      return
    }
    progressPlayed.style.width = `${this.currentTime * 100 / this.duration}%`;
    btn.style.left = `${this.currentTime * 100 / this.duration}%`;
  };
  /**
   * 处理数据缓冲区UI
   */
  const UIHnadlerBuffer = () => {
    if (this.buffered && this.buffered.length > 0) {
      let end = this.buffered.end(this.buffered.length - 1)
      for (let i = 0, len = this.buffered.length; i < len; i++) {
        if (this.currentTime >= this.buffered.start(i) && this.currentTime <= this.buffered.end(i)) {
          end = this.buffered.end(i)
          for (let j = i + 1; j < this.buffered.length; j++) {
            if (this.buffered.start(j) - this.buffered.end(j - 1) >= 2) {
              end = this.buffered.end(j - 1)
              break
            }
          }
          break
        }
      }
      cache.style.width = `${end / this.duration * 100}%`
    }
  };

  this.on('timeupdate', onTimeupdate);

  /**
   * 点击时候触发拖拽时间，调整UI 。
   */
  ['touchstart', 'mousedown'].forEach((item: string) => {
    containerEl.addEventListener(item, (e: MouseEvent) => {
      const { width } = containerEl.getBoundingClientRect();
      const left = e.clientX;
      const rate = `${(left / width) * 100}%`;
      progressPlayed.style.width = rate;
      btn.style.left = rate;
      this.video.currentTime = ((left / width) * this.duration).toFixed(1);

      const move = (event: MouseEvent) => {
        e.stopPropagation();
        this.isProgressMoving = true;
        const { clientX } = event;
        const moveTate = `${(clientX / width) * 100}%`;

        progressPlayed.style.width = moveTate;
        btn.style.left = moveTate;
        console.log('moveTate', moveTate);
      }

      const up = (event: MouseEvent) => {
        const { clientX } = event;
        this.video.currentTime = ((clientX / width) * this.duration).toFixed(1);
        this.isProgressMoving = false;

        window.removeEventListener('mousemove', move)
        window.removeEventListener('touchmove', move)
        window.removeEventListener('mouseup', up)
        window.removeEventListener('touchend', up)
      }

      window.addEventListener('mousemove', move)
      window.addEventListener('touchmove', move, { passive: false })
      window.addEventListener('mouseup', up)
      window.addEventListener('touchend', up)
    });
  });

  /**
   * 处理鼠标划入事件，控制提示框。
   */
  // ['mouseenter'].forEach((item: string) => {

  containerEl.addEventListener('mouseenter', (e: MouseEvent) => {
    const { width } = containerEl.getBoundingClientRect();
    const move = (event: MouseEvent) => {
      // 处理时间内容显示。
      const left = event.clientX;
      point.style.left = `${left}px`;
      point.style.display = `block`;
      pointContent.textContent = `${format((left / width) * this.duration)}`;

      // 处理缩略图显示

    }

    const leave = () => {
      point.style.display = `none`;
      containerEl.removeEventListener('mousemove', move, false);
      containerEl.removeEventListener('mouseleave', leave, false);
    }

    containerEl.addEventListener('mousemove', move, false);
    containerEl.addEventListener('mouseleave', leave, false);
  });
  // });
}


Player.install('skin_progress', skin_progress);