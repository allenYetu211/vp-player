/*
 * @Author: Allen OYang
 * @Date: 2022-02-16 15:15:12
 * @LastEditTime: 2022-02-16 16:24:25
 */

import Player from '@/core';
import { createDOM, addClass } from '@/util';
import LoadingIcon from '@/skin/assets/loading.svg';
import style from '@/skin/styles/index.scss';
import cn from 'classname';

const skin_loading = function (this: Player) {

  const containerEl = createDOM({
    cname: style.loadingContainer,
    tpl: `
      <div class="${cn(
      style.iconLoading,
      style.animation,

    )}">${LoadingIcon}</div>
    `
  })

  // const pointContent: HTMLDivElement = containerEl.querySelector(`.${style.progressPointContent}`);

  this.once('ready', () => {
    this.root.appendChild(containerEl)
  })


  // get readyState () {
  //   let status = [{
  //     en: 'HAVE_NOTHING',
  //     cn: '没有关于音频/视频是否就绪的信息'
  //   }, {
  //     en: 'HAVE_METADATA',
  //     cn: '关于音频/视频就绪的元数据'
  //   }, {
  //     en: 'HAVE_CURRENT_DATA',
  //     cn: '关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒'
  //   }, {
  //     en: 'HAVE_FUTURE_DATA',
  //     cn: '当前及至少下一帧的数据是可用的'
  //   }, {
  //     en: 'HAVE_ENOUGH_DATA',
  //     cn: '可用数据足以开始播放'
  //   }]

  // https://blog.csdn.net/kphper/article/details/50082751
  // this.video.addEventListener('ended', () => {
  //   console.log('ended>>>')
  // })

  this.on('loadeddata', () => {
    setStyle()
  })

  this.on('timeupdate', () => {
    setStyle()
  })

  const setStyle = () => {
    if (this.video.readyState <= 2) {
      addClass(this.root, style.isloading)
    }
    // containerEl.style.display  = this.video.readyState <= 2 ? 'block' : 'none';
  }
}

Player.install('skin_loading', skin_loading);