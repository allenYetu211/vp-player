/*
 * @Author: Allen OYang
 * @Date: 2021-07-30 16:30:38
 * @Descripttion: 
 * @LastEditTime: 2022-02-17 19:50:14
 * @FilePath: /plugin-core/packages/xyplayer/src/skin/constrols/progress/index.ts
 */

import Player from '@/core';
import { createDOM, findDom } from '@/util';
import { format } from '@/util';
import style from './index.scss';
import globalStyle from '@/skin/styles/global.scss';
import deviceInfo from '@/util/deviceInfo';
import cn from 'classname';

const isPc = deviceInfo.pc;

const paddingSkip = 12 * 2;
// 距离两侧边距距离
const BOUNDARY_DISTANCE = 0;

const skin_progress = function (this: Player) {

  const {isMobile, isLive, thumbnail} = this.config;

  if (isLive) {
    return
  }

  const containerEl = createDOM({
    el: 'vp-progress',
    cname: cn(style.progress, {
      [style.mobile]: isMobile
    }),
    tpl: `
            <vp-outer class="${cn(style.progressOuter)}">
              <vp-cache class="${style.progressCache}"></vp-cache>
              <vp-played class="${style.progressPlayed}"></vp-played>
              <vp-progress-btn class="${style.progressBtn}"></vp-progress-btn>
              <vp-point class="${cn(style.progressPoint)}"></vp-point>
              ${isPc ? ` <div class="${cn(style.progressPointContent, globalStyle.tips)}">00:00</div>` : ""}
              ${isPc && thumbnail ?
        `<vp-thumbnail class="${cn(style.progressThumbnail, style.tips)}"></vp-thumbnail>` : ''
      }
            </vp-outer>
          `
  });

  this.on('ready', () => {
    if (isMobile) {
      this.on('mobileInsertReady', () => {
        const playTimeEL = findDom(this.controls, 'vp-play-time');
        const durationEl = findDom(this.controls, 'vp-duration');
        playTimeEL.insertBefore(containerEl, durationEl);
      })
    } else {
      this.controls.appendChild(containerEl);
    }
  })


  const btn: HTMLDivElement = containerEl.querySelector(`.${style.progressBtn}`);
  // const outer: HTMLDivElement = containerEl.querySelector(`.${style.progressOuter}`);
  const cache: HTMLDivElement = containerEl.querySelector(`.${style.progressCache}`);
  const point: HTMLDivElement = containerEl.querySelector(`.${style.progressPoint}`);
  const pointContent: HTMLDivElement = containerEl.querySelector(`.${style.progressPointContent}`);
  const progressPlayed: HTMLDivElement = containerEl.querySelector(`.${style.progressPlayed}`);
  const thumbnailEL: HTMLDivElement = containerEl.querySelector(`.${style.progressThumbnail}`);

  if (isPc && thumbnail) {
    thumbnailEL.style.width = `${thumbnail.width}px`;
    thumbnailEL.style.height = `${thumbnail.height}px`;
    thumbnailEL.style.backgroundPosition = `0px 0px;`;
    thumbnailEL.style.backgroundImage = `url('${thumbnail.url}')`;
  }

  /**
   * 监听播放进度
   */
  const onTimeupdate = () => {
    UIHandlerProgressAndBtn();
    UIHandlerBuffer();
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
  const UIHandlerBuffer = () => {
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
      e.stopPropagation()
      const { width, left } = containerEl.getBoundingClientRect();

      const move = (event) => {
        event.stopPropagation();
        this.isProgressMoving = true;
        const clientX = event.changedTouches ? event.changedTouches[0].clientX : event.clientX;
        const tempMoveLeft: number = clientX -  left;
        let moveLeft: number = tempMoveLeft;

        if (tempMoveLeft < 0) {
          moveLeft = 0;
        } else if  (tempMoveLeft > width){
          moveLeft = width;
        } 
        const moveTate = moveLeft / width
        const ratio  = `${moveTate * 100}%`;
        const moveTime = `${format(moveTate * this.duration)}`;
        
        progressPlayed.style.width = ratio;
        btn.style.left = ratio;
        this.emit('progressMove', {
          updateState: false,
          moveTime
        })
      }

      const up = (event) => {
        event.stopPropagation();
        const clientX = event.changedTouches ? event.changedTouches[0].clientX : event.clientX;
        this.video.currentTime = (clientX - left) / width * this.duration;
        this.isProgressMoving = false;
        window.removeEventListener('mousemove', move)
        window.removeEventListener('touchmove', move)
        window.removeEventListener('mouseup', up)
        window.removeEventListener('touchend', up)
        this.emit('progressMove', {
          updateState: true
        })
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
    if (!deviceInfo.pc) { return }

    const { width,left } = containerEl.getBoundingClientRect();

    const pointWidth = pointContent.getBoundingClientRect().width;
    // 控制显示
    pointContent.style.display = 'block';
    if (thumbnail) {
      thumbnailEL.style.display = 'block';
    }

    /**
     * 计算滑动距离
     * todo： 更具刷新评率计算
     * @param event 
     */
    const move = (event: MouseEvent) => {
      const moveLeft = event.clientX - left
      // 处理时间内容显示。
      const moveTime = `${format((moveLeft / width) * this.duration)}`

      point.style.display = `block`;
      pointContent.textContent = moveTime;
      point.style.left = `${moveLeft}px`;
      // 处理缩略图显示
      if (isPc && thumbnail) {
        handleThumbnailBackgroundStyle(moveLeft);
        // 设置滑动边界
        if (handleBoundary(moveLeft, thumbnail.width)) {
          thumbnailEL.style.left = `${moveLeft}px`;
          pointContent.style.left = `${moveLeft}px`;
        }
      } else {
        if (handleBoundary(moveLeft, pointWidth)) {
          pointContent.style.left = `${moveLeft}px`;
        }
      }
    }

    /**
     * 处理缩略图显示
     */
    const handleThumbnailBackgroundStyle = (left) => {
      // 当前显示的图片下标
      const nowIndex = Math.floor((left / width) * thumbnail.pic_num);
      // 计算定位行数
      const col = Math.floor(nowIndex / thumbnail.col);
      // 获取position Y轴位置
      const positionY = col * thumbnail.height;
      // 获取position X轴位置
      const positionX = (nowIndex - ((col - 1 < 0 ? 0 : col - 1) * thumbnail.col)) * thumbnail.width;
      thumbnailEL.style.backgroundPosition = `-${positionX}px  -${positionY}px`;
    }


    /**
     * 边界判断
     * @param left 距离左侧距离
     * @param targetWidth  当前显示框宽度
     * @returns boolean
     */
    const handleBoundary = (left, targetWidth): boolean => {
      if (left - BOUNDARY_DISTANCE < targetWidth / 2) {
        return false;
      }
      if (Math.abs(left - width) < (targetWidth / 2) + BOUNDARY_DISTANCE) {
        return false;
      }
      return true;
    }

    const leave = () => {
      point.style.display = `none`;
      pointContent.style.display = `none`;
      if (thumbnail) {
        thumbnailEL.style.display = `none`;
      }
      containerEl.removeEventListener('mousemove', move, false);
      containerEl.removeEventListener('mouseleave', leave, false);
    }

    containerEl.addEventListener('mousemove', move, false);
    containerEl.addEventListener('mouseleave', leave, false);
  });

  /**
   * 重置样式
   */
  this.on('reSetStyle', () => {
    progressPlayed.style.width = '0';
    cache.style.width = '0';
    btn.style.left = '0';
  })
  // });
}


Player.install('skin_progress', skin_progress);