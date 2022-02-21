/*
 * @Author: Allen OYang
 * @Date: 2021-07-14 16:12:30
 * @Descripttion: 
 * @LastEditTime: 2021-07-14 16:33:24
 * @FilePath: /plugin-core/src/controls/play/index.ts
 */



import Player from '@/core';

const play = function  (this: Player) {

  const onPlayBtnClick = () => {
    // if (!this.config.allowPlayAfterEnded && this.ended) {
    //   return
    // }
    if (this.paused) {
      this.emit('play');
      let playPromise = this.play()
      if (playPromise !== undefined && playPromise) {
        playPromise.catch(err => { })
      }
    } else {
      this.emit('stop');
      this.pause()
    }
  }

  this.on('playBtnClick', onPlayBtnClick)

}


Player.install('play', play);
