/*
 * @Author: Allen OYang
 * @Date: 2021-08-30 16:21:40
 * @Descripttion:
 * @LastEditTime: 2021-09-16 17:52:28
 * @FilePath: /plugin-core/packages/xyplayer/src/controls/keyboardControl/index.ts
 */

import Player from '@/core';

const keyboardControl = function (this: Player) {

  const keyBodyDown = (event: KeyboardEvent) => {

    const e: KeyboardEvent = event;
    const keyCode = e.keyCode;
    switch (keyCode) {
      // 快进
      case 39: {
        handleProgress(false)
        break;
      }
      // 倒退
      case 37: {
        handleProgress(true);
        break;
      }
      // 增大音量
      case 38: {
        handleVolume(true);
        break;
      }
      // 减小音量
      case 40: {
        handleVolume(false);
        break;
      }
      // 空格 播放|暂停
      case 32: {
        handleSpaceBar();
        break;
      }

      default: {
        console.log('Other keyboard keydown');
      }
    }
  };

  const handleVolume = (isUp: boolean) => {
    const volume = this.volume;
    if (isUp && volume + 0.1 <= 1) {
      this.volume = volume + 0.1;
      return
    }

    if (!isUp && volume - 0.1 >= 0) {
      this.volume = volume - 0.1;
      return
    }
  }

  const handleProgress = (isBack: boolean) => {
    if (isBack) {
      if (this.currentTime - 5 >= 0) {
        this.currentTime -= 5
      } else {
        this.currentTime = 0
      }
    } else {
      if (this.currentTime + 5 <= this.duration) {
        this.currentTime += 5
      } else {
        this.currentTime = this.duration - 1
      }
    }
  }

  const handleSpaceBar = () => {
    if (this.paused) {
      let playPromise = this.play()
      if (playPromise !== undefined && playPromise) {
        playPromise.catch(err => { })
      }
    } else {
      this.pause()
    }
  }


  document.addEventListener('keydown', keyBodyDown)

  this.root.addEventListener('keydown', () => {
    console.log('root')
  })

  this.root.addEventListener('mouseenter', () => {
    // console.log('mouseEnter');
  })

  this.root.addEventListener('focus', () => {
    console.log('focus');
  })



}

Player.install('keyboardControl', keyboardControl);