/*
 * @Author: Allen OYang
 * @Date: 2021-07-21 18:49:46
 * @Descripttion: 
 * @LastEditTime: 2022-02-18 14:01:09
 * @FilePath: /plugin-core/packages/xyplayer/src/controls/fullScreen/index.ts
 */


import Player from '@/core';
import { createDOM, addClass, removeClass, hasClass } from '@/util';
import style from '@/skin/styles/index.scss';
import { requestFullscreen, exitFullscreen } from './utils';


const fullScreen = function () {
  console.log('fullScreen')
  const onFullScreenBtnClick = () => {
    if (hasClass(this.root, style.fullscreen)) {
      removeClass(this.root, style.fullscreen);
      exitFullscreen();
    } else {
      addClass(this.root, style.fullscreen);
      requestFullscreen(this.root);
    }
  }

  // function onFullscreenChange () {
  //   let fullscreenEl = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement
  //   if (fullscreenEl && fullscreenEl === this.root) {
  //     // addClass(this.root, 'xyplayer-is-fullscreen')
  //     addClass(this.root, style.fullscreen);
  //     this.emit('requestFullscreen')
  //   } else if (hasClass(this.root, 'xyplayer-is-fullscreen')) {
  //     // removeClass(this.root, 'xyplayer-is-fullscreen')
  //     removeClass(this.root, style.fullscreen);
  //     this.emit('exitFullscreen')
  //   }
  // };

  // ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(item => {
  //   this.root.addEventListener(item, onFullscreenChange)
  // })

  // this.video.addEventListener("webkitbeginfullscreen", function(){
  //   // addClass(this.root, 'xyplayer-is-fullscreen')
  //   addClass(this.root, style.fullscreen);
  //   this.emit('requestFullscreen')
  // })

  // this.video.addEventListener("webkitendfullscreen", function(){
  //   // removeClass(this.root, 'xyplayer-is-fullscreen')
  //   removeClass(this.root, style.fullscreen);
  //   this.emit('exitFullscreen')
  // })


  this.on('fullScreenBtnClick', onFullScreenBtnClick)
}




Player.install('fullScreen', fullScreen);